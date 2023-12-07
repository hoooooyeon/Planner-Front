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
    margin: 0.625rem auto;
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
        props.size === 'smaller' &&
        css`
            width: 0.5rem;
            height: 0.5rem;
        `}
`;

const CenterDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loading = ({ size, pos }) => {
    if (pos) {
        return (
            <CenterDiv>
                <LoadingCircle size={size} />
            </CenterDiv>
        );
    }

    return <LoadingCircle size={size} />;
};

Loading.defaultProps = {
    size: 'normal',
};

export default Loading;
