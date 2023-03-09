import MainCarousel from "@/features/main/Carousel";
import MobileWrapper from "@/layouts/MobileWrapper";
import { ReactComponent as SearchIcon } from "@/assets/searchIcon.svg";
import Text from "@/components/atom/Text";
import TextInput from "@/components/atom/TextInput";
import { useRecoilState } from "recoil";
import { LoginStatus } from "@/context/recoil/atom/user";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createUrl } from "@/data/URL/server/newUrl/createUrl";
import { useCallback, useState } from "react";
import ValueWithTitle from "@/components/atom/ValueWithTitle";
import { clientBaseURL } from "@/data/URL/local/clientBaseURL";
import { urlRegExp } from "@/utils/regExp";
import { RowWrapper } from "@/layouts/Wrapper";
import { Button } from "@/components/atom/Button";
import { handleCopyClipBoard } from "@/utils/copyToClipBoard";

type Props = {};

const Main = (props: Props) => {
  const [userInput, setUserInput] = useState("https://");
  const [serverResponse, setServerResponse] = useState("");
  const [hasError, setHasError] = useState(false);
  const isLogin = useRecoilState(LoginStatus);

  const axiosPrivate = useAxiosPrivate();
  const handleSubmit = (value: string) => {
    axiosPrivate
      .post(createUrl, { url: value })
      .then((res) => {
        setServerResponse(res.data.short_code);
      })
      .catch((err) => {
        alert("로그인 후에 이용가능합니다");
      });
  };

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (isLogin && urlRegExp.test(userInput)) {
        handleSubmit(userInput);
      } else if (!isLogin && !hasError) {
        alert("로그인 후에 이용가능합니다");
      } else if (hasError) {
        alert("유효하지 않은 URL입니다");
      }
    },
    [isLogin, hasError]
  );

  return (
    <>
      <MainCarousel />
      <MobileWrapper>
        <Text typography={"h1"} bold>
          간편하게 URL을 단축해보세요
        </Text>
        <TextInput
          onChange={(e) => {
            if (urlRegExp.test(e.target.value)) {
              setHasError(false);
              setUserInput(e.target.value);
            } else setHasError(true);
          }}
          type={"text"}
          defaultValue={userInput}
          onClick={handleClick}
          icon={SearchIcon}
          error={hasError}
        ></TextInput>
        <RowWrapper>
          <ValueWithTitle title={"결과"}>
            {serverResponse
              ? `${clientBaseURL}/${serverResponse}`
              : "URL을 입력후 검색을 눌러주세요"}
          </ValueWithTitle>
          <Button
            width="175px"
            onClick={() =>
              handleCopyClipBoard(`${clientBaseURL}/${serverResponse}`)
            }
          >
            클립보드에 복사
          </Button>
        </RowWrapper>
      </MobileWrapper>
    </>
  );
};

export default Main;
