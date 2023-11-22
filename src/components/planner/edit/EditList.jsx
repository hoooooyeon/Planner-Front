import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Pagination from '../../common/Pagination.js';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import EditListSearchForm from './EditListSearchForm';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import errorImg from '../../../lib/images/spotErrorImg.jpg';
import Empty from '../../common/Empty';
import Loading from '../../common/Loading';
import Modal from '../../common/Modal';
import ErrorModal from '../../common/ErrorModal';

const EditListBlock = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 350px;
    height: 100vh;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    float: left;
    z-index: 200;
    @media all and (max-width: 480px) {
        transition: 0s;
        width: 100%;
        top: ${(props) => (props.navList ? '250px' : '740px')};
    }
    @media all and (min-width: 481px) {
        /* transition: 0.4s ease; */
        transform: ${(props) => (props.navList ? 'translateX(0px)' : 'translateX(350px)')};
    }
`;

const List = styled.div`
    height: 28rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    z-index: 200;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
    @media all and (max-width: 480px) {
        height: 13.5rem;
    }
`;

const ListItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    padding: 0.5rem;
    &:hover {
        background-color: ${(props) => props.theme.primaryBackgroundColor};
    }
`;

const Img = styled.img`
    border-radius: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    width: 5rem;
    height: 5rem;
    font-size: 0.7rem;
    @media all and (max-width: 480px) {
        width: 4rem;
        height: 4rem;
    }
`;
const TextInfo = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0.8rem;
`;

const Name = styled.div`
    width: 8rem;
    height: 1.2rem;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    @media all and (max-width: 480px) {
        font-size: 0.8rem;
    }
`;

const Address = styled.div`
    width: 8rem;
    height: 1rem;
    overflow: hidden;
    white-space: wrap;
    font-size: 0.6rem;
    color: ${(props) => props.theme.tertiaryColor};
    text-overflow: ellipsis;
`;

const Icons = styled.div`
    display: flex;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    border-radius: 2rem;
    padding: 0.5rem;
    height: 1rem;
    width: 1rem;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    cursor: pointer;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        color: ${(props) => props.theme.hoverColor};
    }
    @media all and (max-width: 480px) {
        height: 0.8rem;
        width: 0.8rem;
    }
`;

const NavArrowIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 10px;
    left: -48px;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
    padding: 0.3rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    cursor: pointer;
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        color: ${(props) => props.theme.hoverColor};
    }
`;

const PageBox = styled.div`
    width: 100%;
    padding: 5px 0;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
`;

const ErrorList = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    font-weight: bold;
    font-size: 1.2rem;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;

