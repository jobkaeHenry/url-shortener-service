import Text from "@/components/atom/Text";
import ValueWithTitle from "@/components/atom/ValueWithTitle";
import { clientBaseURL } from "@/data/URL/local/clientBaseURL";
import { RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import styled from "@emotion/styled";
import dayjs from "dayjs";

const CreatedUrlCard = (props: DashboardItemsType) => {
  return (
    <DataWrapper>
      <RowWrapper>
        <ValueWithTitle title={"총 방문수"}>
          {String(props.visitCounts)}
        </ValueWithTitle>
      </RowWrapper>

      <div title={props.url}>
        <span className="text-overflow-hidden bold">{props.url}</span>
        <Text typography={"sub"}>{`${clientBaseURL}/${props.short_code}`}</Text>
      </div>

      <Text typography="sub">
        {dayjs(props.created_at).format("YYYY/MM/DD")}
      </Text>
    </DataWrapper>
  );
};

const DataWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--pure-white);
  border-radius: 16px;
  gap: 16px;
`;

export default CreatedUrlCard;
