import styled from 'styled-components';

const RouteTransportBlock = styled.div`
  width: 80px;
  margin: 10px auto;
`;

const StyledSelect = styled.select`
  border-radius: 5%;
  border: 1px solid lightblue;
  width: 80px;
  height: 40px;
  &:focus {
    border: 2px solid red;
  }
`;

const OPTIONS = [
  { value: 'plane', name: '비행기' },
  { value: 'train', name: '기차' },
  { value: 'bus', name: '버스' },
  { value: 'taxi', name: '택시' },
  { value: 'bicycle', name: '오토바이' },
  { value: 'personwalking', name: '걷기' },
];

const RouteTransport = () => {
  return (
    <RouteTransportBlock>
      <StyledSelect>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelect>
    </RouteTransportBlock>
  );
};

export default RouteTransport;
