import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const AuthTemplate = ({ children }) => {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>;
};

export default AuthTemplate;
