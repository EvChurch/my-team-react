import React, { ReactElement } from 'react';
import { createStyles, makeStyles, Theme, Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardEmpty: {
            textAlign: 'center',
        },
        image: {
            maxHeight: 200,
            marginBottom: theme.spacing(2),
        },
    }),
);

interface Props {
    primary: string;
    secondary: string;
    src?: string;
}

const InfoCard = ({
    primary,
    secondary,
    src = require('../../images/illustrations/undraw_bug_fixing_oc7a.svg'),
}: Props): ReactElement => {
    const classes = useStyles();
    return (
        <Card className={classes.cardEmpty}>
            <CardContent>
                <img src={src} alt="error" className={classes.image} />
                <Typography variant="h6">{primary}</Typography>
                <Typography color="textSecondary">{secondary}</Typography>
            </CardContent>
        </Card>
    );
};

export default InfoCard;
