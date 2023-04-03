import { useState } from 'react';
import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';
import Modal from '../common/Modal';
import Tab, { TabBox, TabContentBox, TabMenuBox, TabMenuItem } from '../common/Tab/Tabs';
import PlannerList from './PlannerList';
import PlannerInfo from './PlannerInfo';
import PlannerTabs from './PlannerTabs';

const ReviewInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid silver;
    border-radius: 6px;
    //margin: 10px 0px;

    button {
        margin: 0px 10px;
        width: 100px;
        height: 48px;
    }
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    //border: 1px solid silver;
    border-radius: 6px;
    margin: 10px;

    &:hover {
        background-color: #f2f2f2;
    }
`;

const ReviewInfo = ({ plannerList, onPlannerSelect }) => {
    const [modal, setModal] = useState(false);
    const [selectPlannerId, setSelectPlannerId] = useState(0);
    const [info, setInfo] = useState(null);
    const tabMenu = [
        { title: '나의 플래너', content: <PlannerList plannerList={plannerList} onItemClick={setSelectPlannerId} /> },
        { title: '좋아요 플래너', content: <PlannerList plannerList={plannerList} onItemClick={setSelectPlannerId} /> },
    ];

    const onAdd = () => {
        setModal(true);
    };

    // const onTabMenuClick = (index) => {
    //     setTabIndex(index);
    // };

    const onModalClose = () => {
        setModal(false);
    };

    const onModalConfirm = () => {
        setModal(false);
        if (selectPlannerId != 0) {
            setInfo(plannerList.find((item) => item.plannerId == selectPlannerId));
        }
        onPlannerSelect(selectPlannerId);
    };

    return (
        <ReviewInfoBox>
            <InfoBox>
                <PlannerInfo info={info} />
            </InfoBox>
            <button onClick={onAdd}>추가하기</button>
            <Modal modalVisible={modal} title="플래너 선택" onModalClose={onModalClose} onModalConfirm={onModalConfirm} modalConfirmText="선택">
                <PlannerTabs tabMenu={tabMenu} />
            </Modal>
        </ReviewInfoBox>
    );
};

export default ReviewInfo;
