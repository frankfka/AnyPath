import {InMemorySigner} from "@taquito/signer";
import {TezosToolkit} from "@taquito/taquito";

const createTezosClient = async (rpcEndpoint: string, secretKey?: string): Promise<TezosToolkit> => {
  const Tezos = new TezosToolkit('https://edonet.smartpy.io');

  Tezos.setProvider({ signer: secretKey ? await InMemorySigner.fromSecretKey(secretKey) : undefined });

  return Tezos;
}

export default createTezosClient;
