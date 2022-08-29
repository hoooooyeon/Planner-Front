import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 180px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AuthTemplate = ({ children }) => {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>;
};

export default AuthTemplate;
