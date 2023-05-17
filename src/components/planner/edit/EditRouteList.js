import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as common from '../../../lib/utils/CommonFunction';

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
    position: relative;
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
    /* margin: 0.5rem 0; */
    background-color: white;
    z-index: 99;
`;

const Img = styled.img`
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

const LineDiv = styled.div`
    border-right: 0.2rem solid #cdd9ac;
    /* width: rem; */
    height: 1rem;
`;

const EditRouteList = ({ planner, plan, plannerData, onUpdatePlan, onDeleteLocation, onChangeLocation, onUpdateTrans }) => {
    const { plans } = { ...planner };

    const categoryList = [
        {
            label: '비행기',
            value: 1,
        },
        { label: '기차', value: 2 },
        { label: '버스', value: 3 },
        { label: '택시', value: 4 },
        { label: '오토바이', value: 5 },
        { label: '도보', value: 6 },
        // {
        //     value: '비행기',
        //     key: 'plane',
        // },
        // { value: '기차', key: 'train' },
        // { value: '버스', key: 'bus' },
        // { value: '택시', key: 'taxi' },
        // { value: '오토바이', key: 'bicycle' },
        // { value: '도보', key: 'walking' },
    ];

    const containerRef = useRef();
    const itemRef = useRef();

    const itemsArr = useRef();
    const dragItem = useRef();
    const overItem = useRef();
    const dragItemIndex = useRef();
    const overItemIndex = useRef();

    const dragTarget = useRef();
    const overTarget = useRef();

    let index = 0;

    let posY = useRef(0);

    const [overTargetArr, setOverTargetArr] = useState([]);
    const [isDrag, setIsDrag] = useState(false);

    if (!planner) {
        return <div>Loading...</div>;
    }

    return (
        <EditRouteListBlock ref={containerRef} onDrop={(e) => common.onDrop(e, isDrag, itemsArr, dragItemIndex, overItemIndex, dragItem, index, plans)} onDragOver={(e) => common.onDragOver(e)}>
            {plans &&
                plans.map((p, i) => (
                    <RouteList
                        aria-current={p.planId === plannerData.planId ? 'plan' : null}
                        key={i}
                        // ref={containerRef}
                        // onDrop={(e) => common.onDrop(e, isDrag, plansArr, dragItemIndex, overItemIndex, item, index, plans)}
                        // onDragOver={(e) => common.onDragOver(e)}
                    >
                        {p.planLocations &&
                            p.planLocations.map((pl, i) => {
                                const { locationId, locationName, locationImage, locationTransportation } = pl;
                                return (
                                    <RouteItem
                                        ref={itemRef}
                                        key={i}
                                        draggable
                                        onDragStart={(e) => {
                                            common.onDragStart(e, pl, setIsDrag, dragTarget, posY, dragItem, dragItemIndex, itemsArr, p.planLocations);
                                        }}
                                        onDrag={(e) => {
                                            common.onDragMove(e, isDrag, posY, containerRef, itemRef, dragItemIndex, dragTarget, setIsDrag, overTargetArr, itemsArr, dragItem, overItem, overItemIndex, setOverTargetArr);
                                        }}
                                        onDragEnd={(e) => {
                                            common.onDragEnd(setIsDrag, overTargetArr, dragTarget, itemsArr, dragItem, dragItemIndex, overItem, overItemIndex, setOverTargetArr);
                                        }}
                                        onDragEnter={(e) => {
                                            common.onDragEnter(e, pl, isDrag, overItem, overItemIndex, overTarget, dragTarget, overTargetArr, setOverTargetArr, dragItemIndex, itemRef, itemsArr, p.planLocations);
                                        }}
                                    >
                                        <LineDiv />
                                        {/* <RouteLine /> */}
                                        <TransItem
                                            required
                                            value={locationTransportation}
                                            onChange={(e) => {
                                                onUpdateTrans(e.target.value, pl);
                                            }}
                                        >
                                            {/* <option value="" disabled>
                                            선택
                                        </option> */}
                                            {categoryList.map((c, i) => (
                                                <option value={c.value} key={c.value}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </TransItem>
                                        <LineDiv />
                                        <SpotItem>
                                            <Img
                                                src={locationImage}
                                                alt={locationId}
                                                // onError={onChangeErrorImg}
                                            />
                                            <Name>{locationName}</Name>
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
    );
};

export default EditRouteList;
