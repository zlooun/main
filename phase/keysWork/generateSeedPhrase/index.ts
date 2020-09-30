import axios from "axios";
import { v4 as uuid} from "uuid";


import { communicationDb, config } from "../../../index";




export default () => {

  const url = config.main().url;

  let query = `mutation {
    generateSeedPhrase(input: {
      uuid: "${uuid()}"
      blockchain:{
        blockchain:BITCOIN
        network:TESTNET
      }
      lang:ENGLISH
      wordCount:12
    }){
      seedPhrase
    }
  }`;


  communicationDb.push("/communication[]/requests", { query }, true);

  return axios.post(url, { query });

};