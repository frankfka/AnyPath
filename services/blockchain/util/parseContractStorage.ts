import {BigMapAbstraction} from "@taquito/taquito";
import {BlockchainEducationRecord, TezosEducationRecordStorage} from "./blockchainServiceTypes";
import {hexDecode} from "./stringHexUtils";

export const parseContractStorage = async (contractStorage: TezosEducationRecordStorage): Promise<BlockchainEducationRecord> => {
  const tokenMetadata = await contractStorage.token_metadata.get<BigMapAbstraction>(0)

  console.log(contractStorage)

  return {
    adminAddress: contractStorage.admin_address,
    dateOfCreation: contractStorage.timestamp,
    educatorAddress: contractStorage.educator_address,
    isValid: contractStorage.is_valid,
    metadataCid: hexDecode((await tokenMetadata?.get<string>('record_metadata_uri')) || ''),
    recipientAddress: contractStorage.recipient
  }
}
