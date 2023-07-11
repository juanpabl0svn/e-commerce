export default function getUser() {
  return localStorage.getItem("user") || null;
}

export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(rest));
}
