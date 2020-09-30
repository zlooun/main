import axios from "axios";
import { v4 as uuid} from "uuid";


import { communicationDb, config } from "../../../index";




export default () => {

  const url = config.main().url;

  let query = `mutation {
    getDataFromSeed(input: {
      uuid:"${uuid()}"
      blockchain:{
        blockchain:BITCOIN
        network:TESTNET
      }
      seedPhrase:"trial stomach spider document box deputy bread prepare allow mammal text pink"
    }){
      seed
      seedPhrase
      masterPublicKey
      masterPrivateKey
      masterAccountPrivateKey
      masterAccountPublicKey
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return axios.post(url, { query });

};