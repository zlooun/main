import axios from "axios";
import { v4 as uuid} from "uuid";


import { communicationDb, config } from "../../../index";




export default (masterAccountPrivateKey: string, sidPhrase: string) => {

  const url = config.main().url;

  let query = `mutation {
    derivateKeys(input: {
      uuid:"${uuid()}"
      blockchain:{
        blockchain:BITCOIN
        network:TESTNET
      }
      from:{
        masterPrivateKey:"${ masterAccountPrivateKey }"
        seedPhrase: "${ sidPhrase }"
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
  
  return axios.post(url, { query });

};