import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';
import PlannerSelectModal from './PlannerSelectModal';
import { useState } from 'react';
import Loading from '../common/Loading';
import { isEmpty } from '../../lib/utils/objectEmptyCheck';

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    margin: 0.625rem;

    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }

    @media screen and (max-width: 480px) {
        flex-direction: column;

        img {
            width: 50%;
            height: 50%;
        }
    }
`;

const SelectMessage = styled.b`
    width: 100%;
    padding: ${(props) => (props.viewMode ? '0px 0px' : '50px 40px')};
`;

const Image = styled.img`
    padding: 0.625rem;
    width: 6.25rem;
    height: 5rem;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0.625rem;

    p {
        margin: 5px 0px;
    }
`;

const PlannerInfo = ({
    loading,
    viewMode,
    selectPlanner,
    plannerList,
    onPlannerListLoad,
    onPlannerChange,
    onPlannerInfoClick,
}) => {
    const [modal, setModal] = useState(false);

    const handlePlannerSelectClick = () => {
        if (viewMode) {
            onPlannerInfoClick(selectPlanner.plannerId);
        } else {
            setModal(true);
        }
    };

    const handleModalClose = () => {
        setModal(false);
    };

    const handleModalConfirm = (planner) => {
        onPlannerChange(planner);
        setModal(false);
    };

    if (loading.plannerLoading && !selectPlanner) {
        return (
            <InfoBox>
                <Loading />
            </InfoBox>
        );
    }

    return (
        <>
            <InfoBox onClick={handlePlannerSelectClick}>
                {!isEmpty(selectPlanner) ? (
                    <>
                        <Image src={tempImage} />
                        <FlexBox>
                            <p>제목: {selectPlanner.title}</p>
                            <p>생성자: {selectPlanner.creator}</p>
                            <p>여행비용: {selectPlanner.expense}</p>
                        </FlexBox>
                    </>
                ) : (
                    <SelectMessage viewMode={viewMode} onClick={handlePlannerSelectClick}>
                        {viewMode ? '선택한 플래너가 없습니다.' : '플래너를 선택해주세요.'}
                    </SelectMessage>
                )}
            </InfoBox>

            {
                /* 플래너 선택 모달에서는 로딩을 추가적으로 가져와야함 */
                viewMode || (
                    <PlannerSelectModal
                        modalVisible={modal}
                        onModalClose={handleModalClose}
                        onModalConfirm={handleModalConfirm}
                        loading={loading}
                        plannerList={plannerList}
                        onPlannerListLoad={onPlannerListLoad}
                    />
                )
            }
        </>
    );
};

export default PlannerInfo;
