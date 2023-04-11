import Modal from '../common/Modal';
import styled from 'styled-components';

const InfoForm = styled.form`
    padding: 10px 15px;
    width: calc(100% - 30px);
    display: flex;
    flex-direction: column;
    background-color: #cdd9ac;
    input::placeholder {
        color: lightgray;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const Title = styled.input`
    height: 40px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
`;
const FlexDiv = styled.div`
    display: flex;
    height: 100%;
    justify-content: space-between;
`;

const Funds = styled.input`
    width: 90px;
    height: 30px;
    border: none;
    border-radius: 10px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
`;

const People = styled.input`
    width: 35px;
    height: 30px;
    border: none;
    border-radius: 10px;
    padding: 0 10px;

    &:focus {
        outline: none;
    }
`;

const Category = styled.select`
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
    text-align: center;
    &:invalid {
        color: lightgray;
    }
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
`;

const PlannerInfoModal = ({ planner, modal, onLoadPlanner, onUpdatePlanner, onChangePlannerExpense, onChangePlannerMemberCategory, onChangePlannerMemberCount, onChangePlannerTitle, onTogglePlannerInfoModal }) => {
    // const onEditPost = async () => {
    //     setIsEdit(false);
    //     const update = () => {
    //         onUpdateMemo(curMemo.memoId);
    //     };
    //     const load = () => {
    //         onLoadPlanner();
    //     };
    //     await update();
    //     await load();
    // };

    const categoryList = [
        {
            value: '혼자',
            key: 'alone',
        },
        { value: '연인', key: 'couple' },
        { value: '친구', key: 'friend' },
        { value: '가족', key: 'family' },
    ];

    const { title, expense, memberCount, memberTypeId } = { ...planner };

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <Modal
            modalVisible={modal.plannerInfo}
            title="플래너 정보"
            onModalClose={onTogglePlannerInfoModal}
            onModalConfirm={() => {
                onUpdatePlanner();
                onTogglePlannerInfoModal();
                // onLoadPlanner();
            }}
        >
            <InfoForm>
                <Title
                    placeholder="플래너 이름"
                    type="text"
                    onChange={(e) => {
                        onChangePlannerTitle(e.target.value);
                    }}
                    value={title}
                />
                <FlexDiv>
                    <Funds
                        placeholder="여행 자금"
                        type="number"
                        onChange={(e) => {
                            onChangePlannerExpense(e.target.value);
                        }}
                    >
                        {/* {expense || null} */}
                    </Funds>
                    <People
                        placeholder="인원"
                        type="number"
                        onChange={(e) => {
                            onChangePlannerMemberCount(e.target.value);
                        }}
                    >
                        {/* {memberCount || null} */}
                    </People>
                    <Category
                        required
                        defaultValue=""
                        onChange={(e) => {
                            // onChangePlannerMemberCategory(1);
                            // onChangePlannerMemberCategory(e.target.value);
                        }}
                    >
                        <option value="" disabled>
                            선택
                        </option>
                        {categoryList.map((item) => (
                            <option value={item.value} key={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </Category>
                </FlexDiv>
            </InfoForm>
        </Modal>
    );
};

export default PlannerInfoModal;
