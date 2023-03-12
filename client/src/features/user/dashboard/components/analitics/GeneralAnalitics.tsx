import { RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import React from "react";
import { useQuery } from "react-query";
import ValueWithTitleCard from "./ValueWithTitleCard";

type Props = {};

const GeneralAnalitics = (props: Props) => {
  const { data } = useQuery<DashboardItemsType[]>("dashboard");
  return (
    <RowWrapper>
      <ValueWithTitleCard
        label={"Created Urls"}
        value={data && data.length}
        description={"현재까지 생성한 URL의 갯수입니다"}
      />
      <ValueWithTitleCard
        label={"Total Visits"}
        value={data && data.reduce((acc, cur) => acc + cur?.visitCounts, 0)}
        color={"var(--font-main)"}
        description={"링크를 통해 방문한 총 방문자 수 입니다"}
      />
    </RowWrapper>
  );
};

export default GeneralAnalitics;
