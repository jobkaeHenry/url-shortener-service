import SectionHeading from "@/components/SectionHeading";
import styled from "@emotion/styled";
import React from "react";
import PaddingLayout from "../PaddingLayout";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const LogsLayOut = PaddingLayout
interface SelectiveInterface extends Props {
  validation: boolean;
}

const SelectiveRender = ({ validation, children }: SelectiveInterface) => {
  return validation ? <>{children}</> : <></>;
};

const Main = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;
`;

export default Object.assign(LogsLayOut, {
  Title: SectionHeading,
  Selective: SelectiveRender,
  Main,
});
