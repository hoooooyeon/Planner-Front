import styled from 'styled-components';

const FooterBlock = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  /* transform: translateY(100%); */
  background-color: lightblue;
`;
const Logo = styled.div`
  font-size: 2rem;
  margin: 0 50px 0 10%;
`;

const Info = styled.div``;
const Footer = () => {
  return (
    <FooterBlock>
      <Logo>낭만닷컴</Logo>
      <Info>
        <p>Phone: 010-9412-4113, 010-7368-3401</p>
        <p>Email: BlueBear@gmail.com, lhy3476@gmail.com</p>
      </Info>
    </FooterBlock>
  );
};

export default Footer;
