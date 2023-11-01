import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import styled, { css } from 'styled-components';
import LabelTextBox from '../../common/LabelTextBox';
import Modal from '../../common/Modal';
import { status } from './Status';
import Timer from '../../common/Timer';

const Container = styled.div`
    width: 100%;
    padding: 5rem 0px;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContentBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 320px;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    border-radius: 6px;
    padding: 20px;
`;

const LogoText = styled.b`
    font-size: 2rem;
`;

const FormBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    color: ${(props) => props.theme.secondaryColor};
`;

const Error = styled.b`
    font-size: 0.8rem;
    color: ${(props) => props.theme.errorColor};
    margin: 3px 0px;
`;

const Button = styled.button`
    width: 100%;
    margin: 10px 0px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    color: ${(props) => props.theme.secondaryColor};
    transition: box-shadow 0.1s ease-in;

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }

    ${(props) =>
        props.isCode &&
        css`
            background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
            color: ${(props) => props.theme.primaryColor};
        `}
`;

const LinkBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.8rem;
`;

const FindId = ({ accountError, idFindForm, phase, codeRequest, onChange, loading, onFindId, onCodeTimerEnd }) => {
    const isNormalError = typeof accountError === 'string';
    const [modal, setModal] = useState(false);

    const handleFindIdClick = () => {
        onFindId();
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleModalConfirm = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (isNormalError) {
            setModal(true);
        }
    }, [isNormalError, accountError]);

    return (
        <Container>
            <ContentBox>
                <LogoText>한국다봄</LogoText>
                <FormBox>
                    <LabelTextBox
                        type="text"
                        name="username"
                        placeholder="이름"
                        label="이름"
                        onChange={onChange}
                        value={idFindForm.username}
                        error={accountError}
                    />
                    <LabelTextBox
                        type="text"
                        name="phone"
                        placeholder="전화번호"
                        label="전화번호"
                        onChange={onChange}
                        value={idFindForm.phone}
                        error={accountError}
                    />
                    {/* 인증 요청 이후에 생성된 input에 인증 코드를 적고 아이디 찾기 클릭 */}
                    {codeRequest && (
                        <LabelTextBox
                            type="text"
                            name="code"
                            placeholder="인증코드"
                            label="인증코드"
                            onChange={onChange}
                            value={idFindForm.code}
                            error={accountError}
                        />
                    )}
                    {codeRequest && (
                        <p>
                            인증코드 유효시간: <Timer onTimerEnd={onCodeTimerEnd} />
                        </p>
                    )}

                    <Button onClick={handleFindIdClick}>
                        {phase == status.REQUEST && '인증 번호 요청'}
                        {phase == status.FIND && '아이디 찾기'}
                    </Button>
                </FormBox>
                <LinkBox>
                    <NavLink to="findPassword">비밀번호 찾기</NavLink>
                </LinkBox>
            </ContentBox>
            {isNormalError && (
                <Modal
                    modalVisible={modal}
                    title="알림"
                    onModalClose={handleModalClose}
                    onModalConfirm={handleModalConfirm}
                >
                    <b>{accountError}</b>
                </Modal>
            )}
        </Container>
    );
};

export default FindId;
