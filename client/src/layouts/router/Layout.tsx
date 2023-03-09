import Navbar from "@/components/Navbar/Navbar";
import { userState } from "@/context/recoil/atom/user";
import { cleanLS, getLS } from "@/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";

export const LogOutOnly = () => {
  const auth = useRecoilValue(userState);
  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export const UserOnly = () => {
  const resetUserState = useResetRecoilState(userState);
  const hasUserInfo = useRecoilValue(userState);
  const auth = () => {
    const access = getLS("accessToken");
    const userInfo = hasUserInfo || getLS("userInfo");
    const refresh = getLS("refreshToken");
    if (refresh && userInfo && access) {
      return true;
    } else {
      cleanLS();
      resetUserState();
      return false;
    }
  };
  return auth() ? <Outlet /> : <Navigate to="/user/login" />;
};

export const HeaderLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const NestedLayout = () => {
  return <Outlet />;
};

export default NestedLayout;
