import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import InfoMap from './InfoMap';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import InfoRoute from './InfoRoute';
import InfoMenu from './InfoMenu';
import ErrorModal from '../../common/ErrorModal';
import Loading from '../../common/Loading';
import Modal from '../../common/Modal';

const PlannerInfoBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1rem;
    margin: 0 auto;
    min-height: 31rem;
    @media all and (min-width: 768px) {
        padding: 0 9rem;
    }
`;

const InfoHeader = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    h3 {
        margin: 0;
    }
`;

const MenuBox = styled.div`
    position: relative;
    padding-left: 1rem;
`;

const MenuList = styled.ul`
    display: none;
    padding: 0;
    margin: 0;
    @media all and (min-width: 1024px) {
        display: flex;
    }
`;

const MenuItem = styled.li`
    border-radius: 0.5rem;
    padding: 0.5rem;
    margin-left: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    font-size: 0.8rem;
    white-space: nowrap;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    cursor: pointer;
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        font-weight: bold;
        color: ${(props) => props.theme.hoverColor};
    }
`;

const Menu = styled.div`
    width: 4rem;
    height: 2rem;
    align-items: center;
    border-radius: 0.5rem;
    justify-content: space-evenly;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    cursor: pointer;
    display: none;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
    @media all and (max-width: 1023px) {
        display: flex;
    }
`;

const DropDownMenu = styled.ul`
    position: absolute;
    z-index: 10;
    width: 7rem;
    flex-direction: column;
    padding: 0;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 0.5rem;
    top: 24px;
    left: 17px;
    font-size: 0.7rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    li {
        cursor: pointer;
        padding: 5px 10px;
        color: ${(props) => props.theme.secondaryColor};
        &:hover {
            font-weight: bold;
            color: ${(props) => props.theme.hoverColor};
        }
    }
`;

const FlexBox = styled.div`
    width: 100%;
    padding: 1rem 0;
    @media all and (min-width: 768px) {
        display: flex;
        justify-content: space-between;
    }
`;

const PlannerInfo = ({
    account,
    planner,
    mapRef,
    allSchedule,
    plannerData,
    loading,
    drag,
    plannerError,
    onCloseError,
    onDeletePlanner,
    onToggleMemberModal,
    onTogglePlannerInfoModal,
    onChangeCurPlanId,
    onToggleLikePlanner,
    onClickToggleScheduleView,
    onClickToggleMapSchedule,
    onClickEditPlanner,
}) => {
    const { creator } = { ...planner };
    const { accountId } = { ...account };
    const menuRef = useRef();
    const containerRef = useRef();
    const [isDropDown, setIsDropDown] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [likePlannerModal, setLikePlannerModal] = useState(false);

    const onOpenDropDown = () => {
        setIsDropDown(!isDropDown);
    };

    const onCloseDropDown = () => {
        if (isDropDown) {
            setIsDropDown(false);
        }
    };

    const onResizeDropDown = () => {
        if (window.innerWidth > 1023 || window.innerWidth < 400) {
            setIsDropDown(false);
        }
    };

    useEffect(() => {
        window.addEventListener('click', onCloseDropDown);
        window.addEventListener('resize', onResizeDropDown);
        return () => {
            window.removeEventListener('click', onCloseDropDown);
            window.removeEventListener('resize', onResizeDropDown);
        };
    });

    const handleToggleLikePlanner = () => {
        if (accountId) {
            onToggleLikePlanner();
        } else {
            setLikePlannerModal(true);
        }
    };

    const handleConfirmModal = () => {
        setLikePlannerModal(false);
    };

    const handleToggleDeleteModal = () => {
        setIsDeleteModal((isDeleteModal) => !isDeleteModal);
    };

    return (
        <PlannerInfoBlock ref={containerRef}>
            <Container>
                {loading.plannerLoading ? (
                    <Loading />
                ) : (
                    <>
                        <InfoHeader>
                            <h3>{creator}의 플래너</h3>
                            {accountId === planner.accountId && (
                                <MenuBox>
                                    <MenuList>
                                        <MenuItem onClick={onTogglePlannerInfoModal}>플래너 정보 수정</MenuItem>
                                        <MenuItem onClick={onClickEditPlanner}>플래너 루트 수정</MenuItem>
                                        <MenuItem onClick={onToggleMemberModal}>멤버 관리</MenuItem>
                                        <MenuItem onClick={handleToggleDeleteModal}>플래너 삭제</MenuItem>
                                    </MenuList>
                                    <Menu onClick={onOpenDropDown}>
                                        <FontAwesomeIcon icon={faGear} />
                                        <p>관리</p>
                                    </Menu>
                                    {isDropDown && (
                                        <DropDownMenu isDropDown={isDropDown} ref={menuRef}>
                                            <li onClick={onTogglePlannerInfoModal}>플래너 정보 수정</li>
                                            <li onClick={onClickEditPlanner}>플래너 루트 수정</li>
                                            <li onClick={onToggleMemberModal}>멤버 관리</li>
                                            <li onClick={handleToggleDeleteModal}>플래너 삭제</li>
                                        </DropDownMenu>
                                    )}
                                </MenuBox>
                            )}
                        </InfoHeader>
                        <FlexBox>
                            <InfoMap
                                planner={planner}
                                plannerData={plannerData}
                                accountId={accountId}
                                allSchedule={allSchedule}
                                // mapRef={mapRef}
                                loading={loading}
                                onToggleLikePlanner={handleToggleLikePlanner}
                                // onClickToggleMapSchedule={onClickToggleMapSchedule}
                                onClickToggleScheduleView={onClickToggleScheduleView}
                            />
                            <InfoRoute
                                planner={planner}
                                plannerData={plannerData}
                                drag={drag}
                                onChangeCurPlanId={onChangeCurPlanId}
                                onClickToggleScheduleView={onClickToggleScheduleView}
                            />
                        </FlexBox>
                    </>
                )}
            </Container>
            <InfoMenu planner={planner} loading={loading} />
            <ErrorModal
                errorState={plannerError && typeof plannerError === 'string'}
                errorMessage={plannerError}
                onCloseError={onCloseError}
            />
            <ErrorModal
                errorState={likePlannerModal}
                onCloseError={handleConfirmModal}
                errorMessage="로그인이 필요합니다!"
            />
            <Modal
                modalVisible={isDeleteModal}
                title="플래너 삭제"
                onModalClose={handleToggleDeleteModal}
                onModalCancle={handleToggleDeleteModal}
                onModalConfirm={onDeletePlanner}
                modalCancleText="아니오"
                modalConfirmText="예"
                loading={loading.deletePlannerLoading}
            >
                "정말로 삭제하시겠습니까?"
            </Modal>
        </PlannerInfoBlock>
    );
};

export default PlannerInfo;
