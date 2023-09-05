import styled from 'styled-components';

const Content = styled.div``;

const TabContent = (props) => {
    const { className, index, value } = props;
    return <>{index == value && <Content className={className}>{children}</Content>}</>;
};

export default TabContent;
