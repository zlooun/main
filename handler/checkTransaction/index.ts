import { communicationDb, phrasesDb, derivatedKeysDb } from "../../index";




export default (idTransaction: string, adress: string) => {

return 123;
	
};




function err(err:any) {
  console.log(err);
  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, err, true);
}