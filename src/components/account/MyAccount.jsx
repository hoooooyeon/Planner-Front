import { useState } from 'react';
import styled, { css } from 'styled-components';
import Profile from './Profile';
import LikeListView from './like/LikeListView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const AccountBlock = styled.div`
    //min-width: 48rem;
    margin: 0px auto;
    max-width: 1440px;
    box-sizing: border-box;
    padding: 1.25rem 2.5rem;

    @media screen and (max-width: 768px) {
        padding: 1.25rem 0.625rem;
    }

    @media screen and (max-width: 480px) {
        padding: 1.25rem 0.625rem;
    }
`;

const TopNav = styled.div`
    height: 3.75rem;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: stretch;
    border-radius: 6px;
    border: solid 1px silver;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const NavItem = styled.div`
    padding: 0rem 0.625rem;
    text-align: center;
    line-height: 3.75rem;

    ${(props) =>
        props.active &&
        css`
            color: ${(props) => props.theme.primaryColor};
            background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
        `}

    &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }

    &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    &:hover {
        color: ${(props) => props.theme.hoverColor};
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }

    svg {
        margin-right: 10px;
    }
`;

const ContentBlock = styled.div`
    border-radius: 6px;
    border: solid 1px silver;
    margin-top: 20px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const MyAccount = ({
    loading,
    account,
    accountField,
    likeList,
    onProfileLoad,
    onLikeListLoad,
    onProfileChange,
    onProfileUpdate,
    onProfileImageUpdate,
}) => {
    const [menu, setMenu] = useState(1);

    return (
        <Container>
            <AccountBlock>
                <TopNav>
                    <NavItem active={menu == 1} onClick={() => setMenu(1)}>
                        <FontAwesomeIcon icon={faUser} />
                        <span>계정 정보</span>
                    </NavItem>
                    <NavItem active={menu == 2} onClick={() => setMenu(2)}>
                        <FontAwesomeIcon icon={faStar} />
                        <span>좋아요</span>
                    </NavItem>
                </TopNav>
                <ContentBlock>
                    {(() => {
                        if (menu == 1) {
                            return (
                                <Profile
                                    loading={loading}
                                    account={account}
                                    accountField={accountField}
                                    onProfileLoad={onProfileLoad}
                                    onProfileChange={onProfileChange}
                                    onProfileUpdate={onProfileUpdate}
                                    onProfileImageUpdate={onProfileImageUpdate}
                                ></Profile>
                            );
                        } else if (menu == 2) {
                            return (
                                <LikeListView
                                    loading={loading}
                                    likeLists={likeList}
                                    onLikeListLoad={onLikeListLoad}
                                ></LikeListView>
                            );
                        }
                    })()}
                </ContentBlock>
            </AccountBlock>
        </Container>
    );
};

export default MyAccount;
