import { v4 as uuid} from "uuid";
import { instance, communicationDb, config } from "../../../index";




export default () => {


  const address = config.main().testAddress;

  const query = `mutation {
    importAddressesOrPublicKey(input: {
      uuid:"${uuid()}"
      blockchain:LITECOIN
      address:"${ address }"
    }){
      id
      totalBalance{
        LITECOIN{
          balance
        }
      }
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query });

};