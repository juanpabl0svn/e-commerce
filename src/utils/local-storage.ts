export default function getUser() {
  return localStorage.getItem("user") || null;
}

export function setUser(data){
  return localStorage.setItem("user", JSON.stringify(data));
}

