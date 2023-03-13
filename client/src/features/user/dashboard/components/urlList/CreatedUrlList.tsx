import TextInput from "@/components/atom/form/TextInput";
import { getCreatedURLs } from "@/data/URL/server/shortUrl/createUrl";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { DashboardItemsType } from "@/types/user/dashBoard";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
import CreatedUrlCard from "../urlList/CreatedUrlCard";
import { ReactComponent as SearchIcon } from "@/assets/searchIcon.svg";
import Text from "@/components/atom/Text";
import styled from "@emotion/styled";

type Props = {
  setSelectedUrlId: Dispatch<SetStateAction<string>>;
};

const CreatedUrlList = ({ setSelectedUrlId }: Props) => {
  const [keyword, setKeyword] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { data } = useQuery<DashboardItemsType[]>(
    "dashboard",
    async () => {
      const { data } = await axiosPrivate.get(getCreatedURLs);
      return data;
    },
    {
      select: (data) => {
        if (keyword) {
          return data.filter((data) =>
            data.url.toLowerCase().includes(String(keyword).toLowerCase())
          );
        } else return data;
      },
    }
  );

  return (
    <>
      <TextInput
        icon={SearchIcon}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <CreatedURLWrapper>
        {data?.length ? (
          data.map((data, index) => {
            return (
              <CreatedUrlCard
                {...data}
                key={index}
                setSelectedUrlId={setSelectedUrlId}
              />
            );
          })
        ) : (
          <Text typography={"sub"} color={"var(--pure-white)"}>
            결과가 없습니다
          </Text>
        )}
      </CreatedURLWrapper>
    </>
  );
};

const CreatedURLWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 8px 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export default CreatedUrlList;
