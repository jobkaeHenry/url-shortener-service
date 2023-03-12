import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
  `;

type LoadingSpinnerProps = {
  size?: number;
};

export const LoadingSpinner = styled.div`
  display: block;
  width: ${(props: LoadingSpinnerProps) => (props.size ? props.size : "56")}px;
  height: ${(props: LoadingSpinnerProps) => (props.size ? props.size : "56")}px;
  border: 7px solid var(--line-gray);
  border-radius: 100%;
  margin: 0 auto;
  border-top-color: var(--main);
  animation: ${spin} 500ms linear infinite;
`;
