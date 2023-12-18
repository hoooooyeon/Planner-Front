import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { default as styled } from 'styled-components';

export const SelectBox = styled.div`
    position: relative;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 6px;
    user-select: none;
    margin: 0px 5px;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    font-size: 0.8rem;
`;

export const SelectMain = styled.div`
    width: 122px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    @media all and (max-width: 270px) {
        width: 40px;
    }
`;

const SelectOption = styled.div`
    position: absolute;
    width: 100%;
    max-height: 10rem;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    //padding: 5px;
    margin-top: 5px;
    border-radius: 6px;
    animation: fadein 0.3s;
    z-index: 3;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    overflow: auto;
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
    //width: 70px;
    height: 20px;
    margin: 5px 10px;
    border-radius: 6px;
    text-align: center;
    line-height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 3px;
    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)``;

const Text = styled.div`
    width: 6.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Select = ({ className, value, options, onChange }) => {
    const [selecting, setSelecting] = useState(false);

    const onClick = () => {
        if (!selecting) {
            setSelecting(true);
        } else {
            setSelecting(false);
        }
    };

    const onSelect = (option) => {
        setSelecting(false);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <SelectBox className={className}>
            <SelectMain onClick={onClick}>
                <Text>{value && value.code ? value.name : '선택'}</Text>
                <StyledFontAwesomeIcon icon={faAngleDown} />
            </SelectMain>
            {selecting && (
                <SelectOption>
                    {options &&
                        options.map((v, i) => (
                            <SelectOptionItem key={i} onClick={() => onSelect(v)}>
                                {v.name}
                            </SelectOptionItem>
                        ))}
                </SelectOption>
            )}
        </SelectBox>
    );
};

export default Select;
