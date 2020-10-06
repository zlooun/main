import { communicationDb, phrasesDb, derivatedKeysDb } from "../../index";
import generateSeedPhrase from "./generateSeedPhrase";
import getDataFromSeed from "./getDataFromSeed";
import derivateKeys from "./derivateKeys";




export default () => {


  return generateSeedPhrase()
  .then((response: any) => {
  
    communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);


    const seedPhrase = response.data.data.generateSeedPhrase.seedPhrase;

    phrasesDb.push("/phrases[]", seedPhrase, true);

    
    return getDataFromSeed(seedPhrase)
    .then((response: any) => {
    
      communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);
      

      const dataFromSeed = response.data.data.getDataFromSeed;
      
    
      return derivateKeys(dataFromSeed.masterAccountPrivateKey, dataFromSeed.sidPhrase)
      .then((response: any) => {

        communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);
        
        const receivedDerivatedKeys = response.data.data.derivateKeys;
  
        derivatedKeysDb.push("/keys[]", receivedDerivatedKeys, true);
  
        console.log(dataFromSeed);

        return {
          dataFromSeed,
          receivedDerivatedKeys
        }
  
      }, err);
    

    }, err);


  }, err);

	
};




function err(err:any) {
  console.log(err);
  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, err, true);
}