import { initConnection } from '../../../utils/connection';

export class BaseRepositoryService {
    connection: any;
    constructor() {
        this.initConnection();
    }

    initConnection = async () => {
        try {
            this.connection = await initConnection();
        } catch (ex) {
            console.error(`Exception: `, ex);
        }
    }
}