import { communicationDb, usersDb } from "../../index";
import createUser from "./createUser";
import authorization from "./authorization";


import passwordGenerator from "password-generator";


const randomEmail = require("random-email");




export default () => {

  const login = passwordGenerator(6, true, /\w/);
  const email = randomEmail({ domain: "test.be" });
  const password = passwordGenerator(12, false);
  

  console.log(login);
  console.log(email);
  console.log(password);

  
  return createUser(login, email, password)
  .then((request: any) => {

    communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, request.data, true);
    
    const receivedTokens = request.data.data.createUser;

    const user = {
      login,
      email,
      password,
      tokens: receivedTokens
    }

    usersDb.push("/users[]/", user, true);


    return authorization(login, email, password)
    .then((request: any) => {

      communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, request.data, true);
      
      const receivedTokens = request.data.data.authorization;

      return receivedTokens;
  
    }, err);


  }, err);
  

};




function err(err:any) {
  console.log(err);
  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, err, true);
}