## GeePoint-Node
An open source GPA query tool for Shanghai Ocean University - Node Backend
> Powered by [ThinkJs](https://thinkjs.org/) 


## Install dependencies

```
npm install // or yarn
```

## Start server

```
npm start //or yarn start
```
> Now you can visit http://localhost:8360 to check whether the service has been opened.

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```


## Api Documents
#### /login 

###### Request Method:

​	POST

###### Request Body:

```json
{
    "username": "your urp username here",
    "password": "your urp password here"
}
```
###### Login Success:

>  Response Status Code: 200

```json
{
  "crawlerCookie":"JSESSIONID,generated by URP"
}
```

"crawlerCookie" should be saved into Cookie, LocalStorage etc. It is generated by URP and if you want to call other apis, persistent preservation is necessary.

###### Login Fail

> Response Status Code: 400+ / 500+ 

```json
{
    "message":"The reason why you login failed"
}
```



#### /crawler/getGPA

###### Request Method:

​	POST

###### Request Body:

```json
{
    "crawlerCookie": "crawlerCookie from /login",
}
```

###### Response Success:

>  Response Status Code: 200

```json
[
    // this data is from urp
    // I don't know why it is an array, either :(
    {
        // the number of courses you attend during this term
        "courseNum_bxqyxd":0, 
        
        // numbers of courses not yet passed
        "coursePas":0, 
        
        // average GPA of all courses
        "gpa":"2.94", 
        
        // the number of all courses
        "courseNum":71, 

        // semester
        "zxjxjhh":"2018-2019-1-1", 
        
        
        // the following are from urp, don't know what those means
        "courseName":[],
        "jasId":[], 
        "teacherName":[],
        "teacherId":[],
        "jasName":[]
    }
]
```

###### Response Fail

> Response Status Code: 400+ / 500+ 

```json
{
    "message":"The reason why you response failed"
}
```

> When Response Status Code equals to 403, it means your "crawlerCookie" is invalid. You should redirect to login and fetch a new "crawlerCookie".



#### /crawler/getThisTermGrade

###### Request Method:

​	POST

###### Request Body:

```json
{
    "crawlerCookie": "crawlerCookie from /login",
}
```

###### Response Success:

>  Response Status Code: 200

```json
[
    {
        // grade info, nullable
        "courseGradeInfo":{
            // score, nullable
            gradeScore: 83, 
            
            // level, just like “及格”,“良好”, nullable
            gradeName: "良好",
            
            // credit
            unit: 2, 
            
            examTime: "2018-10-05",
            
            // reason you fail this subject
            notByReasonName: cj.notByReasonName, // 未通过原因
        },
     "courseNumber":"8409964",
     "coureSequenceNumber":"18",
     "courseName":"形势与政策（5）",
     "teacherName":"刘星安* ",
     "examTypeName":"考查",
     "coursePropertiesName":"必修",
     "unit":2,
     "selectCourseStatusName":"置入"
    },
    ...
    ...
]
```

###### Response Fail

> Response Status Code: 400+ / 500+ 

```json
{
    "message":"The reason why you response failed"
}
```

> When Response Status Code equals to 403, it means your "crawlerCookie" is invalid. You should redirect to login and fetch a new "crawlerCookie".

