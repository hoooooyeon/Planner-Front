import { useState } from 'react';
import styled, { css } from 'styled-components';
import Profile from './Profile';
import LikeListView from './like/LikeListView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

const AccountBlock = styled.div`
    min-width: 768px;
    box-sizing: border-box;
    padding: 20px 40px;
`;

const TopNav = styled.div`
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: stretch;
    border-radius: 6px;
    border: solid 1px silver;
    box-shadow: 0px 3px 6px var(--md-sys-color-shadow);
    background-color: var(--md-sys-color-surface);
`;

const NavItem = styled.div`
    /* height: 50px; */
    padding: 0px 10px;
    /* margin: 0px 10px; */
    text-align: center;
    /* line-height: 50px; */
    line-height: 60px;
    /* border: solid 1px white; */

    ${(props) =>
        props.active &&
        css`
            color: var(--md-sys-color-on-secondary-container);
            background-color: var(--md-sys-color-secondary-container);
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
        /* background-color: silver; */
        /* border-radius: 6px; */
        /* border: solid 1px silver; */
        color: var(--md-sys-color-on-surface-variant);
        background-color: var(--md-sys-color-surface-variant);
    }

    svg {
        margin-right: 10px;
    }
`;

const ContentBlock = styled.div`
    /* height: 580px; */
    border-radius: 6px;
    border: solid 1px silver;
    margin-top: 20px;
    box-shadow: 0px 3px 6px var(--md-sys-color-shadow);
    background-color: var(--md-sys-color-surface);
`;

const MyAccount = ({
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
                                account={account}
                                accountField={accountField}
                                onProfileLoad={onProfileLoad}
                                onProfileChange={onProfileChange}
                                onProfileUpdate={onProfileUpdate}
                                onProfileImageUpdate={onProfileImageUpdate}
                            ></Profile>
                        );
                    } else if (menu == 2) {
                        return <LikeListView likeLists={likeList} onLikeListLoad={onLikeListLoad}></LikeListView>;
                    }
                })()}
            </ContentBlock>
        </AccountBlock>
    );
};

export default MyAccount;
