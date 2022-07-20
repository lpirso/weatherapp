import React from "react";

import classes from './unitChooser.module.css';

const UnitChooser = ({setTempUnit, tempUnit}) => {
    return (
        <div className={classes.root}>
            <button type="button" className={classes.button} disabled={tempUnit === 'metric'} onClick={() => {setTempUnit('metric')}}>{'\u00b0C'}</button>
            <button type="button" className={classes.button} disabled={tempUnit === 'imperial'} onClick={() => {setTempUnit('imperial')}}>{'\u00b0F'}</button>
        </div>
    );
}

export default UnitChooser;