import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Box } from '@material-ui/core';
import TeamList from '../src/components/TeamList';

interface Props {
    session: Session;
}

const Index = ({}: Props): ReactElement => {
    return (
        <>
            <Head>
                <title>My Team | Home</title>
            </Head>
            <Box mx={2}>
                <TeamList />
            </Box>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    res,
    req,
}): Promise<{ props: Record<string, unknown> }> => {
    const session = await getSession({ req });

    if (!session?.user?.token) {
        res.writeHead(302, { Location: '/api/auth/signin' });
        res.end();
    }

    return { props: { session } };
};

export default Index;
