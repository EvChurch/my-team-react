import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import TeamList from '../src/components/TeamList';
import CapabilityList from '../src/components/CapabilityList';

interface Props {
    session: Session;
}

const Index = ({}: Props): ReactElement => {
    return (
        <>
            <Head>
                <title>My Team | Teams</title>
            </Head>
            <TeamList />
            <CapabilityList />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res, req }): Promise<{ props: Props }> => {
    const session = await getSession({ req });

    if (!session?.user?.token) {
        res.writeHead(302, { Location: '/api/auth/signin' });
        res.end();
    }

    return { props: { session } };
};

export default Index;
