import axios from "axios";

export const API_URL = "https://relomatchserver-production.up.railway.app";
// http://localhost:3001

export const TOKEN_KEY = "user";

export const doApiGet = async (_url) => {
  try {
    const resp = await axios({
      url: _url,
      method: 'GET',
      withCredentials: true,
      data: {}
    })
    return resp.data;
  }
  catch (err) {
    // throw -> reject מקביל ל
    // ככה שנדע שיש בעיה עם הבקשה
    throw err;
  }
}

export const doApiMethod = async (_url, _method, _body = {}) => {
  try {
    const resp = await axios({
      url: _url,
      method: _method,
      withCredentials: true,
      data: _body
    })
    return resp.data;
  }
  catch (err) {
    throw err;
  }
}

export const apiCheckToken = async () => {
  try {
    const resp = await axios({
      url: API_URL+'/users/checkToken',
      method: 'GET',
      withCredentials: true,
      data: {}
    })
    return resp.data;
  }
  catch (err) {
    throw err.response;
  }
}
