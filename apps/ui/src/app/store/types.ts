export type AppStore = ReturnType<typeof import('./index').makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
