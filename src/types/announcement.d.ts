interface IGetColumns {
    params: {
        view_id: string;
    };
}

interface IListKdg {
    params: {
        begin_time: string;
        end_time: string;
        type: number;
        verified: number;
        published: number;
        page_count: number;
        page_size: number;
    };
}

interface IAnalysisTags {
    title: string;
    content: string;
}

interface ICreateNotice {
    title: string;
    class_id: string;
    business_id: string;
    tags: string;
    content: string;
}

interface IModifyBasicKdg {
    id: string;
    month: number;
    title: string;
    tags: string;
    share_mode: number;
    security_level: number;
}

interface IModifyClassKdg {
    class_id: string;
    business_ids: string;
    kdgs: string;
}