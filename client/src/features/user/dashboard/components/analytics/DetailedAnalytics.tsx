import ErrorMessage from "@/components/atom/lodaing/Error";
import { RowWrapper } from "@/layouts/Wrapper";
import styled from "@emotion/styled";

import { ErrorBoundary } from "react-error-boundary";
import ValueWithTitleCard from "./ValueWithTitleCard";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useQuery } from "react-query";
import { DetailedAnaliticsType } from "@/types/user/dashBoard";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { getDetailedAnalytics } from "@/data/URL/server/shortUrl/analytics";
ChartJS.register(ArcElement, Title, Tooltip);

type Props = { id: string };

const DetailedAnalytics = ({ id }: Props) => {
  const axiosPrivate = useAxiosPrivate();

  const { data } = useQuery<DetailedAnaliticsType>(
    ["analytics", id],
    async () => {
      if (id) {
        const { data } = await axiosPrivate.get(
          `${getDetailedAnalytics}/${id}`
        );
        return data;
      }
    },
    {
      select: (data) => {
        const sortedBrowser = data.browserInfo.sort(
          (a, b) => b.count - a.count
        );
        const sortedlanguage = data.language.sort((a, b) => b.count - a.count);
        return { browserInfo: sortedBrowser, language: sortedlanguage };
      },
      suspense: true,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const browserOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "사용된 브라우저",
      },
    },
  };
  const languageOption = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "사용된 언어",
      },
    },
  };
  const browserData = {
    labels: data?.browserInfo.map((e) => e?.name),
    datasets: [
      {
        data: data?.browserInfo.map((e) => e?.count),
        backgroundColor: [
          "rgb(131, 150, 177)",
          "rgb(113, 139, 179)",
          "rgb(85, 118, 168)",
          "rgb(60, 104, 170)",
          "rgb(33, 80, 150)",
        ],
      },
    ],
  };
  const languageInfo = {
    labels: data?.language.map((e) => e?.name),
    datasets: [
      {
        data: data?.language.map((e) => e?.count),
        backgroundColor: [
          "rgb(131, 150, 177)",
          "rgb(113, 139, 179)",
          "rgb(85, 118, 168)",
          "rgb(60, 104, 170)",
          "rgb(33, 80, 150)",
        ],
      },
    ],
  };

  return data?.browserInfo.length !== 0 ? (
    <Warpper>
      <ErrorBoundary fallback={<ErrorMessage message={"에러"} />}>
        <ChartWrarpper>
          <Pie data={browserData} options={browserOptions} />
          <Pie data={languageInfo} options={languageOption} />
        </ChartWrarpper>
      </ErrorBoundary>
      <RowWrapper>
        <ValueWithTitleCard
          value={data?.browserInfo[0]?.name}
          description={"가장 많이 사용된 브라우저"}
        />
        <ValueWithTitleCard
          value={data?.language[0]?.name}
          description={"가장 많이 사용된 언어"}
        />
      </RowWrapper>
    </Warpper>
  ) : (
    <>방문자가 없습니다</>
  );
};
const ChartWrarpper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  @media (max-width: 1024px) {
    height: 20vh;
  }
`;

const Warpper = styled.div`
  padding: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--line-gray);
`;

export default DetailedAnalytics;