const EditList = ({
    plannerData,
    spots,
    onCreateLocation,
    onOpenDetail,
    likeSpotList,
    totalCount,
    page,
    loading,
    itemIndex,
    onIndexPage,
    onPreviousPage,
    onNextPage,
    onFirstPage,
    onLastPage,
    keyword,
    spotData,
    navList,
    areas,
    contentTypeList,
    likeKeyword,
    onChangeAreaIndex,
    onChangeContentTypeId,
    onChangeResultKeyword,
    onChangeLikeKeyword,
    onChangeCurKeyword,
    onClickDateSchedule,
    onToggleWindowNavList,
}) => {
    const [resizeMobileNav, setResizeMobileNav] = useState(false);
    const [resizeWindowNav, setResizeWindowNav] = useState(false);
    const [isPlanModal, setIsPlanModal] = useState(false);

    // 창 크기에 따른 nav 자동 종료
    const resizeWindowNavClose = () => {
        if (window.innerWidth <= 768 && resizeWindowNav) {
            onToggleWindowNavList(false);
            setResizeWindowNav(false);
        } else if (window.innerWidth >= 769) {
            setResizeWindowNav(true);
        }
    };
    const resizeMobileNavClose = () => {
        if (window.innerWidth <= 480 && resizeMobileNav) {
            onToggleWindowNavList(false);
            setResizeMobileNav(false);
        } else if (window.innerWidth >= 481) {
            setResizeMobileNav(true);
        }
    };

    const handleConfirmModal = () => {
        setIsPlanModal(false);
    };

    const handleCreateLocation = (spot) => {
        if (plannerData && plannerData.planId) {
            onCreateLocation(spot);
        } else {
            setIsPlanModal(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizeWindowNavClose);
        window.addEventListener('resize', resizeMobileNavClose);
        return () => {
            window.removeEventListener('resize', resizeWindowNavClose);
            window.removeEventListener('resize', resizeMobileNavClose);
        };
    });

    return (
        <>
            <EditListBlock navList={navList}>
                {navList ? (
                    <NavArrowIcon onClick={() => onToggleWindowNavList(false)} icon={faCaretRight} />
                ) : (
                    <NavArrowIcon onClick={() => onToggleWindowNavList(true)} icon={faCaretLeft} />
                )}
                <EditListSearchForm
                    keyword={keyword}
                    spotData={spotData}
                    areas={areas}
                    contentTypeList={contentTypeList}
                    likeKeyword={likeKeyword}
                    loading={loading.areasLoading}
                    onChangeAreaIndex={onChangeAreaIndex}
                    onChangeContentTypeId={onChangeContentTypeId}
                    onChangeResultKeyword={onChangeResultKeyword}
                    onChangeLikeKeyword={onChangeLikeKeyword}
                    onChangeCurKeyword={onChangeCurKeyword}
                    onIndexPage={onIndexPage}
                />
                {loading.spotLoading || loading.searchSpotLoading || loading.likeSpotLoading ? (
                    <List>
                        <Loading pos="center" />
                    </List>
                ) : (
                    <>
                        <List>
                            {Object.keys(spots).length > 0 &&
                                spots.list.map((s, i) => {
                                    const { firstImage, firstImage2, title, addr1 } = s;

                                    return (
                                        <ListItem key={i}>
                                            <Img
                                                src={firstImage || firstImage2}
                                                alt={title}
                                                onError={(e) => {
                                                    handleErrorImg({ e, errorImg });
                                                }}
                                            />
                                            <TextInfo>
                                                <Name>{title}</Name>
                                                <Address>{addr1.split(' ')[0]}</Address>
                                            </TextInfo>
                                            <Icons>
                                                <StyledFontAwesomeIcon
                                                    onClick={() => {
                                                        onOpenDetail(s);
                                                    }}
                                                    icon={faExclamation}
                                                />

                                                <StyledFontAwesomeIcon
                                                    onClick={() => {
                                                        handleCreateLocation(s);
                                                        onClickDateSchedule();
                                                    }}
                                                    icon={faPlus}
                                                />
                                            </Icons>
                                        </ListItem>
                                    );
                                })}
                            {Object.keys(likeSpotList).length > 0 &&
                                likeSpotList.list.map((s, i) => {
                                    const { image, title } = s;
                                    return (
                                        <ListItem key={i}>
                                            <Img
                                                src={image}
                                                alt={title}
                                                onError={(e) => {
                                                    handleErrorImg({ e, errorImg });
                                                }}
                                            />
                                            <TextInfo>
                                                <Name>{title}</Name>
                                            </TextInfo>
                                            <Icons>
                                                <StyledFontAwesomeIcon
                                                    onClick={() => {
                                                        onOpenDetail(s);
                                                    }}
                                                    icon={faExclamation}
                                                />

                                                <StyledFontAwesomeIcon
                                                    onClick={() => {
                                                        handleCreateLocation(s);
                                                    }}
                                                    icon={faPlus}
                                                />
                                            </Icons>
                                        </ListItem>
                                    );
                                })}
                            {/* 1. spots와 likeSpotList가 없을 떄
                        2. spots가 비었을 때(likeSpotList x)
                        3. likeSpotList가 비었을 때(spots x)
                    */}
                            {(Object.keys(likeSpotList).length <= 0 &&
                                Object.keys(spots).length > 0 &&
                                spots.list <= 0) ||
                            (Object.keys(likeSpotList).length > 0 &&
                                likeSpotList.list.length <= 0 &&
                                Object.keys(spots).length <= 0) ? (
                                <Empty text="리스트" />
                            ) : null}
                        </List>
                        <PageBox>
                            <Pagination
                                totalCount={totalCount}
                                itemIndex={itemIndex}
                                page={page}
                                onIndexPage={onIndexPage}
                                onPreviousPage={onPreviousPage}
                                onNextPage={onNextPage}
                                onFirstPage={onFirstPage}
                                onLastPage={onLastPage}
                            />
                        </PageBox>
                    </>
                )}
            </EditListBlock>
            <ErrorModal errorState={isPlanModal} onCloseError={handleConfirmModal} errorMessage="일정을 선택하세요!" />
        </>
    );
};

export default EditList;
