import Modal from '../../common/Modal';
import styled from 'styled-components';

const DetailBox = styled.div`
    border: 1px solid red;
`;

const Title = styled.div`
    width: 3rem;
    height: 1rem;
`;

const Img = styled.img`
    width: 3rem;
    height: 3rem;
`;

const Overview = styled.div`
    width: 10rem;
    height: 5rem;
`;

const EditListDetailModal = ({ detail, onCloseDetail }) => {
    const { title, firstimage, overview } = detail;
    return (
        <Modal modalVisible={detail} onModalClose={onCloseDetail} title="여행지 상세정보">
            <DetailBox>
                <Title>{title}</Title>
                <Img src={firstimage} alt={title} />
                <Overview>{overview}</Overview>
            </DetailBox>
        </Modal>
    );
};

export default EditListDetailModal;
