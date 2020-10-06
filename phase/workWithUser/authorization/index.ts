import { v4 as uuid} from "uuid";
import { instance, communicationDb } from "../../../index";




export default (login: string, password: string) => {

  let query = `mutation {
    authorization(input: {
      uuid:"${uuid()}"
      login:"${ login }"
      password:"${ password }"
    }){
      accessToken
      refreshToken
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query });

};