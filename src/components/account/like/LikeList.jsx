import styled from 'styled-components';
import tempImage from '../../../images/temp.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../common/Loading';

const ListBlock = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: start;
    /* min-height: 443px; */
    height: 100%;
`;

const ListItem = styled.div`
    border: 1px solid silver;
    border-radius: 6px;
    color: var(--md-sys-color-on-surface-variant);
    background-color: var(--md-sys-color-surface-variant);
    box-sizing: border-box;
    margin: 10px 1.25rem;
    width: calc(20% - 1.25rem);

    &:hover {
        box-shadow: 0px 3px 6px var(--md-sys-color-shadow);
    }

    @media screen and (max-width: 1200px) {
        width: calc(25% - 2.5rem);
    }

    @media screen and (max-width: 1130px) {
        width: calc(33.33% - 2.5rem);
    }

    @media screen and (max-width: 920px) {
        width: calc(50% - 2.5rem);
    }

    @media screen and (max-width: 768px) {
        width: calc(50% - 2.5rem);
    }

    @media screen and (max-width: 425px) {
        width: calc(100% - 2.5rem);
    }
`;

const ListItemImgBox = styled.img`
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: block;
    background-size: cover;
    width: 100%;
    height: 140px;
`;

const ListItemInfoBox = styled.div`
    height: 60px;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    b {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: 5px;
    }

    span {
        display: block;
        text-align: right;
        margin-right: 5px;
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
        margin-top: 20px;
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
    const { loading, list } = props;

    if (loading && !list) {
        return (
            <ListBlock>
                <Loading />
            </ListBlock>
        );
    }

    return (
        <ListBlock>
            {list ? (
                list.length == 0 ? (
                    <EmptyItem />
                ) : (
                    list.map((item, i) => (
                        <ListItem key={i}>
                            <ListItemImgBox src={item.thumbnail || tempImage} />
                            <ListItemInfoBox>
                                <b>{item.title}</b>
                                <span>{item.memberCount}명</span>
                                <span>
                                    {item.planDateStart} ~ {item.planDateEnd}
                                </span>
                            </ListItemInfoBox>
                        </ListItem>
                    ))
                )
            ) : (
                <EmptyItem />
            )}
        </ListBlock>
    );
};
