import { communicationDb, usersDb } from "../../index";
import importAddressesOrPublicKey from "./importAddressesOrPublicKey";
import importMasterPublicKey from "./importMasterPublicKey";




export default (data: any) => {

  return importAddressesOrPublicKey()
  .then(async (response: any) => {

    communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);
    

    const testAcc = response.data.data.importAddressesOrPublicKey;


    return new Promise((resolve) => {

      let setTimeou = setTimeout(function loop() {


        

        importMasterPublicKey(data.dataFromSeed.masterAccountPublicKey)
        .then((response) => {

          communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);


          console.log(response.data)
    
          if (!response.data.data){
            setTimeou = setTimeout(loop, 10000);
            return;
          }
    
    
          const receivedDerivatedKeys = data.receivedDerivatedKeys;
          const importedAdresses = response.data.data.importMasterPublicKey.addresses.nodes;
    
          console.log(receivedDerivatedKeys);
          console.log(importedAdresses);
          
    
    
          if (receivedDerivatedKeys.length !== importedAdresses.length){
            console.log("Different number of addresses");
            return;
          }
    
    
          let derivatedAddresses: any = [];
    
          receivedDerivatedKeys.forEach((element: any) => {
            derivatedAddresses.push(element.address);
          });
    
          for (const element of importedAdresses) {
            
            if (!derivatedAddresses.includes(element.address)) {
              console.log(`The address doesn't match: ${element.address}`);
              return;
            }
    
          }
    
    
          console.log(true);
    
          
          resolve(derivatedAddresses);

        });


      }, 0);

    });


  }, err);


};




function err(err:any) {
  console.log(err);
  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, err, true);
}