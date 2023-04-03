import { useState } from 'react';
import styled from 'styled-components';

const TabBox = styled.div``;

const TabMenuBox = styled.div`
    display: flex;
`;

const TabItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 80px;
    height: 40px;
    color: black;
    margin: 0px 10px;

    &.active {
        border-bottom: 2px solid skyblue;
    }

    &:hover {
        border-bottom: 2px solid silver;
    }
`;

const TabContentBox = styled.div`
    min-height: 80px;
`;

const PlannerTabs = ({ tabMenu }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const onTabMenuClick = (index) => {
        setTabIndex(index);
    };

    return (
        <TabBox>
            <TabMenuBox>
                {tabMenu.map((item, index) => (
                    <TabItem className={index === tabIndex ? 'active' : ''} key={index} onClick={() => onTabMenuClick(index)}>
                        {item.title}
                    </TabItem>
                ))}
            </TabMenuBox>
            <TabContentBox>{tabMenu[tabIndex].content}</TabContentBox>
        </TabBox>
    );
};

export default PlannerTabs;
