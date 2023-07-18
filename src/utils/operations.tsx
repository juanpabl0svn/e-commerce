export default async function fetchBackend({
  pathname,
  request,
  handleFunction,
}: {
  pathname: string;
  request?: RequestInit | undefined;
  handleFunction?: Function | undefined;
}) {
  const URL = "http://localhost:3000";

  const response = await fetch(URL + pathname, request);


  if (response.status !== 200){
    return 
  }

  const data = await response.json();


  if (handleFunction) {
    handleFunction(data);
  }

return new Promise((resolve, reject) => {
  resolve(data);
  reject(data);
})
}
