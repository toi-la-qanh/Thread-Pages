import BaseApi from './base.api';

let url = `${process.env.REACT_APP_BACKEND_URL}/api/user`;

export default class UserApi extends BaseApi {
  get() {
    return this.get(`${url}`);
  }

  login(data) {
    return this.post(`${url}/login`, data);
  }

  register(data) {
    return this.post(`${url}/register`, data);
  }

  logout() {
    return this.post(`${url}/logout`);
  }
};
