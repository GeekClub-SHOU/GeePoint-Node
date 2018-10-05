export interface SemesterCurriculumResponse {
    allUnits: number;
    dateList: {
        programPlanCode: string;
        programPlanName: string;
        totalUnits: number;
        selectCourseList: SelectCourse[];
        courseCalendarList: any
    };
    xkxx: any[];
}

export interface AllSemesterScoreResponseItem {
    cjList: CourseGrade[];
    cjbh: string;
    cjlx: string;
    fajhnkcms: number;
    fajhwkcms: number;
    fajhzms: number;
    fajhzxf: number;
    fajhzxs: number;
    famc: any;
    kznzms: number;
    kztgms: number;
    kzwtgms: number;
    kzxdms: number;
    tgms: number;
    wtgms: number;
    xqtgms: number;
    xqwtg: number;
    xqzms: number;
    xqzxf: number;
    xqzxs: number;
    yqxf: number;
    yqzxf: number;
    yxxf: number;
    zms: number;
    zxf: number;
    zxjxjhh: any;
    zxs: number;
}

export interface SelectCourse {
    attendClassTeacher: string;
    courseCategoryCode: any;
    courseCategoryName: any;
    courseName: string;
    coursePropertiesCode: string;
    // 选修 / 必修
    coursePropertiesName: string;
    dgFlag: string;
    examTypeCode: string;
    examTypeName: string;
    flag: any;
    id: {
        coureNumber: string;
        coureSequenceNumber: string;
        executiveEducationPlanNumber: string;
        studentNumber: string;
    };
    programPlanName: string;
    programPlanNumber: string;
    rlFlag: string;
    selectCourseStatusCode: string;
    selectCourseStatusName: string;
    studyModeCode: string;
    studyModeName: string;
    timeAndPlaceList: any;
    unit: number;
}

export interface CourseGrade {
    academicYearCode: string;
    bm: any;
    cj: string;
    cjlrfsdm: any;
    classNo: string;
    courseAttributeCode: string;
    courseAttributeName: string;
    courseName: string;
    courseScore: number;
    credit: string;
    cycle: string;
    electiveTypeCode: any;
    englishCourseName: string;
    entryStatusCode: any;
    examTime: string;
    examTypeCode: string;
    gradeName: any;
    gradePointScore: number;
    gradeScore: any;
    id: {
        executiveEducationPlanNumber: string,
        courseNumber: string,
        startTime: string,
        studentId: string
    };
    makeupExaminationTypeCode: any;
    notByReasonCode: any;
    notByReasonName: any;
    operatingTime: string;
    operator: string;
    payableMoney: any;
    percentileRankScore: any;
    planNO: string;
    planName: string;
    planName2: string;
    remark: any;
    scoreEntryModeCode: string;
    standardScore: any;
    studyModeCode: string;
    substituteCourseNo: any;
    tdkcm: any;
    termCode: string;
    termName: string;
    termTypeCode: string;
    termTypeName: string;
    tscore: any;
    xkcsxdm: any;
    xkcsxmc: any;
}
