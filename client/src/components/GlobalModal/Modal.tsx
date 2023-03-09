import { isModalOpenAtom, modalComponentAtom } from "@/context/recoil/atom/globalModalAtom";
import useWindowSize from "@/hooks/useWindowSize";

import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import Portal from "./Portal";

export const Modal = () => {
  const modalElem = useRecoilValue(modalComponentAtom);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
  // 윈도우사이즈(모바일에서 상단, 하단바를 제외한 실제 크기)
  const { height } = useWindowSize();

  useEffect(() => {
    return () => {
      window.removeEventListener("popstate", () => setIsModalOpen(false));
    };
  }, []);

  return isModalOpen ? (
    <Portal>
      <ModalBackDrop
        height={height}
        onClick={() => {
          window.history.back();
          setIsModalOpen(false);
        }}
      >
        <ModalWrapper
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* <Button onClick={() => setIsModalOpen((prev) => !prev)} /> */}
          {modalElem}
        </ModalWrapper>
      </ModalBackDrop>
    </Portal>
  ) : null;
};
const ModalWrapper = styled.div`
  width: calc(100% - 48px);
  height: calc(100% - 48px);
  position: relative;
  padding: 16px;
  background-color: var(--pure-white);
  border-radius: 8px;
`;

const ModalBackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: ${(props: { height?: number; width?: number }) =>
    `${props.height}px`};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 998;
`;
