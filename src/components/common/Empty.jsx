import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ErrorDiv = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const Empty = ({ text }) => {
    return (
        <ErrorDiv>
            <ErrorIcon icon={faMagnifyingGlass} />
            {text} 이(가) 없습니다.
        </ErrorDiv>
    );
};

export default Empty;
