import * as request from 'superagent';
import Config from '../config/config';
import * as prefix from 'superagent-prefix';
import * as cheerio from "cheerio";
import ClientError from "./ClientError";
export class URPCrawler  {

    /**
     * prefix 前缀，内容是 URP 的地址
     */
    private prefix = prefix(Config.urpAddress);

    /**
     * superagent 客户端请求代理模块
     */
    private agent = request.agent();

    /**
     * 配置 cookie
     * 访问 URP /login 页面之后，会返回 Set-Cookie 的 header。如："Set-Cookie: JSESSIONID={随机生成的字符串}; path=/"
     * 访问之后的资源（如调用登录接口，使用获取其他数据的接口）时，都需要在请求是加上：Cookie: JSESSIONID={刚才获取的 JSESSIONID}，才可以获取数据或进行下一步操作
     * cookies 保存所有的 Cookie 信息
     */
    private cookies: string[] = [];

    /**
     * cookie 返回内容是 "JSESSIONID={刚才获取的 JSESSIONID}" 去除了后面的"; path=/" 当 cookies 为空的时候返回 null
     */
    private get cookie() {
        if (this.cookies && this.cookies.length > 0) {
            return this.cookies.toString().split(';')[0];
        } else {
            return null;
        }
    }

    /**
     * 登录
     * @param username URP 用户名
     * @param password URP 密码
     *
     * 当创建完一个新的 URPCrawler 对象后，如果要获取资源首先需要执行一次 login
     * 如：
     *      const urpCrawler = new URPCrawler();
     *      await urpCrawler.login();
     *      ...获取其他资源
     * 一定要等待 login 函数执行完成后再获取其他资源
     * 仅需要 login 一次，不需要重复 login
     */
    async login(username: string, password: string) {
        const response = await this.agent.post('/login').use(this.prefix);
        this.cookies = response.header['set-cookie'];
        const loginResult =
            await this.request(
                `/j_spring_security_check?j_username=${username}&j_password=${password}&j_captcha1=error`
            );

        // 返回的 html 中，如果存在 id 为 input_username 的元素 ( 登录时用户名的输入框 )，则说明用户名密码错误。
        const $ = cheerio.load(loginResult.text);
        if ($('#input_username').length > 0) {
            return Promise.reject(new ClientError("URP 用户名或密码错误", 403));
        }
        return Promise.resolve(loginResult);
    }

    /**
     * 发送请求
     * @param url string, 必须，请求的 url，如："/main/academicInfo", 不需要包含前缀
     * @param method string, 可选，请求方法
     */
    async request(url: string, method = 'POST') {
        // 暂时仅有 POST / GET
        if (method === 'POST') {
            return this.agent.post(url)
                .use(this.prefix)
                .set('Cookie', this.cookie);
        } else {
            return this.agent.get(url)
                .use(this.prefix)
                .set('Cookie', this.cookie);
        }

    }
}
