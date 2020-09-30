import { communicationDb, phrasesDb, derivatedKeysDb } from "../../index";
import generateSeedPhrase from "./generateSeedPhrase";
import getDataFromSeed from "./getDataFromSeed";
import derivateKeys from "./derivateKeys";




export default () => {


  return generateSeedPhrase()
  .then((request: any) => {
  
    communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, request.data, true);
    phrasesDb.push("/phrases[]", request.data.data.generateSeedPhrase.seedPhrase, true);

    
    return getDataFromSeed()
    .then((request: any) => {
    
      communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, request.data, true);
      

      const getDataFromSeed = request.data.data.getDataFromSeed;
      
    
      return derivateKeys(getDataFromSeed.masterAccountPrivateKey, getDataFromSeed.sidPhrase)
      .then((request: any) => {

        communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, request.data, true);
        
        const receivedDerivatedKeys = request.data.data.derivateKeys;
  
        derivatedKeysDb.push("/keys[]", receivedDerivatedKeys, true);
  
        return 2;
  
      }, err);
    

    }, err);


  }, err);

	
};




function err(err:any) {
  console.log(err);
  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, err, true);
}