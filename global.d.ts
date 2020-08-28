interface Session {
    user: {
        name: string;
        email: string;
        image: string;
        token: string;
    };
    expires: string;
}

interface Filter {
    comparator: string;
    key: string;
    value?: string;
    value2?: string;
    values?: string[] | { _id: string }[];
    dataType?: string;
}

interface Realm {
    _id: string;
    bgColor: string;
    color: string;
    slug: string;
    title: string;
    type: 'realm';
}

interface ResultSet {
    _id: string;
    title: string;
    results?: Result[];
}

interface Result {
    _id: string;
    rowCount: number;
    date: string;
    data?: {
        _id: {
            values: {
                [key: string]: string;
            };
        };
    };
}

interface Content {
    _uid: string;
    _id: string;
    definition: string;
    title: string;
    created: string;
    realm: Realm;
    author?: Contact;
    data?: { [key: string]: number };
}

interface AppState {
    period: 'week' | 'month' | 'year';
    realmIds: string[];
    count: number;
}

type QueryContent = Contact | Persona;

interface QueryContentBase {
    _id: string;
    realms: Realm[];
    created: string;
}

interface Contact extends QueryContentBase {
    title: string;
    _type: 'contact';
}

interface Persona extends QueryContentBase {
    title: string;
    collectionEmail: string;
    _type: 'persona';
}
