interface ICreatePowerControl {
    source_id: string;
    target_id: string;
    security_level: number;
    source_type: number;
    target_type: number;
    state: number;
    begin_time: string;
    expire_time: string;
    create: number;
    delete: number;
    modify: number;
    view: number;
    thumb: number;
    discuss: number;
    download: number;
}

interface IDeletePowerControl {
    source_id: string;
    target_id: string;
    security_level: number;
}