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