const BASE_URL = "http://127.0.0.1:8080/api/v1";

const createEndpoint = (path: string): string => `${BASE_URL}/${path}`;

const AuthEndpoints = {
  register: createEndpoint("auth/registration"),
  registerWithMetaMask: createEndpoint("auth/registrationWithMetaMask"),
  login: createEndpoint("auth/login"),
  loginWithMetaMask: createEndpoint("auth/loginWithMetaMask"),
  refreshToken: createEndpoint("auth/token/refresh"),
  logout: createEndpoint("auth/logout")
};

const UserEndpoints = {
  profile: createEndpoint("user/profile")
}

export {
  AuthEndpoints,
  UserEndpoints
};