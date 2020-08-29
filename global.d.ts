interface Session {
    user: {
        name: string;
        email: string;
        image: string;
        token: string;
    };
    expires: string;
}

type Content = Team | Contact;

interface ContentBase {
    _id: string;
    title: string;
}

interface Realm extends ContentBase {
    bgColor?: string;
    color?: string;
}

interface ContentWithRealms extends ContentBase {
    realms: Realm[];
}

interface Contact extends ContentWithRealms {
    firstName: string;
    lastName: string;
    positions?: string[];
    capabilities?: string[];
    _type: 'contact';
}

interface Team extends ContentWithRealms {
    contacts: Contact[];
    _type: 'team';
}

interface Capability extends ContentWithRealms {
    _type: 'capability';
}

interface AppState {
    session?: Session;
}
