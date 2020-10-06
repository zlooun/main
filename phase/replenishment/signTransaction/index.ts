import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default (transaction: any) => {

  const query = `mutation Sign($input:SignInput!) {
    sign(input: $input)
  }`

  const variables = {
    input: {
      uuid: uuid(),
      blockchain: {
        blockchain: "LITECOIN",
        network: "TESTNET"
      },
      data: JSON.stringify(transaction),
      privateKey: JSON.stringify({
        "mx5UhLwvd6GspYBin23syP2pWa828FpEBf": "cU7UcoaDHKNXqQqojz2GkBm2feZK215h33T28ZAaKyENzaunzcpK"
      }),
      isTx: true
    }
  }


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query, variables }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

};