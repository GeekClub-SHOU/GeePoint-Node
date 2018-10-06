import {URPCrawler} from '../../utils/URPCrawler';
import * as cheerio from 'cheerio';
import CrawlerBase from "./CrawlerBase";
import ClientError from "../../utils/ClientError";
import {AllSemesterScoreResponseItem, SelectCourse, SemesterCurriculumResponse} from "../../utils/URPInterfaces";
export default class extends CrawlerBase {
    async indexAction() {
        try {
            const urpCrawler = new URPCrawler();
            urpCrawler.cookie = this.crawlerCookie;

            /**
             * 查看本学期课表
             */
            const thisSemesterCurriculumResponseTemp: any =
                await urpCrawler.request(
                    '/student/courseSelect/thisSemesterCurriculum/ajaxStudentSchedule/callback',
                    'GET'
                );

            const thisSemesterCurriculumResponse: SemesterCurriculumResponse =
                JSON.parse(thisSemesterCurriculumResponseTemp.text);

            /**
             * 查询所有课程属性成绩
             */
            const allSemesterScoreResponseTemp: any =
                await urpCrawler.request(
                    '/student/integratedQuery/scoreQuery/coursePropertyScores/callback',
                    'GET'
                );
            const allSemesterScoreResponse: AllSemesterScoreResponseItem[]
                = JSON.parse(allSemesterScoreResponseTemp.text);
            if (thisSemesterCurriculumResponse.xkxx.length === 0) {
                return this.error("暂无本学期课程信息", 400);
            }

            const courseList = [];
            const courseObject = thisSemesterCurriculumResponse.xkxx[0];
            for (const code in courseObject) {
                if (courseObject.hasOwnProperty(code)) {
                    const course: SelectCourse = courseObject[code];
                    // code : 5204148_02 ,5204148 课程号，02 课序号
                    const codeSplit = code.split('_');
                    // courseNumber 课程号
                    const courseNumber = codeSplit[0];
                    // coureSequenceNumber 课程序列号
                    const coureSequenceNumber = codeSplit.length > 1 ? codeSplit[1] : null;

                    // 遍历所有成绩，查看是否课程号匹配，如果匹配则返回成绩信息，不匹配则为 null
                    let courseGradeInfo = null;
                    for (const allSemesterScoreResponseItem of allSemesterScoreResponse) {
                        for (const cj of allSemesterScoreResponseItem.cjList) {
                            if (cj.id.courseNumber === courseNumber) {
                                courseGradeInfo = {
                                    gradeScore: cj.cj,
                                    gradeName: cj.gradeName, // “及格” 等
                                    unit: cj.credit, // 学分，URP 命名并未统一, credit 即 unit
                                    examTime: cj.examTime, // 测验时间
                                    notByReasonName: cj.notByReasonName, // 未通过原因
                                };
                            }
                            // Following is for debug:
                            // if (coureSequenceNumber === '01') {
                            //     courseGradeInfo = {
                            //         gradeScore: 83,
                            //         gradeName: '及格', // “及格” 等
                            //         unit: 2.5, // 学分，URP 命名并未统一, credit 即 unit
                            //         examTime: 'adadaww', // 测验时间
                            //         notByReasonName: 'adawdwadawdwadwadawdwadwa', // 未通过原因
                            //     };
                            // }
                        }
                    }

                    courseList.push({
                        // 成绩信息
                        courseGradeInfo,

                        courseNumber,
                        coureSequenceNumber,
                        courseName: course.courseName,
                        teacherName: course.attendClassTeacher,
                        // 考试类型
                        examTypeName: course.examTypeName,
                        // 选修 / 必修
                        coursePropertiesName: course.coursePropertiesName,
                        // 学分
                        unit: course.unit,
                        // 选课状态（ 选中 / 置入 ）
                        selectCourseStatusName: course.selectCourseStatusName,
                    });
                }
            }
            return this.json(courseList);
        } catch (e) {
            if ( e instanceof ClientError) {
                return this.error(e.message, e.status);
            } else if (e.message.indexOf('in JSON') >= 0) {
                return this.error('您的登录已过期', 403);
            } else {
                return this.error(e.message, 500);
            }
        }

    }
}
