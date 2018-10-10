import {URPCrawler} from '../../utils/URPCrawler';
import * as cheerio from 'cheerio';
import CrawlerBase from "./CrawlerBase";
import ClientError from "../../utils/ClientError";
import {
    CrawlerAllSemesterScoreResponseItem,
    SelectCourse,
    CrawlerSemesterCurriculumResponse,
    Course, CourseGradeInfo
} from "../../utils/URPInterfaces";
export default class extends CrawlerBase {
    async indexAction() {
        try {
            const urpCrawler = new URPCrawler();
            urpCrawler.cookie = this.crawlerCookie;

            /**
             * 查询所有课程属性成绩
             */
            const allSemesterScoreResponseTemp: any =
                await urpCrawler.request(
                    '/student/integratedQuery/scoreQuery/coursePropertyScores/callback',
                    'GET'
                );
            const allSemesterScoreResponse: CrawlerAllSemesterScoreResponseItem[]
                = JSON.parse(allSemesterScoreResponseTemp.text);

            let allSemesterList: any[] = [];
            if (allSemesterScoreResponse.length > 0) {
                allSemesterList = allSemesterList.concat(allSemesterScoreResponse[0].cjList);
            }
            if (allSemesterScoreResponse.length > 1) {
                allSemesterList = allSemesterList.concat(allSemesterScoreResponse[1].cjList);
            }

            const result: any = {};
            for (const value of allSemesterList) {
                const course: Course =  {
                    courseName: value.courseName,
                    gradePointScore: value.gradePointScore,
                    courseNumber: value.id.courseNumber || value.id.coureNumber,
                    courseSequenceNumber: value.id.coureSequenceNumber || value.id.courseSequenceNumber,
                    coursePropertiesName: value.courseAttributeName,
                    unit: value.credit,
                    selectCourseStatusName: null,
                    examTypeName: null,
                    teacherName: null,
                    academicYear: value.academicYearCode,
                    termName: value.termName,
                    courseGradeInfo: {
                        gradeScore: value.cj,
                        gradeName: value.gradeName,
                        unit: value.credit,
                        examTime: value.examTime,
                        notByReasonName: value.notByReasonName
                    }
                };
                const key = value.academicYearCode + '年' + value.termName + '季学期';
                if (!result[key]) {
                    result[key] = [course];
                } else {
                    result[key] = [
                        ...result[key],
                        course
                    ];
                }
            }
            return this.json(result);
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
