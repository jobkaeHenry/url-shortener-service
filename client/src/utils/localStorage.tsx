export const getLS = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  } else return null;
};

export const setLS = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLS = (key: string) => {
  localStorage.removeItem(key);
};

export const cleanLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
};
