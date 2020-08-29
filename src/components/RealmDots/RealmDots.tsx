import React, { ReactElement } from 'react';
import { Avatar, Tooltip, makeStyles, createStyles, Theme } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }),
);

interface Props {
    realms: Realm[];
    size?: 'small' | 'default' | 'large';
}

const RealmDots = ({ realms, size = 'default' }: Props): ReactElement => {
    const classes = useStyles();
    return (
        <AvatarGroup max={2}>
            {realms.map((realm) => (
                <Tooltip key={realm._id} title={realm.title} aria-label={realm.title}>
                    <Avatar
                        style={{ backgroundColor: realm.bgColor, color: realm.color }}
                        className={[size == 'small' && classes.small, size == 'large' && classes.large].join(' ')}
                    >
                        {size === 'small' ? ' ' : realm.title[0]}
                    </Avatar>
                </Tooltip>
            ))}
        </AvatarGroup>
    );
};

export default RealmDots;
