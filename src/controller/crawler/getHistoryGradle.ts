import {URPCrawler} from '../../utils/URPCrawler';
import * as cheerio from 'cheerio';
import CrawlerBase from "./CrawlerBase";
import ClientError from "../../utils/ClientError";
import {AllSemesterScoreResponseItem, SelectCourse, SemesterCurriculumResponse} from "../../utils/URPInterfaces";
export default class extends CrawlerBase {
    async indexAction() {
        try {
            const urpCrawler = new URPCrawler();
            await urpCrawler.login(this.username, this.password);
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
            return this.json({
                compulsoryCourseList: allSemesterScoreResponse.length > 0 ? allSemesterScoreResponse[0].cjList : [] ,
                optionalCourseList: allSemesterScoreResponse.length > 1 ? allSemesterScoreResponse[1].cjList : []
            });
        } catch (e) {
            if ( e instanceof ClientError) {
                return this.error(e.message, e.status);
            } else {
                return this.error(e.message, 500);
            }
        }

    }
}
