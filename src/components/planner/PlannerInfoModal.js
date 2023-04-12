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
        { label: '혼자', value: 0 },
        { label: '연인', value: 1 },
        { label: '친구', value: 2 },
        { label: '가족', value: 3 },
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
                        value={expense}
                        onChange={(e) => {
                            onChangePlannerExpense(e.target.value);
                        }}
                    ></Funds>
                    <People
                        placeholder="인원"
                        type="number"
                        value={memberCount}
                        onChange={(e) => {
                            onChangePlannerMemberCount(e.target.value);
                        }}
                    ></People>
                    <Category
                        required
                        value={memberTypeId}
                        onChange={(e) => {
                            onChangePlannerMemberCategory(e.target.value);
                        }}
                    >
                        {categoryList.map((c) => (
                            <option value={c.value} key={c.value}>
                                {c.label}
                            </option>
                        ))}
                    </Category>
                </FlexDiv>
            </InfoForm>
        </Modal>
    );
};

export default PlannerInfoModal;
