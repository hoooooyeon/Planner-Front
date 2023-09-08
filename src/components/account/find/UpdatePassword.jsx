import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import styled from 'styled-components';
import LabelTextBox from '../../common/LabelTextBox';

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

const SuccessText = styled.div`
    width: 100%;
    font-size: 1.2rem;
`;
const SuccessBox = styled.div`
    width: 100%;
    backgroundcolor: ${(props) => props.theme.mainColor};
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
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.primaryColor};
    transition: box-shadow 0.1s ease-in;

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const LinkBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 0.8rem;
`;

const UpdatePassword = ({ verificationCode }) => {
    return (
        <Container>
            <ContentBox>
                <LogoText>한국다봄</LogoText>
                <FormBox>
                    <LabelTextBox type="password" name="password" placeholder="새 비밀번호" label="새 비밀번호" />
                    <LabelTextBox
                        type="password"
                        name="passwordConfirm"
                        placeholder="새 비밀번호 확인"
                        label="새 비밀번호 확인"
                    />
                    <Button>비밀번호 변경</Button>
                </FormBox>
            </ContentBox>
        </Container>
    );
};

export default UpdatePassword;
