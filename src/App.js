import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import * as FeatherIcons from 'feather-icons-react';
const IconPicker = ({ 
    rowsInOnePage, 
    columnsInOnePage, 
    iconHeight, 
    iconWidth, 
    pickerHeight = 500, 
    pickerWidth = 500, 
    onSelect 
}) => {
    const [currentPage, setCurrentPage] = useState(0);

    const iconNames = Object.keys(FeatherIcons);
    const iconsPerPage = rowsInOnePage * columnsInOnePage;
    const totalPages = Math.ceil(iconNames.length / iconsPerPage);

    const handleIconClick = (iconName) => {
        onSelect(iconName);
    };

    const renderIcons = () => {
        const start = currentPage * iconsPerPage;
        const end = start + iconsPerPage;
        const iconsToRender = iconNames.slice(start, end);

        return iconsToRender.map(iconName => {
            const IconComponent = FeatherIcons[iconName];
            return (
                <div 
                    key={iconName} 
                    className="icon-container" 
                    style={{ width: iconWidth, height: iconHeight }}
                    onClick={() => handleIconClick(iconName)}
                >
                    <IconComponent size={iconHeight} />
                </div>
            );
        });
    };

    return (
        <div className="icon-picker" style={{ width: pickerWidth, height: pickerHeight }}>
            <div className="icon-grid">
                {renderIcons()}
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))} disabled={currentPage === 0}>Previous</button>
                <span>{currentPage + 1} / {totalPages}</span>
                <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

const IconPickerComponent = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    let x,y;
    if(isPickerOpen==true){
      y=""
      x="";
    }else{
      y="Click on the box to select icon"
      x="Icon-"
    }
    return (
        <div>
            <div className='heading'><h1>{y}</h1></div>
            <div 
                className="icon-display" 
                onClick={() => setIsPickerOpen(true)}
                style={{ width: 100, height: 100, border: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >   
                
                <div>{x}</div>
                {selectedIcon && React.createElement(FeatherIcons[selectedIcon], { size: 64 })}
                
            </div>
            {isPickerOpen && 
                <IconPicker 
                    rowsInOnePage={4} 
                    columnsInOnePage={4} 
                    iconHeight={50} 
                    iconWidth={50}
                    onSelect={(iconName) => {
                        setSelectedIcon(iconName);
                        setIsPickerOpen(false);
                    }}
                />
            }
        </div>
    );
};

export default IconPickerComponent;
