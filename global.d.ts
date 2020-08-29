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
    created: string;
    updated: string;
    firstName: string;
    gender: 'male' | 'female';
    keywords: string[];
    lastName: string;
    status: 'active';
    tags: string[];
    _type: 'contact';
}

interface Team extends ContentWithRealms {
    contacts: Contact[];
    slug: string;
    _type: 'team';
}

interface AppState {
    realms?: Realm[];
}
