import React, { ReactElement } from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSideProps } from 'next';

interface Props {
    session: {
        user?: {
            token: string;
        };
    };
}

const Index = ({}: Props): ReactElement => {
    return <>hello world</>;
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
