import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
    width: 800px;
    background-color: silver;
    border-radius: 6px;
    margin: 100px auto 30px auto;
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

const ReviewPost = ({ reviewData, onChangeText, fileList, onCancel, onWritePost, onFileUpload, isEdit }) => {
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
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', () => {
            const container = quillElement.current;
            let input = container.querySelector('input[type=file]');
            if (!input) {
                input = document.createElement('input');
                input.style = 'display:none';
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.setAttribute('multiple', 'true');
                input.onchange = () => {
                    const files = input.files;
                    if (input.value.length != 0) {
                        const formData = new FormData();
                        Array.apply(null, input.files).forEach((item) => {
                            formData.append('files', item);
                        });
                        onFileUpload(formData);
                    }

                    input.remove();
                };
                quillElement.current.appendChild(input);
            }
            input.click();
        });

        quill.root.innerHTML = reviewData.content || '';
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source == 'user') {
                onChangeText({ key: 'content', value: quill.root.innerHTML });
            }
        });
    }, []);

    useEffect(() => {
        if (isEdit) {
            const quill = quillInstance.current;
            if (quill) {
                if (fileList) {
                    fileList.map((item) => {
                        quill.insertEmbed(quill.getSelection(), 'image', `/api/upload/files/${item}`, 'user');
                    });
                }
            }
        }
    }, [fileList]);

    const onPost = () => {
        const fileList = quillElement.current.querySelector('input[type=file]');
        onWritePost(fileList);
    };

    return (
        <Container>
            <PostMain>
                <BoxAlign>
                    <B>제목</B>
                    <Input type="text" name="title" value={reviewData.title} onChange={(e) => onChangeText({ key: 'title', value: e.target.value })} placeholder="제목을 입력하세요." />
                </BoxAlign>
                <BoxAlign>
                    <PostContentBox>
                        <div ref={quillElement}></div>
                    </PostContentBox>
                </BoxAlign>
            </PostMain>
            <PostFooterBox>
                <Button onClick={onCancel}>취소</Button>
                <Button onClick={onPost}>{isEdit ? '수정' : '쓰기'}</Button>
            </PostFooterBox>
        </Container>
    );
};

export default ReviewPost;
