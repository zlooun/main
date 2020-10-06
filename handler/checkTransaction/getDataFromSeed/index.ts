import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default (seedPhrase: string) => {

  let query = `mutation {
    getDataFromSeed(input: {
      uuid:"${uuid()}"
      blockchain:{
        blockchain:LITECOIN
        network:TESTNET
      }
      seedPhrase:"${ seedPhrase }"
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
  
  return instance.post("/", { query });

};