import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './infobox.css'

function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" title="infoBox__title">
                    {title}
                </Typography>

                <h2 className="infoBox__cases">{cases}</h2>

                <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
