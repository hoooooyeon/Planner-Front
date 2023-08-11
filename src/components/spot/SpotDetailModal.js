import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Modal from '../common/Modal';

const DetailModalBlock = styled.div`
    width: 50rem;
    height: 20rem;
    background-color: var(--md-sys-color-surface);
    border-radius: 0.5rem;
    display: flex;
    position: relative;
    padding: 2rem;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
`;

const ImgBox = styled.div`
    border-radius: 0.5rem;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 41%;
    width: 40%;
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
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
    line-height: 1.3rem;
    margin-right: 1rem;
    font-size: 0.8rem;
    white-space: nowrap;
    color: var(--md-sys-color-secondary);
`;
const Title = styled.div`
    width: 100%;
    height: 2rem;
    border: none;
    padding: 0 0.5rem;
    font-size: 0.9rem;
`;
const Addr = styled.div`
    width: 100%;
    height: 2rem;
    border: none;
    padding: 0 0.5rem;
    font-size: 0.9rem;
`;
const Overview = styled.div`
    width: 100%;
    height: 15.5rem;
    border: none;
    padding: 0 0.5rem;
    overflow: auto;
    font-size: 0.9rem;
`;

const LikeBox = styled.div`
    box-shadow: 0px 1px 3px -2px var(--md-sys-color-shadow);
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
    background-color: ${(props) => (props.like ? `var(--md-sys-color-primary)` : `var(--md-sys-color-background)`)};
    color: ${(props) =>
        props.like ? `var(--md-sys-color-primary-container)` : `var(--md-sys-color-on-primary-container)`};
    &:hover {
        box-shadow: 0px 1px 6px -2px var(--md-sys-color-shadow);
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) =>
        props.like ? `var(--md-sys-color-primary-container)` : `var(--md-sys-color-on-primary-container)`};
`;

const SpotDetailModal = ({ spotData, detail, onResetDetailSpot, onToggleDetailLike }) => {
    const { title, image, overview, addr1, likeCount, likeState } = { ...detail };
    const { contentId } = { ...spotData };

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
            <DetailModalBlock>
                <ImgBox>
                    <Img src={image} alt={title} />
                </ImgBox>
                <InfoBox>
                    <LikeBox onClick={onToggleDetailLike} like={likeState ? likeState.toString() : undefined}>
                        <StyledFontAwesomeIcon icon={faStar} like={likeState ? likeState.toString() : undefined} />
                        <div>{likeCount}</div>
                    </LikeBox>
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
        </Modal>
    );
};

export default SpotDetailModal;
