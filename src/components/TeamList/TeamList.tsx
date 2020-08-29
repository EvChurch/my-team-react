import React, { ReactElement, useState, useEffect } from 'react';
import useFetch from 'use-http';
import { Typography, Card, CardHeader, Box, CardContent, makeStyles, createStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import RealmDots from '../RealmDots';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardEmpty: {
            textAlign: 'center',
        },
        image: {
            maxWidth: 200,
            marginBottom: theme.spacing(2),
        },
    }),
);

const TeamList = (): ReactElement => {
    const classes = useStyles();
    const { loading, get } = useFetch('/my/teams');
    const [teams, setTeams] = useState<Team[]>([]);

    const getTeams = async () => {
        const teams: Team[] = await get();

        setTeams(teams);
    };

    useEffect(() => {
        getTeams();
    }, []);

    return (
        <>
            <Box mb={3}>
                <Typography variant="h5">Teams</Typography>
            </Box>
            {loading && (
                <Card>
                    <CardHeader
                        title={<Skeleton width="50%" />}
                        subheader={<Skeleton width="80%" />}
                        avatar={<Skeleton variant="circle" width={40} height={40} />}
                    />
                </Card>
            )}
            {!loading && (
                <>
                    {teams.map((team) => (
                        <Card key={team._id}>
                            <CardHeader
                                title={team.title}
                                subheader={`${team.contacts.length} members`}
                                avatar={<RealmDots realms={team.realms} size="small" />}
                            />
                        </Card>
                    ))}
                    {teams.length === 0 && (
                        <Card className={classes.cardEmpty}>
                            <CardContent>
                                <img
                                    src={require('../../images/illustrations/undraw_Team_page_re_cffb.svg')}
                                    alt="empty"
                                    className={classes.image}
                                />
                                <Typography variant="h6">You are not currently a member of any team</Typography>
                                <Typography color="textSecondary">
                                    Please contact your team administrator to add you to a team
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </>
    );
};

export default TeamList;
