const fetcher = async (
  arg: RequestInfo,
  ...args: RequestInit[]
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any> => {
  const response = await fetch(arg, ...args);
  const data = await response.json();
  return data;
};

export default fetcher;
