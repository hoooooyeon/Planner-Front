import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${palette.blue[1]};

  color: white;
  outline: none;
  width: 3.5rem;
  height: 1.5rem;
  ${(props) =>
    props.big &&
    css`
      width: 6rem;
      height: 3rem;
      font-size: 1rem;
      font-weight: bold;
    `}
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
