import { useState } from 'react';
import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';
import Modal from '../common/Modal';
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

const ReviewInfo = ({ plannerList, onPlannerListLoad, onPlannerSelect }) => {
    const [modal, setModal] = useState(false);
    const [selectPlannerInfo, setSelectPlannerInfo] = useState({ type: 'myPlanner', selectId: 0 });
    const [info, setInfo] = useState(null);
    const tabMenu = [
        { type: 'myPlanner', title: '나의 플래너' },
        { type: 'likePlanner', title: '좋아요 플래너' },
    ];

    const onAdd = () => {
        setModal(true);
    };

    const onSelectPlanner = (type, selectId) => {
        setSelectPlannerInfo({ type, selectId });
    };

    const onModalClose = () => {
        setModal(false);
    };

    const onModalConfirm = () => {
        const { type, selectId } = selectPlannerInfo;
        setModal(false);
        if (type && selectId > 0) {
            setInfo(plannerList[type].find((item) => item.plannerId == selectId));
        }
        onPlannerSelect(selectId);
    };

    return (
        <ReviewInfoBox>
            <InfoBox>
                <PlannerInfo info={info} />
            </InfoBox>
            <button onClick={onAdd}>추가하기</button>
            <Modal modalVisible={modal} title="플래너 선택" onModalClose={onModalClose} onModalConfirm={onModalConfirm} modalConfirmText="선택">
                <PlannerTabs tabMenu={tabMenu} plannerList={plannerList} onPlannerListLoad={onPlannerListLoad} onSelectPlanner={onSelectPlanner} />
            </Modal>
        </ReviewInfoBox>
    );
};

export default ReviewInfo;
