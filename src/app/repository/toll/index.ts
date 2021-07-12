import { ObjectID } from 'mongodb';
import { Collection } from './../../../models/collections.model';
import { BaseRepositoryService } from './../base';
import { Receipt } from './../../../models';

export class TollRepositoryService extends BaseRepositoryService {
    constructor() {
        super();
    }

    getTollList = async () => {
        try {
            if(!this.connection) {
                throw new Error('Database connection not established');   
            }
            return await this.connection
                .collection(Collection.tollList)
                .find();
        } catch (ex) {
            throw ex;
        }
    }

    getTollDetails = async (_id: ObjectID) => {
        try {
            if(!this.connection) {
                throw new Error('Database connection not established');   
            }
            return await this.connection
                .collection(Collection.tollList)
                .findOne({ _id });
        } catch (ex) {
            throw ex;
        }
    }

    getTollDetailsByRegistrationNumber = async (registrationNumber: string, issuedDate: string = new Date().toISOString()) => {
        try {
            if(!this.connection) {
                throw new Error('Database connection not established');   
            }
            return await this.connection
                .collection(Collection.tollList)
                .find({ registrationNumber, issuedDate });
        } catch (ex) {
            throw ex;
        }
    }

    saveToll = async ({ registrationNumber, amount, issuedDate }: Receipt) => {
        try {
            if(!this.connection) {
                throw new Error('Database connection not established');   
            }
            const receipt = new Receipt(registrationNumber, amount, issuedDate || new Date().toISOString());
            return await this.connection.collection(Collection.tollList).insertOne(receipt);
        } catch (ex) {
            throw ex;
        }
    }   
}