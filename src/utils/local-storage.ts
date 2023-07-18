import { type User } from "./types";

export default function getUser() : User | null{
  const user = localStorage.getItem("user")
  return user != null ? JSON.parse(user) : null;
}

export function setUser(data: User){
  return localStorage.setItem("user", JSON.stringify(data));
}

export function deleteUser(){
  return localStorage.removeItem("user");
}

