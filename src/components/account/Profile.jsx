import styled from 'styled-components';
import Button from '../common/Button';
import { useRef, useState } from 'react';
import ImageSelectModal from './ImageSelectModal';
import LabelTextBox from '../common/LabelTextBox';
import tempImage from '../../images/temp.jpg';
import tempAccountImage from '../../lib/images/blank-profile-picture.png';
import { useEffect } from 'react';

const ProfileBlock = styled.div`
    /* background-color: silver; */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 40px;
`;

const ProfileFormBlock = styled.form`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    padding: 3rem 0px;
`;

const ProfileInfoBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;

const ProfileImageBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfileImage = styled.img`
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    border: none;
    border-radius: 32px;
    width: 128px;
    height: 128px;
`;

const ImageModifyBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    height: 28px;
    border-radius: 6px;
    border: solid 1px silver;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};

    &:hover {
        border-radius: 6px;
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const ProfileTextBoxBlock = styled.div`
    display: flex;
    flex-grow: 0.3;
    flex-direction: column;
`;

const StyledLabelTextBox = styled(LabelTextBox)`
    margin-top: 20px;

    input {
        border: solid 1px silver;
    }
`;

const ActionBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 20px;
`;

const SaveButton = styled.button`
    width: 82px;
    height: 42px;
    border-radius: 6px;
    border: solid 1px silver;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.clickedButtonBackgroundColor};

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const Profile = ({
    loading,
    account,
    accountField,
    onProfileLoad,
    onProfileChange,
    onProfileUpdate,
    onProfileImageUpdate,
}) => {
    const { username, nickname, phone } = account || {};
    const { nickname: nicknameFeild, phone: phoneFeild } = accountField;

    const inputRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const handleModalShow = () => {
        setModalVisible(true);
    };
    const handleModalClose = () => {
        setModalVisible(false);
    };
    const handleModalConfirm = () => {
        // // 할 일
        const data = inputRef.current.files[0];
        const formData = new FormData();
        formData.append('image', data);
        onProfileImageUpdate(formData);
        setModalVisible(false);
    };

    // if (!loading && profileError) {
    //     alert(profileError);
    // }

    const handleImageLoadError = (e) => {
        e.target.src = tempImage;
    };

    useEffect(() => {
        onProfileLoad();
    }, []);

    return (
        <ProfileBlock>
            <ProfileFormBlock>
                <ProfileInfoBlock>
                    <ProfileImageBlock>
                        <ProfileImage
                            src={account ? `${process.env.PUBLIC_URL}/${account.image}` : tempAccountImage}
                            onError={handleImageLoadError}
                        ></ProfileImage>
                        <ImageModifyBtn onClick={handleModalShow}>변경</ImageModifyBtn>
                    </ProfileImageBlock>
                    <ProfileTextBoxBlock>
                        <StyledLabelTextBox name={'username'} label={'이름'} value={username} readOnly />
                        <StyledLabelTextBox
                            name={'nickname'}
                            label={'닉네임'}
                            value={nicknameFeild || nickname}
                            onChange={onProfileChange}
                        />
                        <StyledLabelTextBox
                            name={'phone'}
                            label={'휴대폰 번호'}
                            value={phoneFeild || phone}
                            onChange={onProfileChange}
                        />
                        <ActionBlock>
                            <SaveButton onClick={onProfileUpdate}>저장</SaveButton>
                        </ActionBlock>
                    </ProfileTextBoxBlock>
                </ProfileInfoBlock>
            </ProfileFormBlock>
            <ImageSelectModal
                ref={inputRef}
                modalVisible={modalVisible}
                onModalClose={handleModalClose}
                onModalCancle={handleModalClose}
                onModalConfirm={handleModalConfirm}
            />
        </ProfileBlock>
    );
};

export default Profile;
