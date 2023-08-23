import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    outline: none;
    width: 3.5rem;
    height: 1.5rem;
    ${(props) =>
        (props.big &&
            css`
                width: 6rem;
                height: 3rem;
                font-size: 1rem;
                font-weight: bold;
            `) ||
        (props.middle &&
            css`
                width: 6rem;
                height: 2.25rem;
                font-size: 12px;
                font-weight: bold;
            `)}
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
