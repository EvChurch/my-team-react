import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';
import TeamDetails from '../../../src/components/TeamDetails';

interface Props {
    session: Session;
    id: string;
}

const Index = ({ id }: Props): ReactElement => {
    return <TeamDetails id={id} />;
};

export const getServerSideProps: GetServerSideProps = async ({ res, req, params }): Promise<{ props: Props }> => {
    const session = await getSession({ req });

    if (!session?.user?.token) {
        res.writeHead(302, { Location: '/api/auth/signin' });
        res.end();
    }

    return { props: { session, id: params.id.toString() } };
};

export default Index;
