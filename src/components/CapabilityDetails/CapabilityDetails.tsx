import React, { ReactElement } from 'react';
import useFetch from 'use-http';
import { Typography, Card, CardHeader, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Head from 'next/head';
import InfoCard from '../InfoCard';

interface Props {
    id: string;
}

const CapabilityDetails = ({ id }: Props): ReactElement => {
    const { data: capability, loading, error } = useFetch<Capability>(`/content/capability/${id}`, []);

    return (
        <>
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
                    {capability && (
                        <>
                            <Head>
                                <title>My Capability | {capability.title}</title>
                            </Head>
                            <Box mb={3}>
                                <Typography variant="h5">{capability.title}</Typography>
                            </Box>
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

export default CapabilityDetails;
