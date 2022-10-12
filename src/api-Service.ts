import { textChangeRangeIsUnchanged } from "typescript";
import { emailPassword } from "./values/customTypes";
const rootUrl = "http://localhost:3001";

export const getSubscriptions = async () => {
  return await fetch(`${rootUrl}/subscriptions`).then((res) => res.json());

  // .catch((err) => console.log('error @getSubscriptions', err));
};

export const getCategories = async () => {
  return await fetch(`${rootUrl}/categories`).then((res) => res.json());
};

export const checkUser = async (data: emailPassword) => {
  return await fetch(`${rootUrl}/login`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
