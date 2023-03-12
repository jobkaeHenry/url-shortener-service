/** @jsxImportSource @emotion/react */
import { getCreatedURLs } from "@/data/URL/server/newUrl/createUrl";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import styled from "@emotion/styled";
import { Suspense, useEffect, useState } from "react";
import ValueWithTitleCard from "@/features/user/dashboard/components/analitics/ValueWithTitleCard";
import { useQuery } from "react-query";
import { LoadingSpinner } from "@/components/atom/lodaing/Spinner";
import CreatedUrlList from "@/features/user/dashboard/components/urlList/CreatedUrlList";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/atom/lodaing/Error";
import GeneralAnalitics from "@/features/user/dashboard/components/analitics/GeneralAnalitics";

type Props = {};

const Dashboard = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();
  const [filteredData, setFilteredData] = useState<DashboardItemsType[]>([]);
  const [data, setData] = useState<DashboardItemsType[]>([]);

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
        <ErrorBoundary
          fallback={<ErrorMessage message={"에러가 발생했습니다"} />}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <CreatedUrlList />
          </Suspense>
        </ErrorBoundary>
      </ListWrapper>

      {/* 우 */}
      <AnaliticsWrapper>
        <ErrorBoundary
          fallback={<ErrorMessage message={"에러가 발생했습니다"} />}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <GeneralAnalitics />
          </Suspense>
        </ErrorBoundary>
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

export default Dashboard;
