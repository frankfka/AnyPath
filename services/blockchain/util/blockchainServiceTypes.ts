import {BigMapAbstraction} from "@taquito/taquito";

export type TezosEducationRecordStorage = {
  admin_address: string,
  educator_address: string,
  is_valid: boolean,
  recipient: string,
  timestamp: string,
  token_metadata: BigMapAbstraction
}

export type BlockchainEducationRecord = {
  adminAddress: string,
  educatorAddress: string,
  recipientAddress: string
  isValid: boolean,
  metadataCid: string,
  dateOfCreation: string,
}
