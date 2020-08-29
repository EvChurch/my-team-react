import React, { ReactElement } from 'react';
import TopBar from '.';

export default {
    title: 'TopBar',
};

const session: Session = {
    user: {
        name: 'Robert Smith',
        email: 'robert.smith@gmail.com',
        image: null,
        token: 'abc',
    },
    expires: new Date().toISOString(),
};

export const Default = (): ReactElement => {
    return <TopBar session={session} />;
};
