interface IKeywordQuestion {
    params: {
        keyword: string;
        begin: string;
        end: string;
        source: number;
        states: string;
        level: number;
        class_id: string;
        business_id: string;
    };
}

interface INewestQuestion {
    params: {
        begin: string;
        end: string;
        level: number;
        class_id: string;
        business_id: string;
    };
}

interface IVerifyQuestion {
    questions: string;
    verify: number;
    verify_memo: string;
}

interface IGetColumns {
    params: {
        view_id?: string;
    };
}

interface IAddTag {
    tags: string;
    questions: string;
}

interface ISetLevel {
    level: number;
    questions: string;
}

interface IModifyClassQuestion {
    questions: string;
    class_id: string;
    business_id: string;
}

interface ISimilarTexts {
    similarTexts: string;
}

interface IMergeQuestion {
    similarTexts: string;
}

interface ISetTransfer {
    answer_user: string;
    questions: string;
}