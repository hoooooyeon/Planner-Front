import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    background-color: silver;
    border-radius: 6px;
    margin: 0px 30px;
`;

const PostMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BoxAlign = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
`;
const B = styled.b`
    color: white;
    margin: 10px 0px;
`;

const Input = styled.input`
    //height: 28px;
    outline: none;
    border: none;
    border-radius: 6px;
    padding: 8px;
`;

const PostTitleBox = styled(BoxAlign)``;

const PostContentBox = styled.div`
    background-color: white;
    margin-top: 10px;
    margin-bottom: 10px;
    .ql-editor {
        min-height: 320px;
    }
`;

const PostFooterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Button = styled.button`
    width: 64px;
    height: 32px;
    font-weight: bold;
    color: ${(props) => props.textColor || 'black'};
    background-color: ${(props) => props.color || 'white'};
    border: none;
    border-radius: 6px;
    margin: 10px 4px;

    &:hover {
        background-color: #ebebeb;
    }
`;

const ReviewPost = () => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'snow',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {});
    }, []);

    return (
        <Container>
            <PostMain>
                <BoxAlign>
                    <B>제목</B>
                    <Input type="text" />
                </BoxAlign>
                <BoxAlign>
                    <PostContentBox>
                        <div ref={quillElement}></div>
                    </PostContentBox>
                </BoxAlign>
            </PostMain>
            <PostFooterBox>
                <Button>취소</Button>
                <Button>올리기</Button>
            </PostFooterBox>
        </Container>
    );
};

export default ReviewPost;
