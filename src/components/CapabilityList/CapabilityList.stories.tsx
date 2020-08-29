import React, { ReactElement } from 'react';
import fetchMock from 'fetch-mock';
import sleep from 'sleep-promise';
import CapabilityList from '.';

export default {
    title: 'CapabilityList',
};

const contacts: Contact[] = [
    {
        _id: '5f49840b0c835c5363b5930b',
        _type: 'contact',
        firstName: 'Test',
        title: 'Test Robin',
        lastName: 'Robin',
        realms: [],
        capabilities: ['5f49ec9615e8e67ee182f30c'],
    },
];

const capabilities: Capability[] = [
    {
        _id: '5f49ec9615e8e67ee182f30c',
        realms: [
            {
                _id: '5f40a6e67461094ee28c02c9',
                title: 'Test Congregation',
                color: '#695e00',
                bgColor: '#faff00',
            },
        ],
        _type: 'capability',
        title: 'MD',
    },
];

export const Default = (): ReactElement => {
    fetchMock
        .restore()
        .getOnce('https://api.fluro.io/my/contact', contacts)
        .postOnce('https://api.fluro.io/content/capability/multiple', capabilities);

    return <CapabilityList />;
};

export const Empty = (): ReactElement => {
    fetchMock
        .restore()
        .getOnce('https://api.fluro.io/my/contact', contacts)
        .postOnce('https://api.fluro.io/content/capability/multiple', []);

    return <CapabilityList />;
};

export const Loading = (): ReactElement => {
    fetchMock
        .restore()
        .getOnce('https://api.fluro.io/my/contact', contacts)
        .postOnce('https://api.fluro.io/content/capability/multiple', async () => {
            await sleep(60000);
            return [];
        });

    return <CapabilityList />;
};

export const Error = (): ReactElement => {
    fetchMock
        .restore()
        .getOnce('https://api.fluro.io/my/contact', contacts)
        .postOnce('https://api.fluro.io/content/capability/multiple', 500);

    return <CapabilityList />;
};
