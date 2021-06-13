import HttpService from "./HttpService";

export default class UserServiceCRUD {
    static baseURL() {
        return "http://localhost:4000/user";
    }

    static register(user, pass, isAdmin, compname, domains) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserServiceCRUD.baseURL()}/register`,
                {
                    username: user,
                    password: pass,
                    isAdmin: isAdmin,
                    compname: compname,
                    domains: domains
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

    static deleteUser(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${UserServiceCRUD.baseURL()}/${id}`,
                function (data) {
                    if (data.message !== undefined) {
                        resolve(data.message);
                    } else {
                        reject("Error while deleting");
                    }
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
                `${UserServiceCRUD.baseURL()}/login`,
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
