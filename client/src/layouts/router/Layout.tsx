import Navbar from "@/components/Navbar/Navbar";
import { LoginStatus } from "@/context/recoil/atom/user";
import useLogout from "@/hooks/user/useLogout";
import { getLS } from "@/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import DefaultLayout from "../DefaultLayout";

export const LogOutOnly = () => {
  const auth = useRecoilValue(LoginStatus);
  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export const UserOnly = () => {
  const logoutHandler = useLogout();
  const auth = () => {
    const access = getLS("accessToken");
    const refresh = getLS("refreshToken");
    if (refresh && access) {
      return true;
    } else {
      logoutHandler();
      return false;
    }
  };

  return auth() ? <Outlet /> : <Navigate to="/user/login" />;
};

export const HeaderLayout = () => {
  return (
    <>
      <Navbar />
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  );
};

const NestedLayout = () => {
  return <Outlet />;
};

export default NestedLayout;
