export default async function fetchBackend({
  pathname,
  headers,
  handleFunction,
}: {
  pathname: string;
  headers?: RequestInit | undefined;
  handleFunction?: Function | undefined;
}) {
  const URL = "http://localhost:3000";

  const request = await fetch(URL + pathname, headers);

  if (request.status !== 200){
    return 
  }

  const response = await request.json();

  if (handleFunction) {
    handleFunction(response);
  }

  return response;
}
