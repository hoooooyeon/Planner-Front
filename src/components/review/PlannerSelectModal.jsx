import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import PlannerList from './PlannerList';
import Tab, { TabContent } from './Tab/Tab';

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
            onModalCancle={onModalClose}
            onModalConfirm={handleModalConfirm}
            modalConfirmText="선택"
        >
            <Tab tabItems={tabItems} selectTab={selectTab} onChangeTab={handleChangeTab}>
                <TabContent index={0} selectTab={selectTab}>
                    <PlannerList
                        loading={loading.myPlannerListLoading}
                        type={tabItems[selectTab]}
                        plannerList={list}
                        onItemClick={handleSelectPlanner}
                    />
                </TabContent>
                <TabContent index={1} selectTab={selectTab}>
                    <PlannerList
                        loading={loading.likePlannerListLoading}
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
