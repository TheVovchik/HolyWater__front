export const setData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getData = (key: string) => {
  const savedDate = localStorage.getItem(key);

  if (savedDate) {
    return JSON.parse(savedDate);
  }

  return null;
};
