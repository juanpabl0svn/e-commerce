export default function getUser() {
  return localStorage.getItem("user") || null;
}

