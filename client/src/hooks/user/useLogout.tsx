import { LoginStatus } from "@/context/recoil/atom/user";
import { client } from "@/index";
import { removeLS } from "@/utils/localStorage";
import { useSetRecoilState } from "recoil";

const useLogout = () => {
  const setIsLogin = useSetRecoilState(LoginStatus);
  const logoutHandler = () => {
    removeLS("accessToken");
    removeLS("refreshToken");
    client.invalidateQueries();
    setIsLogin(false);
  };

  return logoutHandler;
};

export default useLogout;
