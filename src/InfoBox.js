import React from 'react';
import "./InfoBox.css";
import { Card , CardContent , Typography } from '@material-ui/core';

const InfoBox = (props) => {
    const {title , cases , type ,total , active , ...rest} = props;
    return (
        <Card onClick={rest.onClick} className={`infoBox ${active && `infoBox--${type}`}`} >
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className={`infoBox__cases ${type === "recovered" ? "infoBox--textGreen" : ""}`}> {cases} </h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {total} total
                </Typography>
            </CardContent>
        </Card>
    )
};

export default InfoBox;
