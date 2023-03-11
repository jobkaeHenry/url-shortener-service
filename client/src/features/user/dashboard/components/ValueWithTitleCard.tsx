import Text from "@/components/atom/Text";
import styled from "@emotion/styled";

type Props = {
  label: string;
  value: number | string;
  description?: string;
  color?: string;
};

const ValueWithTitleCard = (props: Props) => {
  const { label, value, description, color } = props;
  return (
    <Wrapper color={color}>
      <span>{value}</span>
        <Text typography={"h4"} bold>
          {label}
        </Text>
        <Text typography={"sub"}> {description}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  background-color: ${(props) => (props.color ? props.color : "var(--main)")};

  & span {
    color: var(--pure-white);
  }
  & > span:first-child {
    font-size: 36px;
    font-weight: 800;
  }
`;
export default ValueWithTitleCard;
