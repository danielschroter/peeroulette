import HttpService from "./HttpService";

export default class UserService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }

  static register(email, user, pass, isAdmin, compname, domains) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          email: email,
          username: user,
          password: pass,
          isAdmin: isAdmin,
          compname: compname,
          domains: domains,
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

  static confirm(id) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/confirm`,
        {
          id: id,
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

  static login(user, pass) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/login`,
        {
          username: user,
          password: pass,
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

  static logout() {
    window.localStorage.removeItem("jwtToken");
  }
}
