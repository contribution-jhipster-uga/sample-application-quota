import { IAddress } from 'app/shared/model/address.model';

export interface ICustomer {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    telephone?: string;
    addresses?: IAddress[];
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public telephone?: string,
        public addresses?: IAddress[]
    ) {}
}
