/** @jsxImportSource @emotion/react */
import Text from "@/components/atom/Text";
import TextInput from "@/components/atom/TextInput";
import { getCreatedURLs } from "@/data/URL/server/newUrl/createUrl";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { ColumnWrapper, RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/searchIcon.svg";
import { Button } from "@/components/atom/Button";
import CreatedUrlCard from "@/features/user/dashboard/components/CreatedUrlCard";
import useLogout from "@/hooks/user/useLogout";

type Props = {};

const Dashboard = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState<DashboardItemsType[]>([]);
  const [keyword, setKeyword] = useState("");
  const [filteredData, setFilteredData] = useState<DashboardItemsType[]>([]);

  useEffect(() => {
    if (keyword) {
      setFilteredData(
        data.filter((data) =>
          data.url.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else setFilteredData(data);
  }, [keyword]);

  useEffect(() => {
    axiosPrivate.get(getCreatedURLs).then((res) => {
      setData(res.data);
      setFilteredData(res.data);
    });
  }, []);

  return (
    <Wrapper>
      <LeftWrapper>
        <TextInput
          icon={SearchIcon}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <CreatedURLWrapper>
          {filteredData.map((data, index) => {
            return <CreatedUrlCard {...data} key={index} />;
          })}
        </CreatedURLWrapper>
      </LeftWrapper>

      <Button className="ghost" as={"div"}>
        <ColumnWrapper className="center">
          <Text typography="h2">{data.length}</Text>
          <Text typography="sub">지금 까지 줄인 URL</Text>
        </ColumnWrapper>
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  margin: 0 auto;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const LeftWrapper = styled.div`
  padding: 16px;
  width: 320px;
  background-color: var(--main);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CreatedURLWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 8px 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
`;

export default Dashboard;
