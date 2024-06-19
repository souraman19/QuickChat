import { StateProvider } from "@/context/Statecontext";
import "@/styles/globals.css";
import Head from "next/head";
import reducer, { initialState } from "@/context/StateReducers";;

export default function App({ Component, pageProps }) {
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
            <Head>
                <title>QuickChat</title>
                <link rel="shortcut icon" href="/img1.png"/>
            </Head>
            <Component {...pageProps} />
        </StateProvider>
    );
}
