import { LoginStatus } from "@/context/recoil/atom/user";
import { removeLS } from "@/utils/localStorage";
import { useSetRecoilState } from "recoil";

const useLogout = () => {
  const setIsLogin = useSetRecoilState(LoginStatus);
  const logoutHandler = () => {
    removeLS("accessToken");
    removeLS("refreshToken");
    setIsLogin(false);
  };

  return logoutHandler;
};

export default useLogout;
