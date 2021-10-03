import React from 'react'
import { Card , CardContent , Typography } from '@material-ui/core';

const InfoBox = (props) => {
    const {title , cases , total} = props;
    return (
        <Card className="infoBox">
            <CardContent>
                <Typography className="ingoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className="ingoBox__cases"> {cases} </h2>

                <Typography className="ingoBox__total" color="textSecondary">
                    {total}
                </Typography>
            </CardContent>
        </Card>
    )
};

export default InfoBox;
