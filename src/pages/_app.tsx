import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

const client = createClient({
  url: "/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
