export const fetchMetadata = async (queryContext: any) => {
  const response = await fetch(queryContext.queryKey[1]);
  const data = await response.json();
  return data;
};
