import React, { ReactElement } from 'react';
import InfoCard from '.';

export default {
    title: 'InfoCard',
};

export const Default = (): ReactElement => {
    return <InfoCard primary="Internal Server Error" secondary="Please try again later" />;
};

export const Src = (): ReactElement => {
    return (
        <InfoCard
            primary="You are not currently a member of any team"
            secondary="Please contact your team administrator to add you to a team"
            src={require('../../images/illustrations/undraw_Team_page_re_cffb.svg')}
        />
    );
};
