import axios from "axios";
import { v4 as uuid} from "uuid";
import { communication } from "app";
import { config } from "app";


const url = config.main().url;

const qlQuery = () => {
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

export default qlQuery;
