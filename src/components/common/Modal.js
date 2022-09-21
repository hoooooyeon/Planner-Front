import styled from "styled-components";

const Modalbackground = styled.div`
    position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;
`;

const ModalBox = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    /* z-index: 1;
    background-color: white;
    min-width: 250px;
    min-height: 450px;
    border-radius: 4px; */

`;

const Modal = () => {
    return (
        <Modalbackground>
        </Modalbackground>
    );
};

export default Modal;