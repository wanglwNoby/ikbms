interface IKdg {
    params: {
        id: string;
        month: number;
    };
}

interface IRelativeKdg {
    params: {
        tags: string;
    };
}

interface IDownloadDocKdg {
    params: {
        id: string;
        month: number;
    };
}

interface ICheckFavorite {
    params: {
        kdg_id: string;
        kdg_month: number;
    };
}

interface ICreateFavorite {
    kdg_id: string;
    kdg_month: number;
    kdg_title: string;
}

interface IThumKdg {
    params: {
        id: string;
        month: number;
    };
}