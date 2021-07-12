import { ObjectID } from 'mongodb';

import { Receipt, HttpCodes } from './../../../models';
import { TollRepositoryService } from './../../repository/toll';

export class TollService {
    private tollRepositoryService: TollRepositoryService;
    constructor() {
        this.tollRepositoryService = new TollRepositoryService();
    }

    getTollList = async () => {
        try {
          const result = await this.tollRepositoryService.getTollList();
          return { result, status: HttpCodes.ok };
        } catch (ex) {
            return { status: 503, message: ex?.message || 'Internal Server Error' };
        }
    }

    getTollDetails = async (id: string) => {
        try {
          const tollId = ObjectID.createFromHexString(id);
          const result = await this.tollRepositoryService.getTollDetails(tollId);
          return { result, status: HttpCodes.ok };
        } catch ({ status, message }) {
            return { status, message };
        }
    }

    getTollDetailsByRegistrationNumber = async (registrationNumber: string, issuedDate = new Date().toISOString()) => {
        try {
          const result = await this.tollRepositoryService.getTollDetailsByRegistrationNumber(registrationNumber, issuedDate);
          return { result, status: HttpCodes.ok };
        } catch ({ status, message }) {
            return { status, message };
        }
    }

    saveToll = async (body: Receipt) => {
        try {
            const { result: tollExists } = await this.getTollDetailsByRegistrationNumber(body.registrationNumber, body.issuedDate);
            
            if (tollExists && tollExists.amount === 200) {
                return {
                    result: null,
                    status: HttpCodes.noContent,
                    message: `Toll of both ways has been added previously`
                };
            }
            const result = await this.tollRepositoryService.saveToll(body);
            return { result, status: HttpCodes.ok, message: `Toll details have been saved successfully` };
        } catch (ex) {
            return { status: HttpCodes.internalServerError, message: ex?.message || 'Internal Server Error ' };
        }
    }
}