import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { default as styled } from 'styled-components';

const SelectBox = styled.div`
    position: relative;
    background-color: white;
    border-radius: 6px;
    user-select: none;
    margin: 0px 5px;

    &:hover {
        background-color: silver;
    }
`;

const SelectMain = styled.div`
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    svg {
        margin: 0px 10px;
    }
`;

const SelectOption = styled.div`
    position: absolute;
    background-color: white;
    padding: 5px;
    margin-top: 5px;
    border-radius: 6px;
    animation: fadein 0.3s;

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const SelectOptionItem = styled.div`
    background-color: white;
    width: 70px;
    height: 20px;
    margin: 5px 0px;
    border-radius: 6px;
    text-align: center;
    line-height: 20px;

    &:hover {
        background-color: silver;
    }
`;

const Select = ({ value, onChange }) => {
    const [selecting, setSelecting] = useState(false);

    const onClick = () => {
        if (!selecting) {
            setSelecting(true);
        } else {
            setSelecting(false);
        }
    };

    const onSelect = (e) => {
        setSelecting(false);
        if (onChange) {
            onChange(e.target.innerText);
        }
    };

    return (
        <SelectBox>
            <SelectMain onClick={onClick}>
                {value ? value : '선택'}
                <FontAwesomeIcon icon={faAngleDown} />
            </SelectMain>
            {selecting && (
                <SelectOption onClick={onSelect}>
                    <SelectOptionItem>항목1</SelectOptionItem>
                    <SelectOptionItem>항목2</SelectOptionItem>
                    <SelectOptionItem>항목3</SelectOptionItem>
                </SelectOption>
            )}
        </SelectBox>
    );
};

export default Select;
