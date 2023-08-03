import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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
    line-height: 1.3rem;

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
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
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
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'lightgray')};
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
                    <LikeBox onClick={onToggleDetailLike}>
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