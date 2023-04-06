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

const RouteList = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    &[aria-current] {
        display: flex;
    }
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

const EditRouteList = ({ planner, plan, currentInfo, onUpdatePlan, onDeleteLocation }) => {
    const { plans } = planner;

    const categoryList = [
        {
            value: '비행기',
            key: 'plane',
        },
        { value: '기차', key: 'train' },
        { value: '버스', key: 'bus' },
        { value: '택시', key: 'taxi' },
        { value: '오토바이', key: 'bicycle' },
        { value: '도보', key: 'walking' },
    ];

    return (
        <EditRouteListBlock>
            {plans &&
                plans.map((p, i) => (
                    <RouteList aria-current={p.planId === currentInfo.planId ? 'plan' : null}>
                        {p.planLocations.map((pl, i) => {
                            const { locationId, locationImage, locationTransportation } = pl;
                            return (
                                <RouteItem key={i}>
                                    <RouteLine />
                                    <TransItem required defaultValue="">
                                        <option value="" disabled>
                                            선택
                                        </option>
                                        {categoryList.map((item) => (
                                            <option value={item.value} key={item.key}>
                                                {item.value}
                                            </option>
                                        ))}
                                    </TransItem>
                                    <SpotItem>
                                        <Img
                                            src={locationImage}
                                            alt={locationId}
                                            // onError={onChangeErrorImg}
                                        />
                                        <Name>{locationId}</Name>
                                        <Button
                                            onClick={() => {
                                                onDeleteLocation(locationId);
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    </SpotItem>
                                </RouteItem>
                            );
                        })}
                    </RouteList>
                ))}
        </EditRouteListBlock>

        // <EditRouteListBlock>
        // {plan &&
        //         plan.planLocations.map((p, i) => {
        //             const { locationId, locationImage, locationTransportation } = p;
        //             return (
        //                 <RouteItem key={i}>
        //                     <RouteLine />
        //                     <TransItem required defaultValue="">
        //                         <option value="" disabled>
        //                             선택
        //                         </option>
        //                         {categoryList.map((item) => (
        //                             <option value={item.value} key={item.key}>
        //                                 {item.value}
        //                             </option>
        //                         ))}
        //                     </TransItem>
        //                     <SpotItem>
        //                         <Img
        //                             src={locationImage}
        //                             alt={locationId}
        //                             // onError={onChangeErrorImg}
        //                         />
        //                         <Name>{locationId}</Name>
        //                         <Button
        //                             onClick={() => {
        //                                 onDeleteLocation(locationId);
        //                             }}
        //                         >
        //                             삭제
        //                         </Button>
        //                     </SpotItem>
        //                 </RouteItem>
        //             );
        //         })}
        // </EditRouteListBlock>
    );
};

export default EditRouteList;
