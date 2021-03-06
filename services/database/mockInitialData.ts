import {DatabaseSchema} from "./databaseServiceTypes";

const mockInitialData: DatabaseSchema = {
  globals: {
    adminTezosAccount: {
      address: 'tz1gJDgEdy2L5PVEkFCSyJSYPeX1hhw5TzWb',
      secretKey: 'edskS2xPAMhrHPB8uWHMQPKY1fhQ6NSV33KfbkL38ejQ5q2bkJhAtKtwSdNbvTZS7bREiJx4WUEgvb361WfB1kEHvoB5bmoGGk',
    }
  },
  educationRecords: {},
  educators: {
    'afac1d31-6c01-4619-961c-57dd260643ee': {
      address: 'tz1UbbpwwefHU7N7EiHr6hiyFA2sDJi5vXkq',
      secretKey: 'edskRcnMyiRcf9PxbvdjC7DTpZzxnep3tXqdPRibNXgZmr4gPwU7KFVYfLUbcKt5DpbnyDQQrEiUuBVeFWDNFqYvTpQ1YK9PzG',
    }
  },
  users: {
    'c7db2bce-6d15-447f-9cb3-43a562a492dc': {
      address: 'tz1iD9juQZkkeTHbXA8GxseJemeGL9mH8mcW',
      secretKey: 'edskS3T43vBchH6q3T65TQbtNSnq6p9QzJobUvTJiBL9yv3kahwXbnyCe3XG5tWAjdEq6idwKcDxA51t2L7qfLT9f3RM7sCow4',
    }
  }
}

export default mockInitialData
