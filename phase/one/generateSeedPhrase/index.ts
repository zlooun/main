import axios from "axios";
import { v4 as uuid} from "uuid";
import { communication, phrases } from "index";
import { config } from "index";




const url = config.main().url;


export default () => {

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


  communication.push("/communication[]/requests", { query }, true);
  
  return axios.post(url, { query });

};