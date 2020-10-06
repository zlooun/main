import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default () => {

  let query = `mutation {
    generateSeedPhrase(input: {
      uuid: "${uuid()}"
      blockchain:{
        blockchain:LITECOIN
        network:TESTNET
      }
      lang:ENGLISH
      wordCount:12
    }){
      seedPhrase
    }
  }`;


  communicationDb.push("/communication[]/requests", { query }, true);

  return instance.post("/", { query });

};