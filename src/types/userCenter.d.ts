interface IDeleteSearch {
    params: {
        delete_type: string;
        param: string;
    };
}

interface IDeleteBrowse {
    params: {
        delete_type: string;
        param: string;
    };
}

interface IDownloadList {
    params: {
        begin_time: string;
        end_time: string;
    };
}

interface IFavoriteList {
    params: {
        begin_time: string;
        end_time: string;
    };
}

interface IDeleteDownloads {
    questions: string;
}

interface IDeleteFavorites {
    questions: string;
}