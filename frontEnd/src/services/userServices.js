import httpServices, { setCommonHeader } from "./httpServices";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

setTokenHeader();

// getting the JWT from local storage
export function getJWT() {
  return localStorage.getItem(TOKEN_KEY);
}

// sign up new user
export async function signUp(newUser) {
  return await httpServices.post("/users/new-user", newUser);
}

// login user
export async function logIn(user) {
  const { data } = await httpServices.post("/auth", user);
  localStorage.setItem(TOKEN_KEY, data.token);
  setTokenHeader();
  return;
}

// logout user
export async function logOut() {
  localStorage.removeItem(TOKEN_KEY);
  setTokenHeader();
  return;
}

// get logged in user info
export function getUser() {
  const token = getJWT();
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

// show all users in database
export async function showUsers() {
  return await httpServices.get("/users/all");
}

// get user info by id
export async function getUserInfos(userId) {
  return await httpServices.post("/users/user-info", userId);
}

// update user role
export async function updateUserRole(role) {
  return await httpServices.put("/users/role-update", role);
}

export async function userProfileUpdate(data) {
  return await httpServices.post("/users/user-update", data);
}

// set token as common header
export function setTokenHeader() {
  setCommonHeader("x-auth-token", localStorage.getItem(TOKEN_KEY));
}

const userService = {
  signUp,
  showUsers,
  logIn,
  logOut,
  getUser,
  updateUserRole,
  userProfileUpdate,
};

export default userService;
