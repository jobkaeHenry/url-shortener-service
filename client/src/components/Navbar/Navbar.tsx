import styled from "@emotion/styled";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginStatus } from "@/context/recoil/atom/user";
import Text from "../atom/Text";
import { Button } from "../atom/form/Button";
import { login, myPage } from "@/data/URL/local/user/url";
import useLogout from "@/hooks/user/useLogout";

type Props = {};

const Navbar = (props: Props) => {
  const isLogin = useRecoilValue(LoginStatus);
  const navigate = useNavigate();
  const logoutHandler = useLogout();
  return (
    <NavWrapper>
      <Logo
        height={"26px"}
        cursor={'pointer'}
        onClick={() => {
          navigate("/");
        }}
      />
      <ButtonWrapper>
        {isLogin ? (
          <>
            <Button
              className="ghost"
              onClick={() => navigate(myPage)}
              role={"link"}
            >
              <Text typography="sub">마이페이지</Text>
            </Button>

            <Button className="ghost" onClick={logoutHandler}>
              <Text typography="sub">로그아웃</Text>
            </Button>
          </>
        ) : (
          <Link to={login}>
            <Button className="ghost">
              <Text typography="p">로그인</Text>
            </Button>
          </Link>
        )}
      </ButtonWrapper>
    </NavWrapper>
  );
};
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  gap: 8px;
  width: 100%;
  max-width: 60%;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 76px;
  padding: 14px 16px;
  display: flex;
  z-index: 50;
  justify-content: space-between;
  align-items: center;
  background-color: var(--pure-white);
`;

export default Navbar;
