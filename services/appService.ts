import CreateEducationRecordInput from "../types/CreateEducationRecordInput";
import GetEducationRecordOutput from "../types/GetEducationRecordOutput";
import BlockchainService from "./blockchain/blockchainService";
import DatabaseService from "./database/databaseService";

export class AppService {

  private dbService: DatabaseService
  private blockchainService!: BlockchainService

  constructor() {
    this.dbService = new DatabaseService()
    const tezosRpcEndpoint = process.env.TEZOS_RPC_ENDPOINT

    if (!tezosRpcEndpoint) {
      throw Error("Tezos RPC endpoint not defined")
    }

    // Hacky, but a temp solution
    this.dbService.getAdminTezosAccount().then((adminAccount) => {
      this.blockchainService = new BlockchainService(
        tezosRpcEndpoint,
        adminAccount.secretKey
      )
    })
  }

  public async createEducationRecord(params: CreateEducationRecordInput): Promise<string> {
    const recipientUser = await this.dbService.getUser(params.recipientId);
    const educator = await this.dbService.getEducator(params.educatorId);

    if (recipientUser == null || educator == null) {
      throw Error("Users do not exist")
    }

    const admin = await this.dbService.getAdminTezosAccount();

    const blockchainRecordAddress = await this.blockchainService.createEducationRecord(
      recipientUser.address,
      educator.address,
      admin.address,
      admin.secretKey,
      params.metadataCid
    )

    const dbRecordId = await this.dbService.saveEducationRecord({
      educatorId: params.educatorId, recipientId: params.recipientId, smartContractAddress: blockchainRecordAddress
    })

    return dbRecordId;
  }

  public async getEducationRecord(id: string): Promise<GetEducationRecordOutput | undefined> {
    const dbData = await this.dbService.getEducationRecord(id);

    if (dbData == null) {
      throw Error("Education record with ID " + id + " does not exist in the DB")
    }

    const recipientUser = await this.dbService.getUser(dbData.recipientId);
    const educator = await this.dbService.getEducator(dbData.educatorId);

    if (recipientUser == null || educator == null) {
      throw Error("Users do not exist")
    }

    const blockchainData = await this.blockchainService.getEducationRecord(dbData.smartContractAddress)

    if (blockchainData == null) {
      throw Error("Record does not exist on blockchain")
    }

    return {
      id,
      dateOfCreation: blockchainData.dateOfCreation,
      recipientId: dbData.recipientId,
      educatorId: dbData.educatorId,
      isValid: blockchainData.isValid,
      metadataCid: blockchainData.metadataCid,
      smartContractAddress: dbData.smartContractAddress
    }
  }
}

const appService = new AppService();

export default appService;
