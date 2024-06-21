import { StateProvider } from "@/context/Statecontext"; //context provider for managing global state
import "@/styles/globals.css"; //global styles
import Head from "next/head"; //modify the head of the document
import reducer, { initialState } from "@/context/StateReducers"; //initializing and managing global state

export default function App({ Component, pageProps }) { 
    return (
        <StateProvider initialState={initialState} reducer={reducer}> 
            <Head>
                <title>QuickChat</title>
                <link rel="shortcut icon" href="/img1.png"/>
            </Head>
            <Component {...pageProps} /> 
            {/* //render the component */}
        </StateProvider>
    );
}
