import { useEffect, useState } from 'react';
import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';
import Modal from '../common/Modal';
import Tab, { TabContent } from './Tab/Tab';
import PlannerInfo from './PlannerInfo';
import PlannerTabs from './PlannerTabs';
import PlannerList from './PlannerList';
import Loading from '../common/Loading';

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid silver;
    border-radius: 6px;
    //margin: 10px 0px;
`;

const AddButton = styled.button`
    margin: 0px 10px;
    width: 100px;
    height: 48px;
    border-radius: 6px;
    color: ${(props) => props.primaryColor};
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const tabItems = [
    { id: 0, type: 'myPlannerList', title: '나의 플래너' },
    { id: 1, type: 'likePlannerList', title: '좋아요 플래너' },
];

const PlannerSelectModal = ({
    modalVisible,
    onModalClose,
    onModalConfirm,
    loading,
    plannerList,
    onPlannerListLoad,
}) => {
    const [selectTab, setSelectTab] = useState(0);
    const [planner, setPlanner] = useState({});

    const list = plannerList[tabItems[selectTab].type];

    const handleChangeTab = (item) => {
        setSelectTab(item.id);
        onPlannerListLoad(item.type);
    };

    const handleSelectPlanner = (selectPlanner) => {
        setPlanner(selectPlanner);
    };

    const handleModalConfirm = () => {
        onModalConfirm(planner);
    };

    useEffect(() => {
        if (modalVisible) {
            onPlannerListLoad(tabItems[selectTab].type);
        }
    }, [modalVisible]);

    return (
        <Modal
            modalVisible={modalVisible}
            title="플래너 선택"
            onModalClose={onModalClose}
            onModalConfirm={handleModalConfirm}
            modalConfirmText="선택"
        >
            <Tab tabItems={tabItems} selectTab={selectTab} onChangeTab={handleChangeTab}>
                <TabContent index={0} selectTab={selectTab}>
                    <PlannerList
                        loading={loading}
                        type={tabItems[selectTab]}
                        plannerList={list}
                        onItemClick={handleSelectPlanner}
                    />
                </TabContent>
                <TabContent index={1} selectTab={selectTab}>
                    <PlannerList
                        loading={loading}
                        type={tabItems[selectTab]}
                        plannerList={list}
                        onItemClick={handleSelectPlanner}
                    />
                </TabContent>
            </Tab>
        </Modal>
    );
};

export default PlannerSelectModal;
