import axios from "axios";
const API_URL = "http://localhost:8081/api/auth/";

class AuthService {
  login(name, password) {
    return axios
      .post(API_URL + "signin", {
        name,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }
  
  register(username, email, password, phone, roles) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      phone,
      roles
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
