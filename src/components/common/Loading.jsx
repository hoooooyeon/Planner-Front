import styled, { css, keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    form {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoadingCircle = styled.div`
    border-radius: 50%;
    border: 8px solid ${(props) => props.theme.outlineColor};
    border-top: 8px solid ${(props) => props.theme.mainColor};
    animation: ${loadingAnimation} 1s linear infinite;
    margin: 0px auto;
    ${(props) =>
        props.size === 'normal' &&
        css`
            width: 2rem;
            height: 2rem;
        `}
    ${(props) =>
        props.size === 'small' &&
        css`
            width: 1rem;
            height: 1rem;
        `}
        ${(props) =>
        props.pos === 'center' &&
        css`
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        `}
`;

const Loading = ({ size, pos }) => {
    return <LoadingCircle size={size} pos={pos} />;
};

Loading.defaultProps = {
    size: 'normal',
};

export default Loading;
