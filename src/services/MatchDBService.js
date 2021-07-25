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
}
