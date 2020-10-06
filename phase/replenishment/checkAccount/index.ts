import { v4 as uuid} from "uuid";


import { instance, communicationDb } from "../../../index";




export default (id: string) => {

  let query = `query {
    account(input: {
      uuid:"${uuid()}"
      id:"93e57afc-964f-4fca-8369-ccccebe1e44f"
    }){
      id
      blockchain
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