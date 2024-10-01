interface IReqLoading {
    status: 'LOADING';
    data: unknown;
}

interface IReqError {
    status: 'ERROR';
    data: unknown;
}

interface IReqSuccess<Data> {
    status: 'SUCCESS';
    data: Data;
}

interface IReqIdle {
    status: 'IDLE';
    data: unknown;
}

export type TRequestStatus = 'LOADING' | 'ERROR' | 'SUCCESS' | 'IDLE';

export type TRequest<Data> = IReqIdle | IReqLoading | IReqError | IReqSuccess<Data>;
