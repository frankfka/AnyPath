import {hexEncode} from "./stringHexUtils";

const createEducationContractParams = (
  recipientAddress: string,
  educatorAddress: string,
  adminAddress: string,
  name: string,
  symbol: string,
  metadataCid: string,
) => {
  return {
    "prim": "Pair",
    "args": [
      {
        "prim": "Pair",
        "args": [{"string": adminAddress}, {"prim": "Pair", "args": [{"string": educatorAddress}, {"prim": "True"}]}]
      },
      {
        "prim": "Pair",
        "args": [
          {"string": recipientAddress},
          {
            "prim": "Pair",
            "args": [
              {"string": (new Date()).toISOString()},
              [
                {
                  "prim": "Elt",
                  "args": [
                    {"int": "0"},
                    [
                      {"prim": "Elt", "args": [{"string": "decimals"}, {"bytes": hexEncode('0')}]},
                      {"prim": "Elt", "args": [{"string": "name"}, {"bytes": hexEncode(name)}]},
                      {
                        "prim": "Elt",
                        "args": [{"string": "record_metadata_uri"}, {"bytes": hexEncode(metadataCid)}]
                      },
                      {"prim": "Elt", "args": [{"string": "symbol"}, {"bytes": hexEncode(symbol)}]}
                    ]
                  ]
                }
              ]
            ]
          }
        ]
      }
    ]
  }
}


export default createEducationContractParams;
