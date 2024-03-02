import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const PostItem = styled.li`
    border-bottom: 1px solid ${(props) => props.theme.outlineColor};
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    &:hover {
        background-color: ${(props) => props.theme.secondaryBackgroundColor};
    }
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
    color: ${(props) => props.theme.tertiaryColor};
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
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 0.3rem;
    width: 0.7rem;
    height: 0.7rem;
    cursor: pointer;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        color: ${(props) => props.theme.hoverColor};
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const InfoPostItem = ({ account, planner, memo, onDeleteMemo, onLoadMemo, number }) => {
    const { memoId, title } = memo;
    const { accountId } = { ...account };

    return (
        <PostItem>
            <PostHeader>
                <Number>{number + 1}</Number>
                <Title>{title}</Title>
            </PostHeader>
            <ButtonBox>
                <StyledFontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                        onLoadMemo(memo);
                    }}
                />
                {accountId === planner.accountId && (
                    <StyledFontAwesomeIcon
                        icon={faXmark}
                        onClick={() => {
                            onDeleteMemo(memoId);
                        }}
                    />
                )}
            </ButtonBox>
        </PostItem>
    );
};

export default InfoPostItem;
