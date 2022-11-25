import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Select from '../common/Select';
import { useState } from 'react';

const ReviewButton = styled.button`
    background-color: transparent;
    border: none;
    &:hover {
        background-color: silver;
        border-radius: 6px;
    }
    svg {
        margin: 0px 5px;
    }
`;

const ReviewBlock = styled.div`
    margin-top: 100px;
    position: relative;
    padding: 0px 50px;
`;

const ReviewBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: #f3f3f3;
`;

const ReviewSearchBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px auto;
    margin-top: 20px;
    height: 50px;
    border-radius: 6px;
    background-color: #e6e6e6;
`;

const ItemBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin: 0px 10px;
`;

const SearchInputText = styled.input`
    width: 260px;
    padding: 10px;
    background-color: white;
    outline: none;
    border: none;
    border-radius: 6px 0px 0px 6px;
`;

const SearchIcon = styled.div`
    background-color: skyblue;
    color: white;
    padding: 6px 8px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 0px 6px 6px 0px;

    &:hover {
        background-color: #7ec1dc;
    }
`;

const ReviewListBox = styled.ul`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
    padding: 0px;
    margin: 20px 20px;
`;
const ReviewItemTitle = styled.div`
    display: none;
    background-color: #00000062;
    height: 100%;
`;

const ReviewItem = styled.li`
    background-color: skyblue;
    height: 200px;
    width: 180px;
    margin: 10px 10px;

    &:hover {
        ${ReviewItemTitle} {
            display: block;
        }
    }
`;

const ReivewPageBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    height: 50px;
    margin: 10px 0px;
`;

const PageButton = styled(ReviewButton)`
    height: 30px;
    /* line-height: 20px; */
    padding: 5px 10px;
`;

const PageIndex = styled.a`
    padding: 10px;
    margin: 0px 5px;
    text-align: center;
    vertical-align: middle;

    &:hover {
        background-color: silver;
        border-radius: 6px;
    }
`;

const Review = () => {
    const [selectAreaCode, setSelectAreaCode] = useState('');

    const onChange = (value) => {
        setSelectAreaCode(value);
    };

    return (
        <ReviewBlock>
            <ReviewBox>
                <ReviewSearchBox>
                    <ItemBox>
                        <div>여행지</div>
                        <Select value={selectAreaCode} onChange={onChange} />
                    </ItemBox>
                    <ItemBox>
                        <SearchInputText type="text"></SearchInputText>
                        <SearchIcon>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                        </SearchIcon>
                    </ItemBox>
                </ReviewSearchBox>
                <ReviewListBox>
                    <ReviewItem>
                        <ReviewItemTitle>제목</ReviewItemTitle>
                    </ReviewItem>
                    <ReviewItem>
                        <ReviewItemTitle>제목</ReviewItemTitle>
                    </ReviewItem>
                    <ReviewItem>
                        <ReviewItemTitle>제목</ReviewItemTitle>
                    </ReviewItem>
                    <ReviewItem>
                        <ReviewItemTitle>제목</ReviewItemTitle>
                    </ReviewItem>
                    <ReviewItem>
                        <ReviewItemTitle>제목</ReviewItemTitle>
                    </ReviewItem>
                    <ReviewItem>
                        <ReviewItemTitle>제목</ReviewItemTitle>
                    </ReviewItem>
                </ReviewListBox>
                <ReivewPageBox>
                    <PageButton>
                        <FontAwesomeIcon icon={faAngleLeft} />
                        뒤로
                    </PageButton>
                    <PageIndex>1</PageIndex>
                    <PageIndex>2</PageIndex>
                    <PageIndex>3</PageIndex>
                    <PageButton>
                        앞으로
                        <FontAwesomeIcon icon={faAngleRight} />
                    </PageButton>
                </ReivewPageBox>
            </ReviewBox>
        </ReviewBlock>
    );
};

export default Review;
