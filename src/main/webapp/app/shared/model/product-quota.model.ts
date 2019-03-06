import { IUser } from 'app/core/user/user.model';

export interface IProductQuota {
    id?: number;
    quota?: number;
    user?: IUser;
}

export class ProductQuota implements IProductQuota {
    constructor(public id?: number, public quota?: number, public user?: IUser) {}
}
