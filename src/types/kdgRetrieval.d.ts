interface IRetrievalKdg {
    params: {
        keyword: SelectValue;
        type: number;
        ext: string;
        time: number;
        range: number;
        class_id: string;
        business_id: string;
        skip: number;
        size: number;
    };
}
interface IRelatedSearch {
    params: {
        text: SelectValue;
    };
}