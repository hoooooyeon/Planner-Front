import styled, { css } from 'styled-components';
import tempImage from '../../images/temp.jpg';
import { useState } from 'react';

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

// {
//     plannerId: 1,
//     accountId: 1,
//     creator: 'test',
//     title: '수정테스트',
//     planDateStart: '2023-01-29',
//     planDateEnd: '2023-01-31',
//     expense: 100000,
//     memberCount: 3,
//     memberTypeId: 3,
//     likeCount: 0,
//     createDate: '2023-03-05 17:36:59',
//     updateDate: '2023-03-15 23:37:46',
// }
const PlannerList = ({ plannerList, onItemClick }) => {
    const [selectItem, setSelectItem] = useState(null);

    const onPlannerItemClick = (index, plannerId) => {
        setSelectItem(index);
        onItemClick(plannerId);
    };

    return (
        <ItemList>
            {plannerList.map((item, index) => (
                <Item
                    select={index == selectItem}
                    key={index}
                    onClick={() => {
                        onPlannerItemClick(index, item.plannerId);
                    }}
                >
                    <ItemImg src={tempImage} />
                    <ItemName>{item.title}</ItemName>
                </Item>
            ))}
        </ItemList>
    );
};

export default PlannerList;
