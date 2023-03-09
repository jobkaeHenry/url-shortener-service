import styled from "@emotion/styled";
import React from "react";

type Props = {};

const MobileWrapper = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default MobileWrapper;
