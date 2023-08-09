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
    background-color: white;
    float: left;
    z-index: 200;
    transform: ${(props) => (props.navOpen ? 'translateX(0px)' : 'translateX(350px)')};
    transition: 0.4s ease;
`;

const List = styled.div`
    height: 29rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    z-index: 200;
    background-color: #f5f5f5;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
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
        background-color: #ffcbc14f;
    }
`;

const Img = styled.img`
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    width: 5rem;
    height: 5rem;
    font-size: 0.7rem;
    color: lightgray;
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
    color: lightgray;
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
    background-color: rgb(230, 230, 230);
    cursor: pointer;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.1);
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
    background: white;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.1);
    }
`;

const PageBox = styled.div`
    width: 100%;
    box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
`;

const ErrorList = styled.div`
    color: lightgray;
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
                    {spots &&
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
                                            }}
                                            icon={faPlus}
                                        />
                                    </Icons>
                                </ListItem>
                            );
                        })}
                    {likeSpots &&
                        likeSpots.list &&
                        likeSpots.list.length > 0 &&
                        likeSpots.list.map((s, i) => {
                            const { firstimage, firstimage2, title } = s;
                            return (
                                <ListItem key={i}>
                                    <Img
                                        src={firstimage || firstimage2}
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
                    {(!likeSpots && (!spots || !spots.list || spots.list.length < 1)) ||
                    (!spots && (!likeSpots || !likeSpots.list || likeSpots.list.length < 1)) ? (
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
