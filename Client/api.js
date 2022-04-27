import axios from "axios";
import config from "../config/config";
import * as SecureStore from "expo-secure-store";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const api = axios.create({
  baseURL: config.api_url,
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiSecure = axios.create({
  baseURL: config.api_url,
  timeout: 15 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiSecure.interceptors.request.use(async (req) => {
  const credentials = await SecureStore.getItemAsync("USER_AUTH");

  //console.log('credentials', credentials)

  if (credentials) {
    const myJson = JSON.parse(credentials);
    const token = "Bearer " + myJson.accessToken;
    req.headers.authorization = token;
  }

  return req;
});

//Jos Backendin token middleware palauttaa 401 == koitetaan noutaa uutta tokenia
const refreshAuthLogic = async (failedRequest) => {
  const credentials = await SecureStore.getItemAsync("USER_AUTH");

  if (!credentials) {
    console.log("[refreshAuthLogic] Could not get credentials");
    return;
  }

  const jsonCredentials = JSON.parse(credentials);

  const data = {
    refreshToken: jsonCredentials.refreshToken,
  };

  const options = {
    method: "POST",
    url: config.api_url + "/refreshToken",
    data,
  };

  return axios(options)
    .then(async (RefreshResponse) => {
      const NewAccessToken = RefreshResponse.data.accessToken;
      const NewRefreshToken = RefreshResponse.data.refreshToken;
      console.log("NewAccessToken", NewAccessToken);
      failedRequest.response.config.headers.Authorization =
        "Bearer " + NewAccessToken;

      //Tallennetaan Uusi access token puhelimen dataan
      await SecureStore.setItemAsync(
        "USER_AUTH",
        JSON.stringify({
          ...jsonCredentials,
          accessToken: NewAccessToken,
          refreshToken: NewRefreshToken,
        })
      );

      return Promise.resolve();
    })
    .catch((e) => {
      console.log("[refreshAuthLogic] catch((e)", e);
      /*
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
      });
      */
    });
};

createAuthRefreshInterceptor(apiSecure, refreshAuthLogic, {});
