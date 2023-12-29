import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../common/Loading';
import { replaceImageOnError } from '../../../lib/utils/imageReplace';

const Container = styled.div`
    max-height: 48rem;
    overflow-y: auto;
`;

const ListBlock = styled.ul`
    margin: 0rem;
    padding: 0rem;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;
`;

const ListItem = styled.li`
    border: 1px solid silver;
    border-radius: 6px;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-sizing: border-box;
    margin: 0.625rem;
    width: calc(25% - 1.25rem);

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }

    @media screen and (max-width: 1440px) {
        width: calc(25% - 1.25rem);
    }

    @media screen and (max-width: 1024px) {
        width: calc(33.33% - 1.25rem);
    }

    @media screen and (max-width: 768px) {
        width: calc(50% - 1.25rem);
    }

    @media screen and (max-width: 480px) {
        width: calc(100% - 1.25rem);
    }
`;

const ListItemImgBox = styled.div`
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: block;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 75%;
    width: 100%;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    margin: 0;
    display: block;
    -webkit-user-drag: none;
    object-fit: cover;
    font-size: 0.7rem;
    color: ${(props) => props.theme.tertiaryColor};
`;

const ListItemInfoBox = styled.div`
    padding: 0.625rem;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    b {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        /* margin: 0.625rem; */
    }

    span {
        display: block;
        text-align: right;
        margin-right: 0.3125rem;
    }

    b + span + span {
        font-size: 12px;
    }
`;

const ItemEmptyBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    font-size: 20px;

    div {
        margin: 1.25rem;
    }
`;

const EmptyItem = () => {
    return (
        <ItemEmptyBlock>
            <FontAwesomeIcon icon={faExclamation} size="2xl" />
            <div>아무것도 없네요...</div>
        </ItemEmptyBlock>
    );
};

export const LikeList = (props) => {
    const { loading, list, selectIndex, onLikePlannerClick, onLikeSpotClick } = props;

    const handleItemClick = (item) => {
        if (selectIndex == 1) {
            const { plannerId } = item;
            onLikePlannerClick(plannerId);
        } else {
            onLikeSpotClick(item);
        }
    };

    if (loading && !list) {
        return (
            <ListBlock>
                <Loading />
            </ListBlock>
        );
    }

    return (
        <Container>
            <ListBlock>
                {list ? (
                    list.length == 0 ? (
                        <EmptyItem />
                    ) : (
                        list.map((item, i) => (
                            <ListItem key={i} onClick={() => handleItemClick(item)}>
                                <ListItemImgBox>
                                    <Img
                                        alt={item.title}
                                        src={item.image || item.image == '' ? item.image : item.thumbnail}
                                        onError={(e) => replaceImageOnError(e, selectIndex == 1 ? 'planner' : 'spot')}
                                    />
                                </ListItemImgBox>
                                <ListItemInfoBox>
                                    <b>{item.title}</b>
                                    {selectIndex == 1 && (
                                        <>
                                            <span>{item.memberCount}명</span>
                                            <span>
                                                {item.planDateStart} ~ {item.planDateEnd}
                                            </span>
                                        </>
                                    )}
                                </ListItemInfoBox>
                            </ListItem>
                        ))
                    )
                ) : (
                    <EmptyItem />
                )}
            </ListBlock>
        </Container>
    );
};
