import axios from "axios";
import { v4 as uuid} from "uuid";
import { communication, phrases } from "app";
import { config } from "app";


const url = config.main().url;

export default () => {
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
      masterPublicKey
      masterPrivateKey
      masterAccountPrivateKey
      masterAccountPublicKey
    }
  }`

  communication.push("/communication[]/requests", { query }, true);

  return axios.post(url, { query });
};
