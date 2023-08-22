import Modal from '../common/Modal';
import styled from 'styled-components';

const InfoForm = styled.form`
    width: 25rem;
    height: 10rem;
    display: flex;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    flex-direction: column;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 0.5rem;
    border-radius: 0.5rem;
    justify-content: center;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const FlexDiv = styled.div`
    display: flex;
    & + & {
        margin-top: 0.5rem;
    }
`;

const Label = styled.div`
    height: 2rem;
    line-height: 2rem;
    margin-right: 1rem;
    font-size: 0.8rem;
    white-space: nowrap;
`;

const Title = styled.input`
    width: 100%;
    height: 2rem;
    border: none;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
        outline: none;
    }
`;

const Funds = styled.input`
    width: 4rem;
    height: 2rem;
    border: none;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
        outline: none;
    }
`;

const People = styled.input`
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 0.3rem;
    padding: 0 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
        outline: none;
    }
`;

const Category = styled.select`
    width: 5rem;
    height: 2rem;
    border: none;
    border-radius: 0.3rem;
    text-align: center;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
`;

const PlannerInfoModal = ({
    modal,
    onUpdatePlanner,
    onTogglePlannerInfoModal,
    curTitle,
    curExpense,
    curMemberCount,
    curMemberTypeId,
    setCurTitle,
    setCurExpense,
    setCurMemberCount,
    setCurMemberTypeId,
}) => {
    const categoryList = [
        { label: '혼자', value: 1 },
        { label: '연인', value: 2 },
        { label: '친구', value: 3 },
        { label: '가족', value: 4 },
    ];

    return (
        <Modal
            modalVisible={modal.plannerInfo}
            title="플래너 정보"
            onModalClose={onTogglePlannerInfoModal}
            onModalConfirm={() => {
                onUpdatePlanner();
                onTogglePlannerInfoModal();
            }}
        >
            <InfoForm>
                <FlexDiv>
                    <Label>플래너 제목</Label>
                    <Title
                        placeholder="플래너 이름"
                        type="text"
                        onChange={(e) => {
                            setCurTitle(e.target.value);
                        }}
                        value={curTitle}
                    />
                </FlexDiv>
                <FlexDiv>
                    <Label>여행 비용</Label>
                    <Funds
                        placeholder="비용"
                        type="number"
                        value={curExpense}
                        onChange={(e) => {
                            setCurExpense(e.target.value);
                        }}
                    ></Funds>
                </FlexDiv>
                <FlexDiv>
                    <Label>여행 멤버 인원</Label>
                    <People
                        placeholder="인원"
                        type="number"
                        value={curMemberCount}
                        onChange={(e) => {
                            setCurMemberCount(e.target.value);
                        }}
                    ></People>
                </FlexDiv>
                <FlexDiv>
                    <Label>여행 멤버 유형</Label>
                    <Category
                        required
                        value={curMemberTypeId}
                        onChange={(e) => {
                            setCurMemberTypeId(e.target.value);
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
