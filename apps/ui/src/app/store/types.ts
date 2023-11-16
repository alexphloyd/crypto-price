export type AppStore = ReturnType<typeof import('./app-store').makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
