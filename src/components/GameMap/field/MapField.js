import React from 'react';

export default function MapField(props) {

    const FIELD_SIZE = 64;
    const cssTop = props.field.yPos * FIELD_SIZE;
    const cssLeft = props.field.xPos * FIELD_SIZE;

    return (
        <div className={props.cssClass} style={{ top: cssTop, left: cssLeft }} onClick={props.onClickAction} fieldname={props.field.name} >
            {props.children}
        </div>
    );

}