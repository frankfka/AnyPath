import GetEducationRecordOutput from "../../types/GetEducationRecordOutput";
import {BlockchainEducationRecord, TezosEducationRecordStorage} from "./util/blockchainServiceTypes";
import createEducationContract from "./util/createEducationContract";
import createEducationContractParams from "./util/createEducationContractParams";
import createTezosClient from "./util/createTezosClient";
import {parseContractStorage} from "./util/parseContractStorage";

export default class BlockchainService {

  private readonly rpcEndpoint;
  private readonly adminSecretKey;

  constructor(rpcEndpoint: string, adminSecretKey: string) {
    this.rpcEndpoint = rpcEndpoint;
    this.adminSecretKey = adminSecretKey;
  }

  /**
   * Returns the address of the deployed contract
   */
  public async createEducationRecord(
    recipientAddress: string,
    educatorAddress: string,
    adminAddress: string,
    signingSecretKey: string,
    metadataCid: string,
  ): Promise<string> {
    const signingTezosClient = await createTezosClient(this.rpcEndpoint, signingSecretKey);
    const originationOperation = await signingTezosClient.contract.originate({
      code: createEducationContract(),
      init: createEducationContractParams(
        recipientAddress,
        educatorAddress,
        adminAddress,
        'EducationRecord',
        'EducationRecord',
        metadataCid
      ),
    })

    return (await originationOperation.contract(1)).address;
  }

  public async getEducationRecord(
    address: string
  ): Promise<BlockchainEducationRecord | undefined> {
    const adminTezosClient = await createTezosClient(this.rpcEndpoint, this.adminSecretKey);

    try {
      const contract = await adminTezosClient.contract.at(address)
      const contractStorage = await contract.storage<TezosEducationRecordStorage>()

      return await parseContractStorage(contractStorage);
    } catch (err) {
      console.error("Error getting record from blockchain", err)
      return;
    }
  }

}

