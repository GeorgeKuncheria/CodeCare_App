import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './router.ts';
import {Provider} from "react-redux";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n.ts";
import {store} from "./store";
import {ClerkProvider} from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <RouterProvider router={router}/>
                </I18nextProvider>
            </Provider>
        </ClerkProvider>
    </React.StrictMode>,
)
