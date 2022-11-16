import styled from 'styled-components';

const HomeShareBlock = styled.div`
  border: 1px solid red;
  width: calc(100% - 40px);
  height: 100%;
  margin-top: 50px;
  padding: 0 20px;
`;

const ShareList = styled.div`
  border: 1px solid blue;
  width: 100%;
  height: 100%;
  display: flex;
`;

const ShareItem = styled.div`
  border: 1px solid green;
  width: 24%;
  height: 150px;
`;

const HomeShare = () => {
  return (
    <HomeShareBlock>
      <h3>사용자들의 플래너</h3>
      <ShareList>
        <ShareItem />
        <ShareItem />
        <ShareItem />
        <ShareItem />
      </ShareList>
    </HomeShareBlock>
  );
};

export default HomeShare;
