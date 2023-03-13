import ErrorMessage from "@/components/atom/lodaing/Error";
import { RowWrapper } from "@/layouts/Wrapper";
import styled from "@emotion/styled";

import { ErrorBoundary } from "react-error-boundary";
import ValueWithTitleCard from "./ValueWithTitleCard";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Title, Tooltip);

type Props = { id: string };

const DetailedAnalytics = (props: Props) => {
  const labels = ["예시1", "예시2", "예시3", "예시4", "예시5"];
  const options = {
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
  const data = {
    labels,
    datasets: [
      {
        data: [1, 2, 3, 4, 5],
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
  return (
    <Warpper>
      <ErrorBoundary fallback={<ErrorMessage message={"에러"} />}>
        <ChartWrarpper>
          <Pie data={data} options={options} />
          <Pie data={data} options={options} />
        </ChartWrarpper>
      </ErrorBoundary>
      <RowWrapper>
        <ValueWithTitleCard value={1} label={"브라우저"} />
        <ValueWithTitleCard value={1} label={"언어"} />
        <ValueWithTitleCard value={1} label={"일시"} />
      </RowWrapper>
    </Warpper>
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
  width: 100%;
  height: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--line-gray);
`;

export default DetailedAnalytics;
