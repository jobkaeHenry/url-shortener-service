import useragent from "useragent";

//** user-agent Header 스트링을 입력받아 브라우저이름을 리턴하는 함수 */
export const getBrowserName = (userAgentHeader: string) => {
  return useragent.parse(userAgentHeader).family;
};
