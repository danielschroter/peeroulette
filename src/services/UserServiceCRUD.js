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


    static updateUser(user) {
        return new Promise((resolve, reject) => {
            console.warn(user.username)
            HttpService.post(
                `${this.baseURL()}/register`,
                {
                    username: user.username,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    compname: user.compname,
                    domains: user.domains,
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
