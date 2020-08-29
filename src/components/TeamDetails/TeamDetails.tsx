import React, { ReactElement, useContext } from 'react';
import useFetch from 'use-http';
import {
    Typography,
    Card,
    CardHeader,
    Box,
    ListItem,
    List,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListSubheader,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Head from 'next/head';
import InfoCard from '../InfoCard';
import { AppContext } from '../../store/Context';

interface Props {
    id: string;
}

const TeamDetails = ({ id }: Props): ReactElement => {
    const {
        state: { session },
    } = useContext(AppContext);
    const { data: team, loading, error } = useFetch<Team>(`/my/teams/${id}`, []);

    return (
        <>
            {loading && (
                <>
                    <Box mb={3}>
                        <Typography variant="h5">
                            <Skeleton width={100} />
                        </Typography>
                    </Box>
                    <Card>
                        <CardHeader
                            title={<Skeleton width="50%" />}
                            subheader={<Skeleton width="80%" />}
                            avatar={<Skeleton variant="circle" width={40} height={40} />}
                        />
                    </Card>
                </>
            )}
            {!loading && (
                <>
                    {team && (
                        <>
                            <Head>
                                <title>My Team | {team.title}</title>
                            </Head>
                            <Box mb={3}>
                                <Typography variant="h5">{team.title}</Typography>
                            </Box>
                            <Card>
                                <List subheader={<ListSubheader>Members</ListSubheader>}>
                                    {team.contacts.map((contact) => (
                                        <ListItem key={contact._id}>
                                            <ListItemAvatar>
                                                <Avatar
                                                    src={`${process.env.API_URL}/get/avatar/contact/${contact._id}?w=100&access_token=${session.user.token}`}
                                                >
                                                    {contact.title[0]}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={contact.title}
                                                secondary={contact.positions?.join(', ')}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Card>
                        </>
                    )}
                    {error && (
                        <InfoCard primary={error.message || 'Unexpected Error'} secondary="Please try again later" />
                    )}
                </>
            )}
        </>
    );
};

export default TeamDetails;
