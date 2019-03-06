import { IUser } from 'app/core/user/user.model';

export interface ICategoryQuota {
    id?: number;
    quota?: number;
    user?: IUser;
}

export class CategoryQuota implements ICategoryQuota {
    constructor(public id?: number, public quota?: number, public user?: IUser) {}
}
