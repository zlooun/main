import _config from "./configs";
import _phase from "./phase";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'


export const config = _config();
const phase = _phase();


export const communicationDb = new JsonDB(new Config("./myDataBase/communication", true, true, '/'));
export const phrasesDb = new JsonDB(new Config("./myDataBase/sidPhrases", true, true, '/'));
export const derivatedKeysDb = new JsonDB(new Config("./myDataBase/derivatedKeys", true, true, '/'));
export const usersDb = new JsonDB(new Config("./myDataBase/users", true, true, '/'));

//phase.keysWork().then((answer) => console.log(answer));

phase.keysWork();

/* phase.workWithUser()
.then((this1) => console.log(this1)); */




/* db.push("/arraytest/myarray[]", {
  obj:'test'
}, true); */