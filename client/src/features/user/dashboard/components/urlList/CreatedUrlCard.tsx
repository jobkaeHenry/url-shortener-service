import Text from "@/components/atom/Text";
import ValueWithTitle from "@/components/atom/ValueWithTitle";
import { clientBaseURL } from "@/data/URL/local/clientBaseURL";
import { RowWrapper } from "@/layouts/Wrapper";
import { DashboardItemsType } from "@/types/user/dashBoard";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { ReactComponent as DeleteIcon } from "@/assets/deleteIcon.svg";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { deleteUrl } from "@/data/URL/server/shortUrl/createUrl";
import { client } from "@/index";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSelectedUrlId: Dispatch<SetStateAction<string>>;
} & DashboardItemsType;

const CreatedUrlCard = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();

  const deleteHandler = (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axiosPrivate
        .delete(`${deleteUrl}/${id}`)
        .then((res) => {
          client.invalidateQueries("dashboard");
          window.alert("삭제가 완료됬습니다.");
        })
        .catch((err) => {
          alert("삭제에 실패했습니다");
        });
    }
  };

  return (
    <DataWrapper onClick={()=>props.setSelectedUrlId(props.id)}>
      <RowWrapper>
        <ValueWithTitle title={"총 방문수"}>
          {String(props.visitCounts)}
        </ValueWithTitle>
        <DeleteIcon
          cursor={"pointer"}
          onClick={() => deleteHandler(props.id)}
        />
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
  cursor: pointer;
`;

export default CreatedUrlCard;
