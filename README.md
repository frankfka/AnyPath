# Anypath - Mock Verification API


### Getting Started
To get started, run the `dev` script in `package.json` (ex. `npm run dev`). The database of users is initialized with a few mock users, each with their
own Tezos address. For the ID's and account addresses, please see: [mockInitialData.ts](https://github.com/frankfka/AnyPath/blob/main/services/database/mockInitialData.ts)

### Creating an Educational Record

Endpoint: `POST /api/education-record`

Example cURL command:
```
curl --location --request POST 'http://localhost:3000/api/education-record' \
--header 'Content-Type: application/json' \
--data-raw '{
    "recipientId": "c7db2bce-6d15-447f-9cb3-43a562a492dc",
    "educatorId": "afac1d31-6c01-4619-961c-57dd260643ee",
    "metadataCid": "TestMeta"
}'
```

Example response: 
`KUrpNjyy_Ecr7zTfonDxy` (The ID of the verification record)

### Retrieving an Educational Record

Endpoint: `GET /api/education-record/<RECORD_ID>`

Example cURL command:
```
curl --location --request GET 'http://localhost:3000/api/education-record/KUrpNjyy_Ecr7zTfonDxy'
```

Example response:
```
{
    "id": "CA9dJNglKWYVw_BbNXrTr",
    "dateOfCreation": "2021-07-25T21:10:26.000Z",
    "recipientId": "c7db2bce-6d15-447f-9cb3-43a562a492dc",
    "educatorId": "afac1d31-6c01-4619-961c-57dd260643ee",
    "isValid": true,
    "metadataCid": "TestMeta",
    "smartContractAddress": "KT1ED9vYSBcnYiX6FJeHjCRKvddEiRkqNmF1"
}
```
