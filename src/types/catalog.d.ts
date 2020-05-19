interface ICreate {
    name: string;
    parent_id: string;
    state: number;
    desc: string;
}

interface IModify {
    id: string;
    name: string;
    parent_id: string;
    state: number;
    desc: string;
}

interface IDelete {
    id: string;
}

interface IMove {
    id: string;
    name: string;
    parent_id: string;
}

interface IGetCatalogInfo {
    params: {
        id: string;
    };
}