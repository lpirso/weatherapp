import React from 'react';
import LocationSearch from './LocationSearch';
import UnitChooser from './UnitChooser';

import classes from './header.module.css';

const Header = (props) => {
    const { setChosenLocation, setTempUnit, tempUnit } = props;

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <UnitChooser tempUnit={tempUnit} setTempUnit={setTempUnit} />
                <LocationSearch
                    setChosenLocation={setChosenLocation}
                />
            </div>
        </div>
    );
}

export default Header;