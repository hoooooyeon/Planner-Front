import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import Modal from '../common/Modal';

const DetailModalBlock = styled.div`
    width: 50rem;
    height: 20rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    position: relative;
    padding: 2rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const ImgBox = styled.div`
    border-radius: 0.5rem;
    background-color: lightgray;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 41%;
    width: 40%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0.5rem;
    object-fit: cover;
`;

const InfoBox = styled.div`
    margin-left: 2rem;
    width: 56%;
    height: 100%;
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
    color: gray;
    margin-right: 1rem;
    font-size: 0.8rem;
    white-space: nowrap;
`;
const Title = styled.div`
    width: 100%;
    height: 2rem;
    border: none;
    padding: 0 0.5rem;
`;
const Addr = styled.div`
    width: 100%;
    height: 2rem;
    border: none;
    padding: 0 0.5rem;
`;
const Overview = styled.div`
    width: 100%;
    height: 15.5rem;
    border: none;
    padding: 0 0.5rem;
    overflow: auto;
`;

const LikeBox = styled.div`
    background-color: lightgray;
    color: white;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    height: 1rem;
    cursor: pointer;
    ${(props) =>
        props.like &&
        css`
            background-color: #f1eee0;
            color: #ef9a9a;
        `}
    div {
        margin-left: 5px;
    }
`;

const SpotDetailModal = ({ spotModal, detail, onResetDetailSpot, onToggleSpotDetailModal, onToggleSpotLike }) => {
    const { title, firstimage, overview, contentid, likeCount, likeState } = { ...detail };

    // 모달 외부 스크롤 고정
    // useEffect(() => {
    //     document.body.style.cssText = `
    //     position: fixed;
    //     top: -${window.scrollY}px;
    //     overflow-y: scroll;
    //     width: 100%;`;
    //     return () => {
    //         const scrollY = document.body.style.top;
    //         document.body.style.cssText = '';
    //         window.scrollTo(0, parseInt(scrollY) * -1);
    //     };
    // }, []);

    return (
        <Modal
            modalVisible={spotModal}
            title="여행지 상세정보"
            onModalClose={() => {
                onToggleSpotDetailModal();
                onResetDetailSpot();
            }}
            onModalConfirm={() => {
                onToggleSpotDetailModal();
                onResetDetailSpot();
            }}
        >
            <DetailModalBlock>
                <ImgBox>
                    <Img src={firstimage} alt={title} />
                </ImgBox>
                <InfoBox>
                    <FlexDiv>
                        <Label>이름</Label>
                        <Title>{title}</Title>
                    </FlexDiv>
                    <FlexDiv>
                        <Label>주소</Label>

                        <Addr>aaaaa</Addr>
                    </FlexDiv>
                    <FlexDiv>
                        <Label>설명 글</Label>

                        <Overview>{overview}</Overview>
                    </FlexDiv>
                </InfoBox>
            </DetailModalBlock>
        </Modal>
        // <>
        //     {detail && (
        //         <Background onClick={onResetDetailSpot}>
        //             <ModalContainer onClick={(e) => e.stopPropagation()}>
        //                 <Img src={firstimage} alt={title}  />
        //                 <Info>
        //                     <CloseButton>
        //                         <FontAwesomeIcon icon={faXmark} onClick={onResetDetailSpot} />
        //                     </CloseButton>
        //                     <InfoHeader>
        //                         <Title>{title}</Title>
        //                         <LikeBox
        //                             like={likeState}
        //                             onClick={() => {
        //                                 onToggleSpotLike(contentid);
        //                             }}
        //                         >
        //                             <FontAwesomeIcon icon={faStar} />
        //                             <div>{likeCount}</div>
        //                         </LikeBox>
        //                     </InfoHeader>
        //                     <Detail>{overview}</Detail>
        //                 </Info>
        //             </ModalContainer>
        //         </Background>
        //     )}
        // </>
    );
};

export default SpotDetailModal;
