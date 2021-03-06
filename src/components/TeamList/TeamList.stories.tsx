import React, { ReactElement } from 'react';
import fetchMock from 'fetch-mock';
import sleep from 'sleep-promise';
import TeamList from '.';

export default {
    title: 'TeamList',
};

const teams: Team[] = [
    {
        _id: '5f49843dc2c9c8575e395508',
        title: 'Test | My Group',
        realms: [
            { _id: '5f40a6e67461094ee28c02c9', title: 'Test Congregation', color: '#695e00', bgColor: '#faff00' },
            { _id: '5f49843dc2c9c8575e39550a', title: 'Test | My Group' },
        ],
        _type: 'team',
        contacts: [
            {
                _id: '5f49840b0c835c5363b5930b',
                realms: [
                    {
                        _id: '5f40a6e67461094ee28c02c9',
                        title: 'Test Congregation',
                        color: '#695e00',
                        bgColor: '#faff00',
                    },
                    { _id: '5f49843dc2c9c8575e39550a', title: 'Test | My Group' },
                ],
                _type: 'contact',
                firstName: 'Test',
                title: 'Test Robin',
                lastName: 'Robin',
            },
        ],
    },
];

export const Default = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams', teams);

    return <TeamList />;
};

export const Empty = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams', []);

    return <TeamList />;
};

export const Loading = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams', async () => {
        await sleep(60000);
        return [];
    });

    return <TeamList />;
};

export const Error = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams', 500);

    return <TeamList />;
};
