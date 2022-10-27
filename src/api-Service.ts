import { emailPassword } from "./values/customTypes";
const rootUrl = process.env.REACT_APP_HOST;
const rootPort = process.env.REACT_APP_PORT;

export const getSubscriptions = async () => {
  return await fetch(`${rootUrl}:${rootPort}/api/subscriptions`).then((res) => res.json());

  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getCategories = async () => {
  return await fetch(`${rootUrl}/api/categories`).then((res) => res.json());
};

export const checkUser = async (data: emailPassword) => {
  return await fetch(`${rootUrl}:${rootPort}/api/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  }).then((res) => res.json());
};