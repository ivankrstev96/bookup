
export const PROP_NAME_ACCESS_TOKEN = "access-token";
export const getAccessToken = (): string | null => {
  return localStorage.getItem(PROP_NAME_ACCESS_TOKEN);
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(PROP_NAME_ACCESS_TOKEN, accessToken);
};

export const clearAccessToken = () => {
  localStorage.removeItem(PROP_NAME_ACCESS_TOKEN);
};

export const getAuthorizationHeaderValue = (authToken: string): string => {
  const tokenValue = (!!authToken) ? authToken : getAccessToken();
  return `Bearer ${tokenValue}`;
};
