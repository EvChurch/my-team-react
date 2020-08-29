import React, { ReactElement } from 'react';
import RealmDots from '.';

export default {
    title: 'RealmDots',
};

const realms: Realm[] = [
    {
        _id: 'abc',
        title: 'Auckland Ev',
        bgColor: '#b81f23',
        color: '#fff',
    },
    {
        _id: 'def',
        title: 'Morning Church',
    },
];

export const Default = (): ReactElement => {
    return <RealmDots realms={realms} />;
};

export const Small = (): ReactElement => {
    return <RealmDots realms={realms} size="small" />;
};

export const Large = (): ReactElement => {
    return <RealmDots realms={realms} size="large" />;
};
