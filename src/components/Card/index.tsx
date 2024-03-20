import styled from 'styled-components/native';

const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 110px;
  background-color: ${({ theme }) => theme.card.color};
  border-radius: 20px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-color: ${({ theme }) => theme.shadowColor};
  shadow-offset: 0px 2px;
`;

export default Card;
