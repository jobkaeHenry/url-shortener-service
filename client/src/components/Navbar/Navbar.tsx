import styled from "@emotion/styled";

import { ReactComponent as GoBack } from "../../assets/leftArrow.svg";
import { useNavigate } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  return (
    <NavWrapper>
      <GoBack
        onClick={() => {
          navigate(-1);
        }}
      />
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--pure-white);
`;

export default Navbar;
