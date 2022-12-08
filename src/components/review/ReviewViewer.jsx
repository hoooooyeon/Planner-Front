import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '../common/Menu';
import Button from '../common/Button';

const Container = styled.div`
    margin-top: 100px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ReviewPostBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
`;

const PostTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: medium;
    padding: 10px;
    border-bottom: 1px solid silver;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`;

const Title = styled.div`
    font-size: x-large;
`;

const Info = styled.div`
    font-size: small;
    margin-top: 4px;
    span:nth-child(2n) {
        margin: 0px 4px;
    }
`;

const TitleMenus = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    & > * {
        margin: 0px 10px;
    }
`;

const ThumbsUp = styled.div`
    cursor: pointer;
    &:hover {
        color: skyblue;
    }
`;

const PostContentBox = styled.div`
    min-height: 320px;
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid silver;
`;

const PostFooterBox = styled.div`
    display: flex;
    margin-top: 10px;
`;

const PostTag = styled.a`
    min-width: 60px;
    height: 26px;
    padding: 2px;
    line-height: 28px;
    text-align: center;
    border-radius: 6px;
    background-color: #e3e3e3;

    &:nth-child(2n) {
        margin: 0px 4px;
    }
`;

const PostCommentWriteBox = styled.div`
    border: 1px solid silver;
    border-radius: 6px;
    padding: 12px;
    margin-top: 20px;
`;

const CommentUserName = styled.b`
    display: block;
    margin: 10px 0px;
`;

const CommentWriteTextArea = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border: none;
    /* border-radius: 6px; */
    padding: 0px;
    outline: none;
    resize: none;
`;

const PostCommentWriteButtomBox = styled.div`
    text-align: right;
    margin-top: 10px;
`;

const CommentButton = styled(Button)`
    width: 80px;
    height: 32px;
`;

const CommentBox = styled.div`
    margin-top: 20px;
`;

const Comment = styled.div`
    padding: 20px 0px;
    border-bottom: 1px solid silver;
`;

const menuList = [
    { id: 1, value: '수정' },
    { id: 2, value: '삭제' },
];

const ReviewViewer = () => {
    return (
        <Container>
            <ReviewPostBox>
                <PostTitleBox>
                    <FlexBox direction="column">
                        <Title>aaaaa</Title>
                        <Info>
                            <span>작성자:ㅁㅁ</span>
                            <span>조회수:00</span>
                        </Info>
                    </FlexBox>
                    <TitleMenus>
                        <ThumbsUp>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </ThumbsUp>
                        <Menu list={menuList} />
                    </TitleMenus>
                </PostTitleBox>
                <PostContentBox>내용</PostContentBox>
                <PostFooterBox>
                    <PostTag>태그1</PostTag>
                    <PostTag>태그2</PostTag>
                    <PostTag>태그3</PostTag>
                </PostFooterBox>
                <PostCommentWriteBox>
                    <CommentUserName>bluebear</CommentUserName>
                    <form>
                        <CommentWriteTextArea />
                        <PostCommentWriteButtomBox>
                            <CommentButton>댓글 쓰기</CommentButton>
                        </PostCommentWriteButtomBox>
                    </form>
                </PostCommentWriteBox>
                <CommentBox>
                    <Comment>
                        <CommentUserName>아이디</CommentUserName>
                        <div>자세한 리뷰 좋습니다!!</div>
                    </Comment>
                    <Comment>
                        <CommentUserName>아이디</CommentUserName>
                        <div>사진 너무 이쁘네요!</div>
                    </Comment>
                    <Comment>
                        <CommentUserName>아이디</CommentUserName>
                        <div>너무 잘보았습니다.</div>
                    </Comment>
                </CommentBox>
            </ReviewPostBox>
        </Container>
    );
};

export default ReviewViewer;
