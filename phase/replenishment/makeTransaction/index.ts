import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default (toAddress: string) => {

  let query = `mutation {
    makeTransaction(input: {
      uuid:"${uuid()}"
      amount:"1"
      blockchain:LITECOIN
      toAddress:"${ toAddress }"
      fromAddress:"mx5UhLwvd6GspYBin23syP2pWa828FpEBf"
    }){
      sum
      fee
      json
      inputs{
        n
        txId
        hex
        sum
        address
        type
        scriptPubKeyHex
        json
      }
      outputs{
        address
        amount
      }
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query });

};