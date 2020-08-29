import React, { ReactElement } from 'react';
import useFetch from 'use-http';
import { Typography, Card, Box, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Link from 'next/link';
import RealmDots from '../RealmDots';
import InfoCard from '../InfoCard';

const TeamList = (): ReactElement => {
    const { data: teams, loading, error } = useFetch<Team[]>('/my/teams', []);

    return (
        <>
            <Box my={3}>
                <Typography variant="h5">Teams</Typography>
            </Box>
            {loading && (
                <Card>
                    <List>
                        <ListItem>
                            <ListItemAvatar>
                                <Skeleton variant="circle" width={40} height={40} />
                            </ListItemAvatar>
                            <ListItemText primary={<Skeleton width="50%" />} secondary={<Skeleton width="80%" />} />
                        </ListItem>
                    </List>
                </Card>
            )}
            {!loading && (
                <>
                    {teams && teams.length > 0 && (
                        <Card>
                            <List>
                                {teams.map((team) => (
                                    <Link href="/my/teams/[id]" as={`/my/teams/${team._id}`} key={team._id} passHref>
                                        <ListItem button component="a">
                                            <ListItemAvatar>
                                                <RealmDots realms={team.realms} size="small" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={team.title}
                                                secondary={`${team.contacts.length} members`}
                                            />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Card>
                    )}
                    {teams && teams.length === 0 && (
                        <InfoCard
                            primary="You are not currently a member of any team"
                            secondary="Please contact your team administrator to add you to a team"
                            src={require('../../images/illustrations/undraw_Team_page_re_cffb.svg')}
                        />
                    )}
                    {error && <InfoCard primary={error.message} secondary="Please try again later" />}
                </>
            )}
        </>
    );
};

export default TeamList;
