import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const List = styled.div`
    height: 29rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    z-index: 200;
    background-color: #f5f5f5;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ListItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    padding: 0.5rem;
    &:hover {
        background-color: #ffcbc14f;
    }
`;

const Img = styled.img`
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    width: 5rem;
    height: 5rem;
`;
const TextInfo = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 0.8rem;
`;

const Name = styled.div`
    width: 8rem;
    height: 1.2rem;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
`;

const Address = styled.div`
    width: 8rem;
    height: 1rem;
    overflow: hidden;
    white-space: wrap;
    font-size: 0.6rem;
    color: lightgray;
    text-overflow: ellipsis;
`;

const Icons = styled.div`
    display: flex;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    border-radius: 2rem;
    padding: 0.5rem;
    height: 1rem;
    width: 1rem;
    background-color: rgb(230, 230, 230);
    cursor: pointer;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.1);
    }
`;
const EditSpotList = ({ spots, onMoveMarker, onOpenDetail, onCreateLocation }) => {
    return (
        <List>
            {spots &&
                spots.list.map((s, i) => {
                    const { firstimage, firstimage2, title, addr1 } = s;
                    return (
                        <ListItem
                            key={i}
                            onClick={() => {
                                onMoveMarker(s);
                            }}
                        >
                            <Img
                                src={firstimage || firstimage2}
                                alt={title}
                                // onError={onChangeErrorImg}
                            />
                            <TextInfo>
                                <Name>{title}</Name>
                                <Address>{addr1.split(' ')[0]}</Address>
                            </TextInfo>
                            <Icons>
                                <StyledFontAwesomeIcon
                                    onClick={() => {
                                        onOpenDetail(s);
                                    }}
                                    icon={faExclamation}
                                />

                                <StyledFontAwesomeIcon
                                    onClick={() => {
                                        onCreateLocation(s);
                                    }}
                                    icon={faPlus}
                                />
                            </Icons>
                        </ListItem>
                    );
                })}
        </List>
    );
};

export default EditSpotList;
