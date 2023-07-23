import { User } from "./types";

export default async function fetchBackend({
  pathname,
  request,
  handleFunction,
}: {
  pathname: string;
  request?: RequestInit | undefined;
  handleFunction?: Function | undefined;
}): Promise<User | null> {
  const URL = "http://localhost:3000";

  const response = await fetch(URL + pathname, request);

  if (response.status !== 200) {
    return null;
  }

  const data: User = await response.json();

  if (handleFunction) {
    handleFunction(data);
  }

  return new Promise((resolve) => {
    console.log(data)
    resolve(data);
  });
}
