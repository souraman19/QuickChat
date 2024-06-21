import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript /> 
         {/* //This is where Next.js will inject the necessary scripts to make your application work. It includes scripts for things like client-side navigation and hydration. */}
        <div id="photo-picker-element"></div>
      </body>
    </Html>
  );
}
