import styled, { css } from 'styled-components';

const StyledButton = styled.button`
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    outline: none;
    width: 8rem;
    height: 2rem;
    ${(props) =>
        (props.big &&
            css`
                height: 3rem;
                font-size: 1rem;
                font-weight: bold;
            `) ||
        (props.middle &&
            css`
                height: 2.25rem;
                font-size: 12px;
                font-weight: bold;
            `)}
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
