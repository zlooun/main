import { communicationDb, phrasesDb, derivatedKeysDb } from "../../index";
import checkAccount from "./checkAccount";
import makeTransaction from "./makeTransaction";
import signTransaction from "./signTransaction";
import sendTransaction from "./sendTransaction";




export default (adresses: any) => {


  return checkAccount("624a617b-db5b-4e11-a781-5e9f53cdfff2")
  .then((response: any) => {

    communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);
    
    if (!response.data.data) {
      console.log(response.data)
      console.log("err");
      return Promise.reject();
    }


    const balance = response.data.data.account.totalBalance.LITECOIN.balance;

    if (balance <= 0) {
      console.log("Small balance");
      return Promise.reject();
    }


    const randomAdress = adresses[Math.floor(Math.random() * Math.floor(20))];


    console.log(randomAdress);

    return makeTransaction(randomAdress)
    .then((response: any) => {
      
      communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);

      if (!response.data.data) {
        console.log(response.data)
        console.log("err");
        return Promise.reject();
      }

      
      const transaction = response.data.data.makeTransaction;

      console.log(transaction)
      

      signTransaction(transaction)
      .then((response: any) => {

        communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);

        console.log(response.data);

        const sign = response.data.data.sign;


        sendTransaction(sign)
        .then((response: any) => {

          communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);
  
          console.log(response.data);
  
  
        }, err);

      }, err);

    }, err);

  }, err);
	
};




function err(err:any) {
  console.log(err.response.data.errors);
  console.log(err.response.data.errors[0].locations);
  console.log(err.response.data.errors[0].extensions);
  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, err, true);
}