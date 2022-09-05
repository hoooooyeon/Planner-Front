import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  background-color: white;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60rem;
  height: 35rem;
  display: flex;
`;

const Img = styled.div`
  border: 1px solid red;
  width: 30rem;
  height: 35rem;
`;

const Title = styled.div`
  border: 1px solid blue;
  width: 30rem;
  height: 5rem;
  text-align: center;
  font-size: 1.5rem;
  line-height: 5rem;
`;
const Detail = styled.div`
  border: 1px solid green;
  width: 28rem;
  height: 28rem;
  padding: 1rem;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
  float: right;
`;
const SpotModal = ({ showModal, modalToggle }) => {
  return (
    <>
      {showModal ? (
        <Background onClick={modalToggle}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <Img />
            <div>
              <StyledFontAwesomeIcon icon={faXmark} onClick={modalToggle} />
              <Title>천안 바닷가</Title>
              <Detail>
                천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요
                천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요천안바다가래요
              </Detail>
            </div>
          </ModalContainer>
        </Background>
      ) : null}
    </>
  );
};

export default SpotModal;
