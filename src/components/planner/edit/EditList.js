import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import EditListDetailModal from './EditListDetailModal';
import { useState } from 'react';
import Pagination from '../../common/Pagination';
import EditSpotList from './EditSpotList';
import { useEffect } from 'react';
import { useRef } from 'react';
import EditListSearchForm from './EditListSearchForm';

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

const EditList = ({
    spots,
    areas,
    keyword,
    detail,
    spotData,
    onChangePlanLocation,
    onCreateLocation,
    onMoveMarker,
    onOpenDetail,
    onCloseDetail,
    onChangeContentTypeId,
    pageArr,
    likeKeyword,
    onIndexPage,
    onPreviousPage,
    onNextPage,
    onFirstPage,
    onLastPage,
    contentTypeList,
    onChangeAreaIndex,
    onChangeCurKeyword,
    onChangeResultKeyword,
    onSearchSpot,
    menuIndex,
    onChangeMenuIndex,
    onChangeLikeKeyword,
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
                {navOpen ? <NavArrowIcon onClick={onToggleNav} icon={faCaretRight} /> : <NavArrowIcon onClick={onToggleNav} icon={faCaretLeft} />}
                <EditListSearchForm />
                <EditSpotList spots={spots} onMoveMarker={onMoveMarker} onOpenDetail={onOpenDetail} onCreateLocation={onCreateLocation} />
                <PageBox>
                    <Pagination pageArr={pageArr} onIndexPage={onIndexPage} onPreviousPage={onPreviousPage} onNextPage={onNextPage} onFirstPage={onFirstPage} onLastPage={onLastPage} />
                </PageBox>
            </EditListBlock>
            {detail && <EditListDetailModal detail={detail} onCloseDetail={onCloseDetail} />}
        </>
    );
};

export default EditList;
