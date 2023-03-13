export const shortUrlCreator = (length: number = 6) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsLength = chars.length;
  let shortId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charsLength);
    shortId += chars.charAt(randomIndex);
  }

  return shortId;
};
