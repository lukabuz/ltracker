class Auth {
  constructor() {
    this.authenticated = false;
  }

  async login(credentials, successCb, failureCb) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/widgets/logIn`, {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      const body = await response.json();

      if (body.status === 'success') {
        this.authenticated = true;
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('password', credentials.password);
        successCb();
      } else {
        failureCb();
      }
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem('password');
  }

  get isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
