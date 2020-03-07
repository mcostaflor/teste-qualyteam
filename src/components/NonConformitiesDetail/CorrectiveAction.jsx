import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function CorrectiveAction({ id, what, why, how, where, until }) {
    return (
        <Card style={{ marginTop: 20 }}>
            <CardContent>
                <Typography>
                    Ação Corretiva #{id}
                </Typography>
                <br />
                <Typography variant={'caption'}>
                    O que fazer
                </Typography>
                <Typography variant={'body1'}>
                    {what}
                </Typography>
                <br />
                <Typography variant={'caption'}>
                    Por que fazer
                </Typography>
                <Typography variant={'body1'}>
                    {why}
                </Typography>
                <br />
                <Typography variant={'caption'}>
                    Como fazer
                            </Typography>
                <Typography variant={'body1'}>
                    {how}
                </Typography>
                <br />
                <Typography variant={'caption'}>
                    Onde fazer
                            </Typography>
                <Typography variant={'body1'}>
                    {where}
                </Typography>
                <br />
                <Typography variant={'caption'}>
                    Fazer até
                            </Typography>
                <Typography variant={'body1'}>
                    {until}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CorrectiveAction;