import nextServer from "./api";

export const requestResetEmail = (email: string) => {
    return nextServer.post('/auth/request-reset-email', { email });
};

export const resetPassword = (token: string, password: string) => {
  return nextServer.post('/auth/reset-password', {
    token,
    password,
  });
};