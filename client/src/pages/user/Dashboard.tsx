/** @jsxImportSource @emotion/react */
import TextInput from "@/components/atom/TextInput";
import { getCreatedURLs } from "@/data/URL/server/newUrl/createUrl";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/searchIcon.svg";
import CreatedUrlCard from "@/features/user/dashboard/components/CreatedUrlCard";
import ValueWithTitleCard from "@/features/user/dashboard/components/ValueWithTitleCard";

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
      {/* 좌 */}
      <ListWrapper>
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
      </ListWrapper>

      {/* 우 */}
      <AnaliticsWrapper>
        <RowWrapper>
          <ValueWithTitleCard
            label={"Created Urls"}
            value={data.length}
            description={"현재까지 생성한 URL의 갯수입니다"}
          />
          <ValueWithTitleCard
            label={"Total Visits"}
            value={data.reduce((acc, cur) => acc + cur?.visitCounts, 0)}
            color={"var(--font-main)"}
            description={"링크를 통해 방문한 총 방문자 수 입니다"}
          />
        </RowWrapper>
      </AnaliticsWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 76px);
  position: fixed;
  top: 76px;
  display: flex;
  flex-direction: row;
  gap: 16px;

  @media (max-width: 1024px) {
    flex-wrap: wrap-reverse;
  }
`;

const ListWrapper = styled.div`
  padding: 16px;
  width: 480px;
  background-color: var(--main);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 1024px) {
    width: 100%;
    height: 280px;
  }
`;
const AnaliticsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 1024px) {
    padding: 16px;
  }
`;

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

export default Dashboard;
