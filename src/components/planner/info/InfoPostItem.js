import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const PostItem = styled.li`
    border-bottom: 1px solid var(--md-sys-color-outline-variant);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
`;

const Number = styled.div`
    font-size: 0.7rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--md-sys-color-secondary);
`;

const Title = styled.div`
    font-weight: bold;
    width: 10rem;
    font-size: 0.9rem;
    margin-left: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    border-radius: 2rem;
    color: var(--md-sys-color-on-secondary-container);
    background-color: var(--md-sys-color-secondary-container);
    padding: 0.3rem;
    width: 0.7rem;
    height: 0.7rem;
    cursor: pointer;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        box-shadow: 0px 1px 6px -3px var(--md-sys-color-shadow);
    }
`;

const InfoPostItem = ({ account, planner, memo, onDeleteMemo, onLoadMemo, setIsEdit }) => {
    const { memoId, title } = memo;
    const { nickname } = { ...account };
    const { creator } = { ...planner };

    const onDeletePostMd = () => {
        onDeleteMemo(memoId);
    };

    return (
        <PostItem>
            <PostHeader>
                <Number>{memoId}</Number>
                <Title>{title}</Title>
            </PostHeader>
            <ButtonBox>
                <StyledFontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                        setIsEdit(true);
                        onLoadMemo(memo);
                    }}
                />
                {nickname === creator && <StyledFontAwesomeIcon icon={faXmark} onClick={onDeletePostMd} />}
            </ButtonBox>
        </PostItem>
    );
};

export default InfoPostItem;
