import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  /* height: auto;
  min-height: 100%;
  padding-bottom: 170px; */
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AuthTemplate = ({ children }) => {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>;
};

export default AuthTemplate;
