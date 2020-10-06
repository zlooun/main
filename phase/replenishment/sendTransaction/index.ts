import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default (hex: string) => {

  const query = `mutation sendTransaction($input:SendTransactionInput!) {
    sendTransaction(input: $input)
  }`

  const variables = {
    input: {
      uuid: uuid(),
      blockchain: "LITECOIN",
      hex
    }
  }

  console.log(variables)


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query, variables }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

};