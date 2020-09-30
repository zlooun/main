import { communication, phrases } from "app";
import generateSeedPhrase from "./generateSeedPhrase";
import getDataFromSeed from "./getDataFromSeed";


const url = "http://3.14.251.141:3000/graphql";

export default () => {
  generateSeedPhrase()
    .then(
      (request: any) => {
        communication.push("/communication[]/responces", request.data, true);
        phrases.push("/phrases[]", request.data.data.generateSeedPhrase.seedPhrase, true);

        getDataFromSeed()
          .then(
            (request: any) => {
              communication.push("/communication[]/responces", request.data, true);
              console.log(request.data);
            },
            err => {
              console.log(err.response.data);
              communication.push("/communication[]/responces", err.response.data, true);
            }
          );
      },
      err => {
        console.log(err.response.data);
        communication.push("/communication[]/responces", err.response.data, true);
      }
    );
};
