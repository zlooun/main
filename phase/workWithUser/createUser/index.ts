import { v4 as uuid} from "uuid";
import { instance, communicationDb } from "../../../index";




export default (login: string, email: string, password: string) => {

  let query = `mutation {
    createUser(input: {
      uuid:"${uuid()}"
      login:"${ login }"
      email:"${ email }"
      password:"${ password }"
    }){
      accessToken
      refreshToken
    }
  }`


  communicationDb.push("/communication[]/requests", { query }, true);
  
  return instance.post("/", { query });

};