import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  height: 200px;
  box-shadow: -3px 1px 13px -2px rgba(0, 0, 0, 0.73); /*https://www.cssmatic.com/box-shadow*/
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin: 20px;
  transition: all 0.3s ease; /*mais suave na transição do opacity*/

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const TopCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const BottonCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  strong {
    color: #ee6b26;
    font-weight: bold;
  }

  span {
    color: #707070;
  }
`;
