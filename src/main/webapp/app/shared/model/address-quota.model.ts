import { IUser } from 'app/core/user/user.model';

export interface IAddressQuota {
    id?: number;
    quota?: number;
    user?: IUser;
}

export class AddressQuota implements IAddressQuota {
    constructor(public id?: number, public quota?: number, public user?: IUser) {}
}
