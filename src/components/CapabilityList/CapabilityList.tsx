import React, { ReactElement, useEffect, useState } from 'react';
import useFetch from 'use-http';
import { Typography, Card, Box, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Link from 'next/link';
import RealmDots from '../RealmDots';
import InfoCard from '../InfoCard';

const CapabilityList = (): ReactElement => {
    const { get, post, loading, error } = useFetch();
    const [capabilities, setCapabilities] = useState<Capability[]>([]);

    const getCapabilities = async (): Promise<void> => {
        const contact: Contact = (await get('/my/contact'))[0];

        if (!contact || !contact.capabilities || contact.capabilities.length === 0) {
            return;
        }

        const capabilities: Capability[] = await post('/content/capability/multiple', {
            ids: contact.capabilities,
            limit: contact.capabilities.length,
        });

        setCapabilities(capabilities);
    };

    useEffect(() => {
        getCapabilities();
    }, []);

    return (
        <>
            <Box my={3}>
                <Typography variant="h5">Capabilities</Typography>
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
                    {capabilities && capabilities.length > 0 && (
                        <Card>
                            <List>
                                {capabilities.map((capability) => (
                                    <Link
                                        href="/my/capabilities/[id]"
                                        as={`/my/capabilities/${capability._id}`}
                                        key={capability._id}
                                        passHref
                                    >
                                        <ListItem button component="a">
                                            <ListItemAvatar>
                                                <RealmDots realms={capability.realms} size="small" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={capability.title}
                                                secondary={capability.realms[0]?.title}
                                            />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Card>
                    )}
                    {capabilities && capabilities.length === 0 && (
                        <InfoCard
                            primary="You currently have no capabilities assigned to you"
                            secondary="Please contact your capability administrator to add a capability"
                            src={require('../../images/illustrations/undraw_nature_m5ll.svg')}
                        />
                    )}
                    {error && <InfoCard primary={error.message} secondary="Please try again later" />}
                </>
            )}
        </>
    );
};

export default CapabilityList;
