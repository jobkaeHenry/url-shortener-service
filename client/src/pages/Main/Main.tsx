import MainCarousel from "@/features/main/Carousel";
import MobileWrapper from "@/layouts/MobileWrapper";
import { ReactComponent as SearchIcon } from "@/assets/searchIcon.svg";
import Text from "@/components/atom/Text";
import TextInput from "@/components/atom/form/TextInput";
import { useRecoilValue } from "recoil";
import { LoginStatus } from "@/context/recoil/atom/user";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { createUrl } from "@/data/URL/server/shortUrl/createUrl";
import { useRef, useState } from "react";
import ValueWithTitle from "@/components/atom/ValueWithTitle";
import { clientBaseURL } from "@/data/URL/local/clientBaseURL";
import { urlRegExp } from "@/utils/regExp";
import { RowWrapper } from "@/layouts/Wrapper";
import { Button } from "@/components/atom/form/Button";
import { handleCopyClipBoard } from "@/utils/copyToClipBoard";
import { client } from "@/index";
import { LoadingSpinner } from "@/components/atom/lodaing/Spinner";
import { MutationFunction, useMutation } from "react-query";
import { DashboardItemsType } from "@/types/user/dashBoard";

type Props = {};

const Main = (props: Props) => {
  const [userInput, setUserInput] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const isLogin = useRecoilValue(LoginStatus);

  const handleSubmit: MutationFunction<{ data: DashboardItemsType }, string> = (
    value
  ) => {
    if (userInput) {
      return axiosPrivate.post(createUrl, { url: value });
    } else return Promise.reject();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isError, isLoading, isSuccess, data } = useMutation(
    handleSubmit,
    {
      onSuccess: () => {
        client.invalidateQueries("dashboard");
      },
      onError: (err) => {
        inputRef.current?.focus();
      },
    }
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
              setUserInput(e.target.value);
            } else setUserInput("");
          }}
          type={"text"}
          disabled={!isLogin}
          defaultValue={"https://"}
          onClick={() => mutate(userInput)}
          icon={SearchIcon}
          error={isError || !userInput}
          ref={inputRef}
        ></TextInput>
        <RowWrapper>
          {isSuccess && (
            <>
              <ValueWithTitle
                title={"결과"}
              >{`${clientBaseURL}/${data.data.short_code}`}</ValueWithTitle>
              <Button
                width="175px"
                onClick={() =>
                  handleCopyClipBoard(
                    `${clientBaseURL}/${data.data.short_code}`
                  )
                }
              >
                복사
              </Button>
            </>
          )}
          {isLoading && <LoadingSpinner />}
        </RowWrapper>
      </MobileWrapper>
    </>
  );
};

export default Main;
