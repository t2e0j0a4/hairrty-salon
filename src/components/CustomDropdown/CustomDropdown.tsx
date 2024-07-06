import React, { useEffect, useRef, useState } from 'react'
import styles from "./CustomDropdown.module.css";

// React Icons
import { IoIosArrowDown } from "react-icons/io";

const CustomDropdown = ({dropMenu, dropSelected, setDropSelected}: {dropMenu: {id: string, name: string}[], dropSelected: {id: string, name: String}, setDropSelected: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
}>>}) => {

    const [showMenu, setShowMenu] = useState(false);

    const selectRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

        // eslint-disable-next-line
    }, []);

    return (
        
        <div className={styles.dropdown} ref={selectRef}>

            <button title='Toggle Dropdown' type='button' aria-label='Toggle Dropdown' onClick={() => {
                setShowMenu(!showMenu)
            }}>
                <span>{dropSelected.name}</span>
                <span className={showMenu ? styles.drop__open : ''}><IoIosArrowDown fontSize={17} /></span>
            </button>

            <div className={`${styles.dropdown__menu} ${showMenu ? styles.show__menu : styles.hide__menu}`}>
                {
                    dropMenu.map((menu) => {
                        return (
                            <button title={menu.name} tabIndex={menu.id === dropSelected.id ? -1 : 0} className={menu.id === dropSelected.id ? styles.selected__option : ''} onClick={() => {
                                setDropSelected({
                                    name: menu.name,
                                    id: menu.id
                                });
                                setShowMenu(false);
                            }} type='button' aria-label={menu.name} key={menu.id}>{menu.name}</button>
                        )
                    })
                }
            </div>

        </div>

    )
}

export default CustomDropdown