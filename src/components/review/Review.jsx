import styled from 'styled-components';

const ReviewBlock = styled.div`
    margin-top: 100px;
    position: relative;
    padding: 0px 50px;
`;

const ReviewBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background-color: #f3f3f3;
`;

const ReviewSearchBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px auto;
    margin-top: 20px;
    height: 50px;
    border-radius: 4px;
    background-color: #e6e6e6;
`;

const ItemBox = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    margin: 0px 10px;
`;

const SearchButton = styled.button`
    margin: 0px 10px;
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

const Review = () => {
    return (
        <ReviewBlock>
            <ReviewBox>
                <ReviewSearchBox>
                    <ItemBox>
                        <div>여행지</div>
                        <select name="spot">
                            <option value="">선택</option>
                        </select>
                    </ItemBox>
                    <ItemBox>
                        <div>정렬</div>
                        <select name="sort">
                            <option value="">선택</option>
                        </select>
                    </ItemBox>
                    <ItemBox>
                        <input type="text" />
                        <SearchButton>검색</SearchButton>
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
            </ReviewBox>
        </ReviewBlock>
    );
};

export default Review;
