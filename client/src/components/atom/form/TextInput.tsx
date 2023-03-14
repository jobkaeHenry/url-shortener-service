/** @jsxImportSource @emotion/react */
import { FontWeightType } from "@/types/typography";
import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";

export interface TextInputProp
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onClick" | "pattern"> {
  icon?: any;
  width?: string;
  error?: boolean;
  weight?: FontWeightType;
  css?: Interpolation<Theme>;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line react/display-name
const TextInput = React.forwardRef(
  (props: TextInputProp, ref: React.ForwardedRef<HTMLInputElement>) => {
    const Icon = props.icon;
    const { width, onClick, ...others } = props;
    return (
      <InputWrapper
        css={css`
          position: relative;
          width: ${width};
        `}

      >
        <Input type={"text"} ref={ref} {...others} />
        {Icon && (
          <Icon
            css={css`
              position: absolute;
              right: 8px;
            `}
            onClick={onClick}
          />
        )}
      </InputWrapper>
    );
  }
);

const Input = styled.input`
  & {
    padding: 16px;
    padding-right: ${(props: TextInputProp) => (props.icon ? "48px" : "")};
    outline-style: solid;
    outline-width: 1px;
    font-weight: ${(props) => (props.weight ? props.weight : "var(--bold)")};
    width: 100%;
    outline-color: var(--line-gray);
    border-radius: 6px;
    resize: none;
    accent-color: var(--main);
  }
  &:disabled {
    background-color: #eee;
    color: var(--font-light-gray);
  }
  &:focus {
    filter: ${(props) =>
      props.error
        ? "drop-shadow(0px 0px 2px var(--alert-red))"
        : "drop-shadow(0px 0px 2px var(--main))"};
    color: var(--font-main);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export default TextInput;
