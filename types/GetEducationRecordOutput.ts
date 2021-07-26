import {BlockchainEducationRecord} from "../services/blockchain/util/blockchainServiceTypes";
import {DatabaseEducationRecord} from "../services/database/databaseServiceTypes";

type GetEducationRecordOutput = DatabaseEducationRecord &
  Pick<BlockchainEducationRecord, 'isValid' | 'metadataCid' | 'dateOfCreation'> &
  {
    id: string,
  }

export default GetEducationRecordOutput;
