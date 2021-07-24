import HttpService from "./HttpService";

export default class AppointmentService {
    static baseURL() {
        return "http://localhost:4000/appointment";
    }

    static getAppointments() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${AppointmentService.baseURL()}/getAppointments`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getRecommendedAppointments(id) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${AppointmentService.baseURL()}/getRecommendations`,
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

    static updateAppointment(appointment) {
        return new Promise((resolve, reject) => {
            console.warn(`${this.baseURL()}/${appointment.id}`)
            HttpService.put(
                `${this.baseURL()}/${appointment.id}`,
                appointment,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static createAppointment(appointment) {

        return new Promise((resolve, reject) => {
            HttpService.post(
                AppointmentService.baseURL(),
                appointment,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static deleteAppointment(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${AppointmentService.baseURL()}/${id}`,
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


}
