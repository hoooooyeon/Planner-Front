import styled from 'styled-components';

const EditRouteListBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
`;

const RouteLine = styled.div`
    background-color: #cdd9ac;
    width: 0.2rem;
    height: 153px;
    position: absolute;
    top: -10px;
`;

const RouteItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    &:nth-child(1) {
        select {
            display: none;
        }
    }
`;

const TransItem = styled.select`
    border-radius: 0.5rem;
    border: 0.2rem solid #cdd9ac;
    width: 80px;
    height: 40px;
    z-index: 1;
    &:invalid {
        color: lightgray;
    }
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
`;

const SpotItem = styled.div`
    border: 0.2rem solid #cdd9ac;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 290px;
    height: 90px;
    margin: 0.5rem 0;
    background-color: white;
    z-index: 99;
`;

const Img = styled.div`
    border-radius: 5%;
    border: 1px solid gray;
    width: 80px;
    height: 80px;
`;

const Name = styled.div`
    width: 120px;
    height: 2.4em;
    overflow-y: auto;
    white-space: wrap;
    line-height: 1.2;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 0.5rem;
    background-color: #9aad67;
    color: white;
    width: 4rem;
    height: 2rem;
    cursor: pointer;
`;

const EditRouteList = () => {
    const TOTAL = [0, 1, 2];

    return (
        <EditRouteListBlock>
            {TOTAL.map((i) => {
                return (
                    <RouteItem key={i}>
                        <RouteLine />
                        <TransItem required>
                            <option value="" disabled selected>
                                선택
                            </option>
                            <option value="plane">비행기</option>
                            <option value="train">기차</option>
                            <option value="bus">버스</option>
                            <option value="taxi">택시</option>
                            <option value="bicycle">오토바이</option>
                            <option value="walking">도보</option>
                        </TransItem>
                        <SpotItem>
                            <Img />
                            <Name>천안 사거리</Name>
                            <Button>삭제</Button>
                        </SpotItem>
                    </RouteItem>
                );
            })}
        </EditRouteListBlock>
    );
};

export default EditRouteList;
