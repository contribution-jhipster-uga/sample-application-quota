import { ICustomer } from 'app/shared/model/customer.model';

export interface IAddress {
    id?: number;
    address1?: string;
    address2?: string;
    city?: string;
    postcode?: string;
    country?: string;
    customer?: ICustomer;
}

export class Address implements IAddress {
    constructor(
        public id?: number,
        public address1?: string,
        public address2?: string,
        public city?: string,
        public postcode?: string,
        public country?: string,
        public customer?: ICustomer
    ) {}
}
