import React, { createContext, ReactElement, ReactNode, Dispatch, useReducer } from 'react';
import rootReducer, { Action } from './rootReducer';

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<Action> }>({
    state: ({} as unknown) as AppState,
    dispatch: () => undefined,
});

interface Props {
    children: ReactNode;
    initialState: AppState;
}

const AppProvider = ({ initialState, children }: Props): ReactElement => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
