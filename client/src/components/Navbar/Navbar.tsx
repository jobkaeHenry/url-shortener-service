import styled from "@emotion/styled";

import { ReactComponent as GoBack } from "../../assets/leftArrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoginStatus } from "@/context/recoil/atom/user";
import Text from "../atom/Text";
import { Button } from "../atom/Button";
import { login, myPage } from "@/data/URL/local/user/url";

type Props = {};

const Navbar = (props: Props) => {
  const isLogin = useRecoilValue(LoginStatus);
  const navigate = useNavigate();
  return (
    <NavWrapper>
      <GoBack
        onClick={() => {
          navigate(-1);
        }}
      />
      <ButtonWrapper>
        {isLogin ? (
          <Link to={myPage}>
            <Button className="ghost">마이페이지</Button>
          </Link>
        ) : (
          <Link to={login}><Button className="ghost">로그인</Button></Link>
        )}
      </ButtonWrapper>
    </NavWrapper>
  );
};
const ButtonWrapper = styled.div`
  width: 150px;
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 14px 16px;
  display: flex;
  z-index: 50;
  justify-content: space-between;
  align-items: center;
  background-color: var(--pure-white);
`;

export default Navbar;
