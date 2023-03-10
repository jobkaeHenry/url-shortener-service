import Navbar from "@/components/Navbar/Navbar";
import { LoginStatus } from "@/context/recoil/atom/user";
import { cleanLS, getLS } from "@/utils/localStorage";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DefaultLayout from "../DefaultLayout";

export const LogOutOnly = () => {
  const auth = useRecoilValue(LoginStatus);
  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export const UserOnly = () => {
  const setIslogin = useSetRecoilState(LoginStatus);

  const auth = () => {
    const access = getLS("accessToken");
    const refresh = getLS("refreshToken");
    if (refresh && access) {
      return true;
    } else {
      cleanLS();
      setIslogin(false);
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
