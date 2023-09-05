import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

const MenuBox = styled.div`
    position: relative;
    user-select: none;
    padding: 5px;
    box-sizing: border-box;
    /* border-radius: 6px;
    border: 1px solid ${(props) => props.theme.outlineColor}; */

    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    /* box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor}; */

    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.hoverColor};
        /* box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor}; */
    }
`;

const MenuIcon = styled.div``;

const MenuItem = styled.div`
    width: 64px;
    height: 24px;
    margin: 4px;
    text-align: center;
    border-radius: 6px;

    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }
`;

const MenuList = styled.div`
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    position: absolute;
    min-width: 64px;
    min-height: 24px;
    border: 1px solid silver;
    border-radius: 6px;
    right: 0;
    margin-top: 10px;
`;

const Menu = ({ list, onItemClick }) => {
    const menuRef = useRef(null);
    const [menu, setMenu] = useState(false);
    const onMenuClick = () => {
        //setMenu(!menu);
    };
    const outSideClick = (e) => {
        if ((menuRef.current && !menuRef.current.contains(e.target)) || menu) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    };

    useEffect(() => {
        document.addEventListener('click', outSideClick);
        return () => {
            document.removeEventListener('click', outSideClick);
        };
    });

    return (
        <MenuBox ref={menuRef}>
            <MenuIcon>
                <FontAwesomeIcon icon={faBars} size="2x" />
            </MenuIcon>
            {menu && (
                <MenuList>
                    {list && list.length > 0
                        ? list.map((v, i) => (
                              <MenuItem key={v.id} onClick={() => onItemClick(v, v.id)}>
                                  {v.value}
                              </MenuItem>
                          ))
                        : null}
                </MenuList>
            )}
        </MenuBox>
    );
};

export default Menu;
