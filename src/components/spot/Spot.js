import styled from 'styled-components';

const SpotBlock = styled.div`
  margin: 100px auto;
  width: 80%;
  height: auto;
  min-height: 100%;
  padding-bottom: 170px;
`;

const Spot = ({ children }) => {
  return <SpotBlock>{children}</SpotBlock>;
};

export default Spot;
