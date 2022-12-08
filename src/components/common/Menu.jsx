import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const MenuBox = styled.div`
    position: relative;
    user-select: none;
`;

const MenuIcon = styled.div`
    cursor: pointer;

    &:hover {
        color: skyblue;
    }
`;

const MenuItem = styled.div`
    width: 64px;
    height: 24px;
    margin: 4px;
    text-align: center;
    border-radius: 6px;

    &:hover {
        background-color: silver;
    }
`;

const MenuList = styled.div`
    background-color: white;
    position: absolute;
    min-width: 64px;
    min-height: 24px;
    border: 1px solid silver;
    border-radius: 6px;
    right: 0;
    margin-top: 6px;
`;

const Menu = ({ list }) => {
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const onMenuClick = () => {
        //setMenu(!menu);
    };

    const outSideClick = (e) => {
        if ((menuRef && !menuRef.current.contains(e.target)) || menu) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', outSideClick);
        return () => {
            document.removeEventListener('mousedown', outSideClick);
        };
    });

    return (
        <MenuBox ref={menuRef}>
            <MenuIcon>
                <FontAwesomeIcon icon={faBars} />
            </MenuIcon>
            {menu && <MenuList>{list && list.length > 0 ? list.map((v) => <MenuItem key={v.id}>{v.value}</MenuItem>) : null}</MenuList>}
        </MenuBox>
    );
};

export default Menu;
