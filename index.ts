import _config from "./configs";
import _phase from "./phase";


import axios from "axios";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'


export const config = _config();
const phase = _phase();


export const instance = axios.create({
  baseURL: "http://3.14.251.141:3000/graphql"
});


export const communicationDb = new JsonDB(new Config("./myDataBase/communication", true, true, '/'));
export const phrasesDb = new JsonDB(new Config("./myDataBase/sidPhrases", true, true, '/'));
export const derivatedKeysDb = new JsonDB(new Config("./myDataBase/derivatedKeys", true, true, '/'));
export const usersDb = new JsonDB(new Config("./myDataBase/users", true, true, '/'));




phase.keysWork()
.then((data) => {


  phase.workWithUser()
  .then((receivedTokens) => {


    instance.defaults.headers.common['Authorization'] = receivedTokens.accessToken;


    phase.createAccaunt(data)
    .then((adresses) => {


      phase.replenishment(adresses);


    });

  })


})


instance.defaults.headers.common['Authorization'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkMGExMmEwLWMwZTQtNDQwNi05YjNjLTE0ZDVjZmJiZDQ3MCIsImVtYWlsIjoic2FAdGVzdC5iZSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjAxNzg4ODQ1LCJleHAiOjE2MDE4NzUyNDV9.SiYN7mLqrteQ7Pyzz6HoHTWM3GV1s7AmIr1MHUz2j-Y";

/* import sing from "./phase/replenishment/signTransaction";

const transaction = `{"sum":"1e-8","fee":"0.00000226","inputs":[{"txId":"b3bb9d106f982139dddf057d3643d8636ae8660d2f068248594847d675fea9e9","hex":"0200000001030dbac5b4b8087eef7f8c660944a60dd0622017b2bba8ce584e65cea77b6714010000006a473044022039840da5002118bc16c005f257533db3fff6e4833359779afc5289fbcaa40c9d0220203c6ac860197280d3ce25cab09b1e0d75ff1e72e7a896f7c446468ed2885a92012103783d94e4c6971cbeb70f4f590040c7544a7da5feecc0c8e47fc33b2bcd3139d2ffffffff02e7030000000000001976a914b5a8b3861eb44bdda58eca1956e1ff7e3049382088ac85150f00000000001976a914b5a8b3861eb44bdda58eca1956e1ff7e3049382088ac00000000","n":1,"value":"988549","address":"mx5UhLwvd6GspYBin23syP2pWa828FpEBf","type":"pubkeyhash","scriptPubKeyHex":"76a914b5a8b3861eb44bdda58eca1956e1ff7e3049382088ac"}],"outputs":[{"address":"n2w816FMsPoWAmGfvy4THfwW1nNf11mqm2","amount":"1"},{"address":"mg3WWSztWWruSGaxGtMm1otepiVUvdMBPz","amount":"988322"}]}`;

console.log(JSON.parse(transaction));

let obj = JSON.parse(transaction);

console.log(obj);
console.log(JSON.stringify(obj))

console.log(JSON.stringify(obj))

sing(obj)
.then((response: any) => {

  communicationDb.push(`/communication[${communicationDb.count("/communication") - 1}]/responces`, response.data, true);

  console.log(response.data)

}, err => console.log(err.response.data)); */


/* phase.workWithUser()
.then((this1) => console.log(this1)); */




/* db.push("/arraytest/myarray[]", {
  obj:'test'
}, true); */