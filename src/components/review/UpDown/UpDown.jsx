import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const UpDownBox = styled.div`
    display: flex;
    flex-direction: column;
    top: 115px;
    position: sticky;
`;

const UpDownButton = styled.button`
    display: inline-block;
    border-radius: 6px;
    padding: 0px;
    margin: 0px;
    width: 36px;
    height: 36px;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid ${(props) => props.theme.outlineColor};
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        cursor: pointer;
    }
`;

const Count = styled.div`
    display: inline-block;
    width: 36px;
    text-align: center;
`;

const UpDown = ({ onUpDownClick }) => {
    return (
        <UpDownBox>
            <UpDownButton onClick={onUpDownClick}>
                <FontAwesomeIcon icon={faChevronUp} size="1x" />
            </UpDownButton>
            <Count>0</Count>
            <UpDownButton onClick={onUpDownClick}>
                <FontAwesomeIcon icon={faChevronDown} size="1x" />
            </UpDownButton>
        </UpDownBox>
    );
};

export default UpDown;
