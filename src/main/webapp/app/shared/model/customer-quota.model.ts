import { IUser } from 'app/core/user/user.model';

export interface ICustomerQuota {
    id?: number;
    quota?: number;
    user?: IUser;
}

export class CustomerQuota implements ICustomerQuota {
    constructor(public id?: number, public quota?: number, public user?: IUser) {}
}
