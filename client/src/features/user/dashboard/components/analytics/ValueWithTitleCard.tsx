
import Text from "@/components/atom/Text";
import styled from "@emotion/styled";

type Props = {
  label?: string;
  value?: number | string;
  description?: string;
  color?: string;
};

const ValueWithTitleCard = (props: Props) => {
  const { label, value, description, color } = props;
  return (
    <Wrapper color={color}>
      <Title>{value ? value : 0}</Title>
      {label && (
        <Text typography={"h4"} bold>
          {label}
        </Text>
      )}
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
  border: 1px solid;
  border-color: ${(props) => (props.color ? props.color : "var(--line-gray)")};
`;
const Title = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: var(--main);
  @media screen and (max-width: 425px) {
    font-size: 18px;
  }
`;
export default ValueWithTitleCard;
