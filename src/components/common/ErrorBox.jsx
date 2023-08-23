import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ErrorDiv = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const ErrorBox = ({ isLoading, text }) => {
    return (
        <>
            {isLoading ? (
                <ErrorDiv>
                    <ErrorIcon icon={faSpinner} />
                    로딩중 입니다.
                </ErrorDiv>
            ) : (
                <ErrorDiv>
                    <ErrorIcon icon={faMagnifyingGlass} />
                    {text} 이(가) 없습니다.
                </ErrorDiv>
            )}
        </>
    );
};

export default ErrorBox;
