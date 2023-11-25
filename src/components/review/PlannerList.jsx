import styled, { css } from 'styled-components';
import tempImage from '../../images/temp.jpg';
import { useState } from 'react';
import Loading from '../common/Loading';

const ItemContainer = styled.div`
    max-width: 37.5rem;
    height: 23.75rem;
    overflow-y: auto;
`;

const ItemList = styled.ul`
    padding: 0rem;
    margin: 0.625rem 0rem;
    margin: 0px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.li`
    margin: 0.625rem;
    padding: 0.3125rem;
    width: calc((33.33% - 1.25rem));
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 8px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};

    ${(props) =>
        props.select &&
        css`
            background-color: #f2f2f2;
        `}

    &:hover {
        background-color: #f2f2f2;
        transition: all 0.2s;
    }

    @media screen and (max-width: 1440px) {
        width: calc((33.33% - 1.25rem));
    }

    @media screen and (max-width: 1024px) {
        width: calc(33.33% - 1.25rem);
    }

    @media screen and (max-width: 768px) {
        width: calc(33.33% - 1.25rem);
    }

    @media screen and (max-width: 480px) {
        width: calc(50% - 1.25rem);
    }
`;

const ItemImg = styled.img`
    max-width: 100%;
    background-color: silver;
    border-radius: 6px;
`;

const ItemName = styled.div`
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: black;
    text-align: center;
    margin-top: 0.3125rem;
`;

const ItemDate = styled.div`
    font-size: 0.5625rem;
    text-align: right;
    margin: 0.3125rem;
`;

const EmptyItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PlannerList = ({ loading, type, plannerList, onItemClick }) => {
    const [selectItem, setSelectItem] = useState(null);

    const { list } = plannerList;

    const handlePlannerItemClick = (index, item) => {
        setSelectItem(index);
        onItemClick(item);
    };

    if (loading && !list) {
        return (
            <ItemContainer>
                <Loading pos={true} />{' '}
            </ItemContainer>
        );
    }

    return (
        <ItemContainer>
            <ItemList>
                {list ? (
                    list.map((item, index) => (
                        <Item
                            key={index}
                            select={index == selectItem}
                            onClick={() => {
                                handlePlannerItemClick(index, item);
                            }}
                        >
                            <ItemImg src={tempImage} />
                            <ItemName>{item.title}</ItemName>
                            <ItemDate>
                                {item.planDateStart} ~ {item.planDateEnd}
                            </ItemDate>
                        </Item>
                    ))
                ) : (
                    <EmptyItem>
                        <b>플래너가 없습니다.</b>
                    </EmptyItem>
                )}
            </ItemList>
        </ItemContainer>
    );
};

export default PlannerList;
