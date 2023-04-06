import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';

const InfoEditItemBlock = styled.div`
    border: 1px solid #cdd9ac;
    border-radius: 5px;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
`;
const InfoEditItemTitleBox = styled.div`
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    width: 18rem;
    height: 2rem;
    text-indent: 10px;
    border-radius: 5px;
    background-color: #f1eee0;
    &::placeholder {
        color: #beb9b9;
    }
    &:focus {
        color: #ef9a9a;
    }
`;

const InfoEditItem = ({ curMemo, onChangeMemoTitle, onChangeMemoContent }) => {
    const modules = {
        toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], [{ color: [] }, { background: [] }], ['clean']],
    };

    const { title, content, memoId } = curMemo;
    return (
        <InfoEditItemBlock>
            <InfoEditItemTitleBox>
                <StyledInput
                    name="title"
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => {
                        onChangeMemoTitle(e.target.value);
                    }}
                />
            </InfoEditItemTitleBox>
            <ReactQuill
                placeholder="내용을 입력해주세요."
                theme="snow"
                modules={modules}
                value={content}
                onChange={(e) => {
                    onChangeMemoContent(e);
                }}
            />
        </InfoEditItemBlock>
    );
};

export default InfoEditItem;
