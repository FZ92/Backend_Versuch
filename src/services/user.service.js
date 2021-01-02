import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/User");
    }

    get(Email) {
        return http.get(`/User/${Email}`);
    }

    create(data) {
        return http.post("/User", data);
    }

    update(Email, data) {
        return http.put(`/User/${Email}`, data);
    }

    delete(Email) {
        return http.delete(`/User/${Email}`);
    }

    deleteAll() {
        return http.delete(`/User`);
    }

    findByTitle(Email) {
        return http.get(`/User?Email=${Email}`);
    }
}

export default new UserDataService();
