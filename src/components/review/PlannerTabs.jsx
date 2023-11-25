import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlannerList from './PlannerList';

const TabBox = styled.div``;

const TabMenuBox = styled.div`
    display: flex;
`;

const TabItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5rem;
    height: 2.5rem;
    color: black;
    margin: 0rem 0.625rem;

    &.active {
        border-bottom: 2px solid skyblue;
    }

    &:hover {
        border-bottom: 2px solid silver;
    }
`;

const TabContentBox = styled.div`
    min-height: 5rem;
`;

const PlannerTabs = ({ tabMenu, plannerList, onPlannerListLoad, onSelectPlanner }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const { type } = tabMenu[tabIndex];
    const list = plannerList[type];

    const onTabMenuClick = (index, type) => {
        setTabIndex(index);
        onPlannerListLoad(type);
    };

    useEffect(() => {
        onPlannerListLoad(type);
    }, [tabIndex]);

    return (
        <TabBox>
            <TabMenuBox>
                {tabMenu.map((item, index) => (
                    <TabItem
                        className={index === tabIndex ? 'active' : ''}
                        key={index}
                        onClick={() => onTabMenuClick(index, item.type)}
                    >
                        {item.title}
                    </TabItem>
                ))}
            </TabMenuBox>
            <TabContentBox>
                <PlannerList type={type} list={list} onItemClick={onSelectPlanner} />
            </TabContentBox>
        </TabBox>
    );
};

export default PlannerTabs;
