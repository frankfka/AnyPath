const createEducationContract = () => {
  return [
    {
      "prim": "storage",
      "args": [
        {
          "prim": "pair",
          "args": [
            {
              "prim": "pair",
              "args": [
                { "prim": "address", "annots": [ "%admin_address" ] },
                { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%educator_address" ] }, { "prim": "bool", "annots": [ "%is_valid" ] } ] }
              ]
            },
            {
              "prim": "pair",
              "args": [
                { "prim": "address", "annots": [ "%recipient" ] },
                {
                  "prim": "pair",
                  "args": [
                    { "prim": "timestamp", "annots": [ "%timestamp" ] },
                    { "prim": "big_map", "args": [ { "prim": "nat" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] } ], "annots": [ "%token_metadata" ] }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "prim": "parameter",
      "args": [
        {
          "prim": "or",
          "args": [
            {
              "prim": "pair",
              "args": [
                {
                  "prim": "list",
                  "args": [ { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] } ],
                  "annots": [ "%requests" ]
                },
                {
                  "prim": "contract",
                  "args": [
                    {
                      "prim": "list",
                      "args": [
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%owner" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ], "annots": [ "%request" ] },
                            { "prim": "nat", "annots": [ "%balance" ] }
                          ]
                        }
                      ]
                    }
                  ],
                  "annots": [ "%callback" ]
                }
              ],
              "annots": [ "%balance_of" ]
            },
            {
              "prim": "or",
              "args": [
                {
                  "prim": "list",
                  "args": [
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "address", "annots": [ "%from_" ] },
                        {
                          "prim": "list",
                          "args": [
                            {
                              "prim": "pair",
                              "args": [
                                { "prim": "address", "annots": [ "%to_" ] },
                                { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%token_id" ] }, { "prim": "nat", "annots": [ "%amount" ] } ] }
                              ]
                            }
                          ],
                          "annots": [ "%txs" ]
                        }
                      ]
                    }
                  ],
                  "annots": [ "%transfer" ]
                },
                {
                  "prim": "list",
                  "args": [
                    {
                      "prim": "or",
                      "args": [
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "address", "annots": [ "%owner" ] },
                            { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                          ],
                          "annots": [ "%add_operator" ]
                        },
                        {
                          "prim": "pair",
                          "args": [
                            { "prim": "address", "annots": [ "%owner" ] },
                            { "prim": "pair", "args": [ { "prim": "address", "annots": [ "%operator" ] }, { "prim": "nat", "annots": [ "%token_id" ] } ] }
                          ],
                          "annots": [ "%remove_operator" ]
                        }
                      ]
                    }
                  ],
                  "annots": [ "%update_operators" ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "prim": "code",
      "args": [
        [
          {
            "prim": "CAST",
            "args": [
              {
                "prim": "pair",
                "args": [
                  {
                    "prim": "or",
                    "args": [
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "list", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                          {
                            "prim": "contract",
                            "args": [
                              {
                                "prim": "list",
                                "args": [ { "prim": "pair", "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] }, { "prim": "nat" } ] } ]
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "prim": "or",
                        "args": [
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "pair",
                                "args": [
                                  { "prim": "address" },
                                  {
                                    "prim": "list",
                                    "args": [ { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "nat" }, { "prim": "nat" } ] } ] } ]
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "prim": "list",
                            "args": [
                              {
                                "prim": "or",
                                "args": [
                                  { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] },
                                  { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "nat" } ] } ] }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "prim": "pair",
                    "args": [
                      { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "pair", "args": [ { "prim": "address" }, { "prim": "bool" } ] } ] },
                      {
                        "prim": "pair",
                        "args": [
                          { "prim": "address" },
                          {
                            "prim": "pair",
                            "args": [
                              { "prim": "timestamp" },
                              { "prim": "big_map", "args": [ { "prim": "nat" }, { "prim": "map", "args": [ { "prim": "string" }, { "prim": "bytes" } ] } ] }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          { "prim": "UNPAIR" },
          {
            "prim": "IF_LEFT",
            "args": [
              [
                { "prim": "DUP" },
                { "prim": "CAR" },
                {
                  "prim": "MAP",
                  "args": [
                    [
                      { "prim": "DUP" },
                      { "prim": "CDR" },
                      { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] },
                      { "prim": "COMPARE" },
                      { "prim": "EQ" },
                      { "prim": "IF", "args": [ [], [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_TOKEN_UNDEFINED" } ] }, { "prim": "FAILWITH" } ] ] },
                      { "prim": "DUP" },
                      { "prim": "CAR" },
                      { "prim": "DUP", "args": [ { "int": "4" } ] },
                      { "prim": "GET", "args": [ { "int": "3" } ] },
                      { "prim": "COMPARE" },
                      { "prim": "EQ" },
                      {
                        "prim": "IF",
                        "args": [
                          [ { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] }, { "prim": "SWAP" }, { "prim": "PAIR" } ],
                          [ { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "0" } ] }, { "prim": "SWAP" }, { "prim": "PAIR" } ]
                        ]
                      }
                    ]
                  ]
                },
                { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                { "prim": "DIG", "args": [ { "int": "2" } ] },
                { "prim": "CDR" },
                { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                { "prim": "DIG", "args": [ { "int": "3" } ] },
                { "prim": "TRANSFER_TOKENS" },
                { "prim": "CONS" }
              ],
              [
                {
                  "prim": "IF_LEFT",
                  "args": [
                    [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_FA2_TX_DENIED" } ] }, { "prim": "FAILWITH" } ],
                    [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "FA2_OPERATORS_UNSUPPORTED" } ] }, { "prim": "FAILWITH" } ]
                  ]
                }
              ]
            ]
          },
          { "prim": "PAIR" }
        ]
      ]
    }
  ]
}

export default createEducationContract;
