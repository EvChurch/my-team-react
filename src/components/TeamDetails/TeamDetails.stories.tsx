import React, { ReactElement } from 'react';
import fetchMock from 'fetch-mock';
import sleep from 'sleep-promise';
import TeamDetails from '.';

export default {
    title: 'TeamDetails',
};

const team: Team = {
    _id: '5f49843dc2c9c8575e395508',
    realms: [
        {
            _id: '5f40a6e67461094ee28c02c9',
            title: 'Test Congregation',
            color: '#695e00',
            bgColor: '#faff00',
        },
        {
            _id: '5f49843dc2c9c8575e39550a',
            title: 'Test | My Group',
        },
    ],
    _type: 'team',
    title: 'Test | My Group',
    slug: 'test---my-group-kzshi-9py',
    contacts: [
        {
            _id: '5f49840b0c835c5363b5930b',
            status: 'active',
            keywords: ['test congregation'],
            tags: [],
            _type: 'contact',
            firstName: 'Test',
            title: 'Test Robin',
            lastName: 'Robin',
            gender: 'male',
            created: '2020-08-28T22:24:11.830Z',
            updated: '2020-08-28T22:28:10.492Z',
            realms: [],
        },
    ],
};

export const Default = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams/abc', team);

    return <TeamDetails id="abc" />;
};

export const Loading = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams/abc', async () => {
        await sleep(60000);
        return team;
    });

    return <TeamDetails id="abc" />;
};

export const Error = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/my/teams/abc', 404);

    return <TeamDetails id="abc" />;
};
