import styled, { keyframes } from 'styled-components';

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
    width: 32px;
    height: 32px;
    animation: ${loadingAnimation} 1s linear infinite;
    margin: 0px auto;
`;

const Loading = () => {
    return <LoadingCircle />;
};

export default Loading;
