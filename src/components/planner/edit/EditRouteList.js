import { useRef, useState } from 'react';
import styled from 'styled-components';
import * as common from '../../../lib/utils/CommonFunction';

const EditRouteListBlock = styled.div`
    /* width: 250px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem;
    border-radius: 1rem;
    background-color: rgb(110, 110, 110);
    box-shadow: 0 0 5px rgb(120, 120, 120);
`;

const RouteList = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem;
    position: relative;
    background-color: rgb(80, 80, 80);
    border: 0.2rem inset rgb(100, 100, 100);
    border-radius: 1rem;
    &[aria-current] {
        display: flex;
    }
`;

const RouteItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    background-color: rgb(110, 110, 110);
    border: 0.2rem inset rgb(140, 140, 140);
    border-radius: 1rem;
    cursor: pointer;
    /* padding: 0.2rem 0.5rem 0.5rem 0.2rem; */
    padding: 0.5rem;
    /* &:nth-child(1) {
        & > div {
            display: none;
        }
        /* select {
            display: none;
        } */
    } */
`;

const RouteBox = styled.div`
    background-color: rgb(110, 110, 110);
    border: 0.2rem inset rgb(140, 140, 140);
    border-radius: 1rem;
    padding: 0.3rem;
`;

const TransItem = styled.select`
    border: 0.2rem outset rgb(140, 140, 140);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
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
    border: 0.2rem outset rgb(140, 140, 140);
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    height: 90px;
    /* margin: 0.5rem 0; */
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

const RouteLine = styled.div`
    border-right: 0.2rem solid #cdd9ac;
    /* width: rem; */
    height: 1rem;
`;

const EditRouteList = ({ planner, plan, plannerData, transList, onUpdatePlan, onDeleteLocation, onChangeLocation, onUpdateTrans }) => {
    const { plans } = { ...planner };

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
                    <RouteList aria-current={p.planId === plannerData.planId ? 'plan' : null} key={i}>
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
                                        {/* <RouteLine /> */}
                                        <RouteBox>
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
                                                {transList &&
                                                    transList.map((t) => (
                                                        <option value={t.value} key={t.value}>
                                                            {t.label}
                                                        </option>
                                                    ))}
                                            </TransItem>
                                        </RouteBox>
                                        {/* <RouteLine /> */}
                                        <RouteBox>
                                            <SpotItem>
                                                {/* <Img
                                                src={locationImage}
                                                alt={locationId}
                                                // onError={onChangeErrorImg}
                                            /> */}
                                                <Name>{locationName}</Name>
                                                {/* <Button
                                                onClick={() => {
                                                    onDeleteLocation(locationId);
                                                }}
                                            >
                                                삭제
                                            </Button> */}
                                            </SpotItem>
                                        </RouteBox>
                                    </RouteItem>
                                );
                            })}
                    </RouteList>
                ))}
        </EditRouteListBlock>
    );
};

export default EditRouteList;
