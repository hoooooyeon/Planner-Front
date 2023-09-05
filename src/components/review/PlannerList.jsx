import styled, { css } from 'styled-components';
import tempImage from '../../images/temp.jpg';
import { useState } from 'react';
import Loading from '../common/Loading';

const ItemList = styled.ul`
    width: 720px;
    padding: 0px;
    margin: 10px 0px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.li`
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 10px;
    ${(props) =>
        props.select &&
        css`
            background-color: #f2f2f2;
        `}
    //background-color: #f2f2f2;

    &:hover {
        //border: 2px solid skyblue;
        background-color: #f2f2f2;
        transition: all 0.2s;
    }
`;

const ItemImg = styled.img`
    width: 140px;
    height: 120px;
    background-color: silver;
    border-radius: 6px;
    margin: 10px 10px;
`;

const ItemName = styled.b`
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 140px;
    font-size: 12px;
    color: black;
    text-align: center;
    margin-bottom: 10px;
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

    if (loading) {
        return <Loading />;
    }

    return (
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
                    </Item>
                ))
            ) : (
                <EmptyItem>
                    <b>플래너가 없습니다.</b>
                </EmptyItem>
            )}
        </ItemList>
    );
};

export default PlannerList;
