interface IGetClassifyTree {
    params: {
        dimension_id: string;
    };
}

interface ICreateDimension {
    name: string;
    state: number;
    deleted: number;
    desc: string;
}

interface IGetDimensionInfo {
    params: {
        id: string;
    };
}

interface IModifyDimension {
    id: string;
    name: string;
    state: number;
    deleted: number;
    desc: string;
}

interface IDeleteDimension {
    id: string;
}

interface ICreateClassify {
    name: string;
    parent_id: string;
    dimension_id: string;
    state: number;
    deleted: number;
    desc: string;
}

interface IGetClassifyInfo {
    params: {
        id: string;
    };
}

interface IModifyClassify {
    id: string;
    name: string;
    parent_id: string;
    dimension_id: string;
    state: number;
    deleted: number;
    desc: string;
}

interface IDeleteClassify {
    id: string;
}

interface IMoveClassify {
    id: string;
    name: string;
    parent_id: string;
    dimension_id: string;
}