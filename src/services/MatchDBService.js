import HttpService from "./HttpService";

export default class MatchDBService {
  static baseURL() {
    return "http://localhost:4000/match";
  }

  static addMatchDB(usera, userb) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${MatchDBService.baseURL()}/`,
        {
          usera: usera,
          userb: userb,
        },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static getCurrent(id) {
    console.log(`${MatchDBService.baseURL()}/current/${id}`);
    return new Promise(async (resolve, reject) => {
      HttpService.get(
          `${MatchDBService.baseURL()}/current/${id}`,
          function (data) {
            if (data !== undefined || Object.keys(data).length !== 0) {
              resolve(data);
            } else {
              reject("Error while retrieving current Match");
            }
          },
          function (textStatus) {
            reject(textStatus);
          }
      );
    });
  }
}

