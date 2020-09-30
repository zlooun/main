import axios from "axios";
import { v4 as uuid} from "uuid";
import { communicationDb, config } from "../../../index";




export default (login: string, email: string, password: string) => {

  const url = config.main().url;

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
  
  return axios.post(url, { query });

};