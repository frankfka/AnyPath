export type DatabaseTezosAccount = {
  address: string;
  secretKey: string;
}

export type DatabaseEducationRecord = {
  recipientId: string;
  educatorId: string;
  smartContractAddress: string;
}

export type DatabaseUserAccount = DatabaseTezosAccount

export type DatabaseSchema = {
  globals: {
    adminTezosAccount: DatabaseTezosAccount
  },
  users: Record<string, DatabaseTezosAccount>
  educators: Record<string, DatabaseTezosAccount>
  educationRecords: Record<string, DatabaseEducationRecord>
}
