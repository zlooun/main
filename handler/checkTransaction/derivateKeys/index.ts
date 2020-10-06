import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default (masterAccountPrivateKey: string, sidPhrase: string) => {

  let query = `mutation {
    derivateKeys(input: {
      uuid:"${uuid()}"
      blockchain:{
        blockchain:LITECOIN
        network:TESTNET
      }
      from:{
        masterPrivateKey:"${ masterAccountPrivateKey }"
      }
      pathCursor:{
        path:""
        limit:20
        skip:0
      }
    }){
      path
      address
      publicKey
      privateKey
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query });

};