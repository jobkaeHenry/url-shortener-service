/** @jsxImportSource @emotion/react */
import Text from "@/components/atom/Text";
import TextInput from "@/components/atom/TextInput";
import { getCreatedURLs } from "@/data/URL/server/newUrl/createUrl";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import MobileWrapper from "@/layouts/MobileWrapper";
import { ColumnWrapper, RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/searchIcon.svg";
import { Button } from "@/components/atom/Button";
import CreatedUrlCard from "@/features/user/dashboard/components/CreatedUrlCard";

type Props = {};

const Dashboard = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<DashboardItemsType[]>([]);
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState<DashboardItemsType[]>([]);

  useEffect(() => {
    if (keyword) {
      setFilteredData(data.filter((data) => data.url.includes(keyword)));
    } else setFilteredData(data);
  }, [keyword]);

  useEffect(() => {
    axiosPrivate.get(getCreatedURLs).then((res) => {
      console.log(res.data);
      setData(res.data);
      setFilteredData(res.data);
    });
    return () => {};
  }, []);

  return (
    <>
      <Wrapper>
        <LeftWrapper>
          <RowWrapper>
            <Button className="ghost" as={"div"}>
              <Text typography="p">지금 까지 줄인 URL</Text>
              <Text typography="h2">{data.length}</Text>
            </Button>
          </RowWrapper>
          <Button className="ghost">로그아웃</Button>
        </LeftWrapper>

        <RightWrapper>
          <SearchBarWrapper>
            <TextInput
              icon={SearchIcon}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </SearchBarWrapper>
          {filteredData.map((data, index) => {
            return <CreatedUrlCard {...data} key={index} />;
          })}
        </RightWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  position: static;
  max-width: 768px;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const LeftWrapper = styled.div`
  padding: 16px;
  width: 30%;
  background-color: var(--main);
  height: 100vh;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RightWrapper = styled.div`
  width: 70%;
  position: fixed;
  height: calc(100vh - 76px);
  overflow-y: scroll;
  right: 0;
`;

const SearchBarWrapper = styled.div`
  position: sticky;
  top: 2px;
  padding: 8px 16px;
  background-color: var(--pure-white);
  border-bottom: 1px solid var(--line-gray);
`;

export default Dashboard;
