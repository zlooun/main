import axios from "axios";
import _config from "./configs";
import _phase from "./phase";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'


export const config = _config();
let phase = _phase();

export const communication = new JsonDB(new Config("./myDataBase/communication", true, false, '/'));
export const phrases = new JsonDB(new Config("./myDataBase/sidPhrases", true, false, '/'));

phase.one();





/* db.push("/arraytest/myarray[]", {
  obj:'test'
}, true); */