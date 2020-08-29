import React, { ReactElement } from 'react';
import fetchMock from 'fetch-mock';
import sleep from 'sleep-promise';
import CapabilityDetails from '.';

export default {
    title: 'CapabilityDetails',
};

const capability: Capability = {
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
};

export const Default = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/content/capability/abc', capability);

    return <CapabilityDetails id="abc" />;
};

export const Loading = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/content/capability/abc', async () => {
        await sleep(60000);
        return capability;
    });

    return <CapabilityDetails id="abc" />;
};

export const Error = (): ReactElement => {
    fetchMock.restore().getOnce('https://api.fluro.io/content/capability/abc', 404);

    return <CapabilityDetails id="abc" />;
};
