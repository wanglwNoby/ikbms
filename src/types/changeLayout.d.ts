interface ISaveLayout {
    layout_id?: string;
    title: string;
    layouts: string;
}
interface IUserLayoutByLayoutId {
    params: {
        layout_id: string;
    };
}
interface IDeleteUserLayout {
    layout_id: string;
}