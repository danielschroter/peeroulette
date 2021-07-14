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

    // static getMovie(id) {
    //     return new Promise(async (resolve, reject) => {
    //         HttpService.get(
    //             `${MovieService.baseURL()}/${id}`,
    //             function (data) {
    //                 if (data !== undefined || Object.keys(data).length !== 0) {
    //                     resolve(data);
    //                 } else {
    //                     reject("Error while retrieving movie");
    //                 }
    //             },
    //             function (textStatus) {
    //                 reject(textStatus);
    //             }
    //         );
    //     });
    // }
    //

    //
    // static updateMovie(movie) {
    //     return new Promise((resolve, reject) => {
    //         console.warn(`${this.baseURL()}/${movie._id}`)
    //         HttpService.put(
    //             `${this.baseURL()}/${movie._id}`,
    //             movie,
    //             function (data) {
    //                 resolve(data);
    //             },
    //             function (textStatus) {
    //                 reject(textStatus);
    //             }
    //         );
    //     });
    // }
    //
    // static getRating(movieId) {
    //     return new Promise((resolve, reject) => {
    //         HttpService.get(
    //             `${this.baseURL()}/rate/${movieId}`,
    //             function (data) {
    //                 resolve(data);
    //             },
    //             function (textStatus) {
    //                 reject(textStatus);
    //             }
    //         );
    //     });
    // }
    //
    // static rateMovie(movieId, rating) {
    //     return new Promise((resolve, reject) => {
    //         HttpService.put(
    //             `${this.baseURL()}/rate/${movieId}`,
    //             { rating: rating },
    //             function (data) {
    //                 resolve(data);
    //             },
    //             function (textStatus) {
    //                 reject(textStatus);
    //             }
    //         );
    //     });
    // }
    //

}
