interface ILogin {
    account: string;
    password: string;
}

interface IChangePassword {
    type: string;
    oldpassword: string;
    newpassword: string;
}

interface IAutoCompleteList {
    params: {
        text: string;
    };
}

interface IGetColumns {
    params: {
        view_id: string;
    };
}

interface IDeleteKdg {
    kdgs: string;
}