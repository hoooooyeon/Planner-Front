import { useRef } from 'react';
import styled from 'styled-components';
import Slider from '../../common/Slider';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import errorImg from '../../../lib/images/plannerErrorImg.png';
import Empty from '../../common/Empty';
import ErrorModal from '../../common/ErrorModal';
import Loading from '../../common/Loading';
import { useState } from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyPlannerListBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
`;

const Container = styled.div`
    padding: 1rem;
    margin: 0 auto;
    min-height: 17rem;
    @media all and (min-width: 769px) {
        padding: 1rem 9rem;
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderTitle = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
`;

const Button = styled.button`
    width: 7rem;
    height: 3rem;
    cursor: pointer;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
    line-height: 3rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    &:hover {
        color: ${(props) => props.theme.hoverColor};
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const PlannerList = styled.ul`
    width: 100%;
    height: 100%;
    min-height: 15rem;
    display: flex;
    margin: 0 auto;
    padding: 0.5rem 0;
    box-sizing: border-box;
    @media all and (min-width: 769px) {
        min-height: 16rem;
    }
`;

const PlannerItem = styled.li`
    flex-shrink: 0;
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    float: left;
    position: relative;
    margin: 5px;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    cursor: pointer;
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
        transition: transform 0.3s ease;
        transform: translate(0, -5px);
    }
`;
const InfoBox = styled.div`
    height: 3rem;
    margin: 0;
    padding: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 0.5rem;
`;
const Title = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
    overflow: hidden;
`;
const Creator = styled.div`
    font-size: 0.8rem;
    color: ${(props) => props.theme.tertiaryColor};
    overflow: hidden;
    margin-top: 0.2rem;
`;
const Date = styled.div`
    font-size: 0.7rem;
    color: ${(props) => props.theme.tertiaryColor};
    margin-top: 0.2rem;
    overflow: hidden;
`;

const ImgBox = styled.div`
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 90%;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
    @media all and (max-width: 768px) {
        padding-top: 75%;
    }
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
    display: block;
    -webkit-user-drag: none;
    object-fit: cover;
`;

const CenterDiv = styled.div`
    height: 10rem;
`;

const GuideList = styled.ul`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    padding: 0.2rem 0.5rem;
    li + li {
        margin-left: 0.5rem;
    }
    @media all and (min-width: 769px) {
        margin: 10px auto 0;
    }
`;

const CircleIcon = styled(FontAwesomeIcon)`
    color: rgba(255, 255, 255, 0.6);
    width: 0.8rem;
    height: 0.8rem;
    cursor: pointer;
    &[aria-current] {
        color: ${(props) => props.theme.clickedButtonBackgroundColor};
    }
`;

const MyPlannerList = ({
    accountId,
    myPlannerList,
    accountError,
    loading,
    onCloseError,
    onCreatePlanner,
    onClickPlanner,
    onPreviousPage,
    onNextPage,
    onChangePage,
    drag,
}) => {
    const itemRef = useRef();
    const [createPlannerModal, setCreatePlannerModal] = useState(false);
    const { list, totalCount, pageIndex } = { ...myPlannerList };

    const handlecreatePlanner = () => {
        if (accountId) {
            onCreatePlanner();
        } else {
            setCreatePlannerModal(true);
        }
    };

    const handleConfirmModal = () => {
        setCreatePlannerModal(false);
    };

    return (
        <MyPlannerListBlock>
            <Container>
                <Header>
                    <HeaderTitle>나의 플래너</HeaderTitle>
                    <Button onClick={handlecreatePlanner}>
                        {loading.createPlannerLoading ? <Loading size="small" /> : <>플래너 생성</>}
                    </Button>
                </Header>
                {loading.myPlannersLoading ? (
                    <CenterDiv>
                        <Loading pos="center" />
                    </CenterDiv>
                ) : Object.keys(myPlannerList).length > 0 && list.length > 0 ? (
                    <>
                        <Slider
                            list={list}
                            itemRef={itemRef}
                            drag={drag}
                            page={true}
                            prevPage={onPreviousPage}
                            nextPage={onNextPage}
                        >
                            <PlannerList>
                                {list.map((p) => (
                                    <PlannerItem
                                        key={p.plannerId}
                                        ref={itemRef}
                                        onClick={() => {
                                            onClickPlanner(p.plannerId);
                                        }}
                                    >
                                        <ImgBox>
                                            <Img
                                                src={p.thumbnail}
                                                alt={p.title}
                                                onError={(e) => {
                                                    handleErrorImg({ e, errorImg });
                                                }}
                                            />
                                        </ImgBox>
                                        <InfoBox>
                                            <Title>{p.title}</Title>
                                            <Creator>{p.creator}</Creator>
                                            <Date>
                                                {p.planDateStart} ~ {p.planDateEnd}
                                            </Date>
                                        </InfoBox>
                                    </PlannerItem>
                                ))}
                            </PlannerList>
                        </Slider>
                        <GuideList>
                            {Object.keys(myPlannerList).length > 0 &&
                                Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => i).map((_, i) => (
                                    <li key={i} onClick={() => onChangePage(i + 1)}>
                                        <CircleIcon icon={faCircle} aria-current={pageIndex === i + 1 ? 'cur' : null} />
                                    </li>
                                ))}
                        </GuideList>
                    </>
                ) : (
                    <CenterDiv>
                        <Empty text="플래너" />
                    </CenterDiv>
                )}
            </Container>
            {accountError && typeof accountError === 'string' && (
                <ErrorModal errorState={accountError} errorMessage={accountError} onCloseError={onCloseError} />
            )}
            <ErrorModal
                errorState={createPlannerModal}
                onCloseError={handleConfirmModal}
                errorMessage="로그인이 필요합니다!"
            />
        </MyPlannerListBlock>
    );
};

export default MyPlannerList;
