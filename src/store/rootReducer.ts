export type Action = UpdateSessionAction;

interface UpdateSessionAction {
    type: 'updateSession';
    session: Session;
}

const rootReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'updateSession':
            return { ...state, session: action.session };
    }
};

export default rootReducer;
