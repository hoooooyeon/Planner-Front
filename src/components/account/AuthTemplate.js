import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 170px;
`;

const AuthTemplate = ({ children }) => {
  return <AuthTemplateBlock>{children}</AuthTemplateBlock>;
};

export default AuthTemplate;
