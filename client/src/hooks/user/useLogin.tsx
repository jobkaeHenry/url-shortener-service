import { LoginStatus } from "@/context/recoil/atom/user";
import { setLS } from "@/utils/localStorage";
import { useSetRecoilState } from "recoil";

interface LoginHandler {
  accessToken: string;
  refreshToken: string;
}
const useLogin = () => {
  const setIsLogin = useSetRecoilState(LoginStatus);
  const loginHandler = ({ accessToken, refreshToken }: LoginHandler) => {
    setLS("accessToken", accessToken);
    setLS("refreshToken", refreshToken);
    setIsLogin(true);
  };

  return loginHandler;
};

export default useLogin;
