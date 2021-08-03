import { tmpdir } from 'os';
import { join } from 'path';
import { JSONFile, Low } from 'lowdb';
import {nanoid} from "nanoid";
import {
  DatabaseEducationRecord,
  DatabaseSchema,
  DatabaseTezosAccount,
  DatabaseUserAccount
} from "./databaseServiceTypes";
import mockInitialData from "./mockInitialData";

type DatabaseState = 'ready' | 'initializing' | 'initialized';

// Essentially a mock database
export default class DatabaseService {
  private currentState: DatabaseState = 'ready';
  private readonly db: Low<DatabaseSchema>;

  constructor() {
    // Use demo data - in reality, we would establish a connection to a remote DB
    this.db = new Low<DatabaseSchema>(
      new JSONFile(join(tmpdir(), 'local-mock-db.json'))
    );
    this.init();
  }

  private async init() {
    if (this.currentState != 'ready') {
      return;
    }

    await this.db.read();
    if (this.db.data != null) {
      console.log('Skipping initialization as DB already has data');
      this.currentState = 'initialized';
      return;
    }

    console.log('Recreating DB with mock data');

    this.currentState = 'initializing';
    this.db.data = mockInitialData;
    await this.db.write();
    this.currentState = 'initialized';
  }

  async getAdminTezosAccount(): Promise<DatabaseTezosAccount> {
    await this.init();

    return this.db.data!.globals.adminTezosAccount;
  }

  async getUser(userId: string): Promise<DatabaseUserAccount | undefined> {
    await this.init();

    return this.db.data?.users[userId];
  }


  async getEducator(educatorId: string): Promise<DatabaseUserAccount | undefined> {
    await this.init();

    return this.db.data?.educators[educatorId];
  }

  async getEducationRecord(recordId: string): Promise<DatabaseEducationRecord | undefined> {
    await this.init();

    return this.db.data?.educationRecords[recordId];
  }

  async saveEducationRecord(record: DatabaseEducationRecord): Promise<string> {
    await this.init();

    const recordId = nanoid();

    this.db.data!.educationRecords[recordId] = record;
    await this.db.write();

    return recordId
  }
}
