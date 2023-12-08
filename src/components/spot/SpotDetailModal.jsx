import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from '../common/Modal';
import { replaceImageOnError } from '../../lib/utils/imageReplace';
import errorImg from '../../lib/images/spotErrorImg.jpg';
import { useState } from 'react';
import ErrorModal from '../common/ErrorModal';
import Loading from '../common/Loading';

const DetailModalBlock = styled.div`
    max-width: 50rem;
    min-width: 40rem;
    height: 20rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 0.5rem;
    display: flex;
    position: relative;
    padding: 2rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    @media all and (max-width: 480px) {
        flex-direction: column;
        max-width: 20rem;
        min-width: 20rem;
        height: 25rem;
        align-items: center;
    }
    @media all and (min-width: 481px) and (max-width: 768px) {
        min-width: 20rem;
        height: 15rem;
    }
`;

const ImgBox = styled.div`
    border-radius: 0.5rem;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 40%;
    width: 40%;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    @media all and (max-width: 480px) {
        height: 13rem;
        width: 80%;
        margin: 1rem 0;
    }
    @media all and (min-width: 481px) and (max-width: 768px) {
        padding-top: 37%;
    }
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
    @media all and (max-width: 480px) {
        width: 100%;
        margin-left: 0;
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
    line-height: 1.3rem;
    margin-right: 1rem;
    font-size: 0.8rem;
    white-space: nowrap;
    color: ${(props) => props.theme.tertiaryColor};
    @media all and (max-width: 768px) {
        height: 1rem;
    }
`;
const Title = styled.div`
    width: 70%;
    height: 2rem;
    border: none;
    padding: 0 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media all and (max-width: 768px) {
        height: 1.3rem;
    }
`;
const Addr = styled.div`
    width: 100%;
    height: 2rem;
    border: none;
    padding: 0 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media all and (max-width: 768px) {
        height: 1.3rem;
    }
`;
const Overview = styled.div`
    width: 100%;
    height: 15.5rem;
    border: none;
    padding: 0 0.5rem;
    overflow: auto;
    font-size: 0.9rem;
    @media all and (max-width: 480px) {
        height: 9.5rem;
    }
    @media all and (min-width: 481px) and (max-width: 768px) {
        height: 11.5rem;
    }
`;

const LikeBox = styled.div`
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    height: 1rem;
    position: absolute;
    top: 9px;
    right: 8px;
    cursor: pointer;
    div {
        margin-left: 5px;
    }
    background-color: ${(props) =>
        props.like ? `${props.theme.clickedButtonBackgroundColor}` : `${props.theme.secondaryBackgroundColor}`};
    color: ${(props) => (props.like ? `${props.theme.likeButtonColor}` : `${props.theme.secondaryColor}`)};
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? `${props.theme.likeButtonColor}` : `${props.theme.secondaryColor}`)};
`;

const ErrorText = styled.b`
    font-size: 0.8rem;
    color: ${(props) => props.theme.errorColor};
    margin: 3px 0px;
    display: flex;
    justify-content: center;
`;

const SpotDetailModal = ({
    accountId,
    spotData,
    spotError,
    detail,
    loading,
    onResetDetailSpot,
    onToggleDetailLike,
}) => {
    const { title, image, overview, addr1, likeCount, likeState } = { ...detail };
    const { contentId } = { ...spotData };
    const [likeSpotModal, setLikeSpotModal] = useState(false);
    const { detailSpotLoading, addSpotLikeLoading, removeSpotLikeLoading } = { ...loading };

    const handletoggleLikeSpot = () => {
        if (accountId) {
            onToggleDetailLike();
        } else {
            setLikeSpotModal(true);
        }
    };

    const handleConfirmModal = () => {
        setLikeSpotModal(false);
    };

    return (
        <Modal
            modalVisible={contentId}
            title="여행지 상세정보"
            onModalClose={() => {
                onResetDetailSpot();
            }}
            onModalConfirm={() => {
                onResetDetailSpot();
            }}
        >
            {detailSpotLoading ? (
                <DetailModalBlock>
                    <Loading pos="center" />
                </DetailModalBlock>
            ) : (
                <DetailModalBlock>
                    <ImgBox>
                        <Img src={image} alt={title} onError={(e) => replaceImageOnError(e, 'spot')} />
                    </ImgBox>
                    <InfoBox>
                        {likeCount >= 0 && (
                            <LikeBox onClick={handletoggleLikeSpot} like={likeState ? likeState.toString() : undefined}>
                                {addSpotLikeLoading || removeSpotLikeLoading ? (
                                    <Loading size="small" />
                                ) : (
                                    <>
                                        <StyledFontAwesomeIcon
                                            icon={faStar}
                                            like={likeState ? likeState.toString() : undefined}
                                        />
                                        <div>{likeCount}</div>
                                    </>
                                )}
                            </LikeBox>
                        )}
                        {spotError && <ErrorText>{spotError.detailError}</ErrorText>}
                        <FlexDiv>
                            <Label>이름</Label>
                            <Title>{title}</Title>
                        </FlexDiv>
                        <FlexDiv>
                            <Label>주소</Label>
                            <Addr>{addr1}</Addr>
                        </FlexDiv>
                        <FlexDiv>
                            <Label>설명</Label>
                            <Overview>{overview}</Overview>
                        </FlexDiv>
                    </InfoBox>
                </DetailModalBlock>
            )}
            <ErrorModal
                errorState={likeSpotModal}
                onCloseError={handleConfirmModal}
                errorMessage="로그인이 필요합니다!"
            />
        </Modal>
    );
};

export default SpotDetailModal;
