import styled from "@emotion/styled";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/atom/lodaing/Spinner";
import CreatedUrlList from "@/features/user/dashboard/components/urlList/CreatedUrlList";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "@/components/atom/lodaing/Error";
import GeneralAnalitics from "@/features/user/dashboard/components/analitics/GeneralAnalitics";
import DetailedAnalitics from "@/features/user/dashboard/components/analitics/DetailedAnalitics";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <Wrapper>
      {/* url 리스트 */}
      <ListWrapper>
        <ErrorBoundary
          fallback={<ErrorMessage message={"에러가 발생했습니다"} />}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <CreatedUrlList />
          </Suspense>
        </ErrorBoundary>
      </ListWrapper>

      {/* 통계데이터 */}
      <AnaliticsWrapper>
        <ErrorBoundary
          fallback={<ErrorMessage message={"에러가 발생했습니다"} />}
        >
          <Suspense fallback={<LoadingSpinner />}>
            <GeneralAnalitics />
          </Suspense>
        </ErrorBoundary>
        <DetailedAnalitics id={"as"} />
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
  position: relative;
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
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 16px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 1024px) {
    padding: 16px;
    height: calc(100% - 280px);
  }
`;

export default Dashboard;
