import { v4 as uuid} from "uuid";
import { instance, communicationDb, config } from "../../../index";




export default (masterAccountPublicKey: string) => {

  let query = `mutation {
    importMasterPublicKey(input: {
      uuid:"${uuid()}"
      blockchain:LITECOIN
      publicKey:"${ masterAccountPublicKey }"
    }){
      id
      blockchain
      totalBalance{
        BITCOIN{
          balance
        }
      }
      masterPubKey
      addresses(first: 20){
        nodes{
          address
          balance{
            BITCOIN{
              balance
            }
          }
        }
        cursor
      }
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query });

};