import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Pagination from '../../common/Pagination';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useRef } from 'react';
import EditListSearchForm from './EditListSearchForm';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import errorImg from '../../../lib/images/spotErrorImg.jpg';

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
    transform: ${(props) => (props.navOpen ? 'translateX(0px)' : 'translateX(350px)')};
    transition: 0.4s ease;
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
`;

const NavArrowIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 16px;
    left: -41px;
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
    spots,
    detail,
    onCreateLocation,
    onOpenDetail,
    likeSpots,
    totalCount,
    page,
    itemIndex,
    onIndexPage,
    onPreviousPage,
    onNextPage,
    onFirstPage,
    onLastPage,
    keyword,
    spotData,
    areas,
    contentTypeList,
    likeKeyword,
    onChangeAreaIndex,
    onChangeContentTypeId,
    onChangeResultKeyword,
    onChangeLikeKeyword,
    onChangeCurKeyword,
    onClickDateSchedule,
}) => {
    const navRef = useRef();
    const [navOpen, setNavOpen] = useState(true);
    const [resizeNav, setResizeNav] = useState(false);

    // nav 토글 함수
    const onToggleNav = () => {
        setNavOpen(!navOpen);
    };

    // 창 크기에 따른 nav 자동 종료
    const resizeNavClose = () => {
        if (window.innerWidth <= 767 && resizeNav) {
            setNavOpen(false);
            setResizeNav(false);
        } else if (window.innerWidth >= 768) {
            setResizeNav(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resizeNavClose);
        return () => {
            window.removeEventListener('resize', resizeNavClose);
        };
    });

    return (
        <>
            <EditListBlock ref={navRef} navOpen={navOpen}>
                {navOpen ? (
                    <NavArrowIcon onClick={onToggleNav} icon={faCaretRight} />
                ) : (
                    <NavArrowIcon onClick={onToggleNav} icon={faCaretLeft} />
                )}
                <EditListSearchForm
                    keyword={keyword}
                    spotData={spotData}
                    areas={areas}
                    contentTypeList={contentTypeList}
                    likeKeyword={likeKeyword}
                    onChangeAreaIndex={onChangeAreaIndex}
                    onChangeContentTypeId={onChangeContentTypeId}
                    onChangeResultKeyword={onChangeResultKeyword}
                    onChangeLikeKeyword={onChangeLikeKeyword}
                    onChangeCurKeyword={onChangeCurKeyword}
                    onIndexPage={onIndexPage}
                />
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
                                                onCreateLocation(s);
                                                onClickDateSchedule();
                                            }}
                                            icon={faPlus}
                                        />
                                    </Icons>
                                </ListItem>
                            );
                        })}
                    {Object.keys(likeSpots).length > 0 &&
                        likeSpots.list.map((s, i) => {
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
                                                onCreateLocation(s);
                                            }}
                                            icon={faPlus}
                                        />
                                    </Icons>
                                </ListItem>
                            );
                        })}
                    {/* 1. likeSpots와 spots가 없을 때
                        2. spots가 없고, likeSpots가 있지만 list는 비었을 때
                    */}
                    {(Object.keys(likeSpots).length <= 0 && Object.keys(spots).length <= 0) ||
                    (Object.keys(likeSpots).length > 0 &&
                        likeSpots.list.length <= 0 &&
                        Object.keys(spots).length <= 0) ? (
                        <ErrorList>리스트가 없습니다.</ErrorList>
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
            </EditListBlock>
        </>
    );
};

export default EditList;
