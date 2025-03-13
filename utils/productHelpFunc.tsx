const getDataFromParam = (str: string) => {
  const regex = /^(.*?)-id(\d+)\.html$/;
  const match = str.match(regex);
  let name: string | null = null;
  let id: string | null = null;
  if (match) {
    name = match[1];
    id = match[2];
  }
  return {
    name,
    id,
  };
};

export default getDataFromParam;
