import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: navy;
  color: white;
  ${(props) =>
    props.big
      ? css`
          width: 5rem;
          height: 3rem;
        `
      : css`
          width: 3rem;
          height: 1.5rem;
        `}
`;

const Button = (props) => {
  return <StyledButton>{props.children}</StyledButton>;
};

export default Button;
