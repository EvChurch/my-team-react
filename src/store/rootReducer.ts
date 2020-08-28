export type Action = UpdateRealmIdsAction | UpdatePeriodAction;

interface UpdatePeriodAction {
    type: 'updatePeriod';
    period: 'week' | 'month' | 'year';
}

interface UpdateRealmIdsAction {
    type: 'updateRealmIds';
    realmIds: string[];
}

const rootReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'updatePeriod':
            return { ...state, period: action.period };
        case 'updateRealmIds':
            return { ...state, realmIds: action.realmIds };
    }
};

export default rootReducer;
