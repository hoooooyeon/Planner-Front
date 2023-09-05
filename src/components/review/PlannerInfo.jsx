import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';
import PlannerSelectModal from './PlannerSelectModal';
import { useState } from 'react';
import Loading from '../common/Loading';

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    //border: 1px solid silver;
    border-radius: 6px;
    margin: 10px;

    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }
`;

const SelectMessage = styled.b`
    width: 100%;
    padding: ${(props) => (props.viewMode ? '0px 0px' : '50px 40px')};
`;

const Image = styled.img`
    padding: 10px;
    width: 100px;
    height: 80px;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    //color: white;

    b {
        display: block;
    }
`;

const PlannerInfo = ({ loading, viewMode, selectPlanner, plannerList, onPlannerListLoad, onPlannerChange }) => {
    const [modal, setModal] = useState(false);

    const handlePlannerSelectClick = () => {
        setModal(true);
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleModalConfirm = (planner) => {
        onPlannerChange(planner);
        setModal(false);
    };

    if (loading && viewMode && !selectPlanner) {
        return (
            <InfoBox>
                <Loading />
            </InfoBox>
        );
    }

    return (
        <>
            <InfoBox onClick={handlePlannerSelectClick}>
                {selectPlanner ? (
                    <>
                        <Image src={tempImage} />
                        <FlexBox>
                            <b>제목: {selectPlanner.title}</b>
                            <b>생성자: {selectPlanner.creator}</b>
                            <b>여행비용: {selectPlanner.expense}</b>
                        </FlexBox>
                    </>
                ) : (
                    <SelectMessage viewMode={viewMode} onClick={handlePlannerSelectClick}>
                        {viewMode ? '선택한 플래너가 없습니다.' : '플래너를 선택해주세요.'}
                    </SelectMessage>
                )}
            </InfoBox>

            {viewMode || (
                <PlannerSelectModal
                    modalVisible={modal}
                    onModalClose={handleModalClose}
                    onModalConfirm={handleModalConfirm}
                    loading={loading}
                    plannerList={plannerList}
                    onPlannerListLoad={onPlannerListLoad}
                />
            )}
        </>
    );
};

export default PlannerInfo;
