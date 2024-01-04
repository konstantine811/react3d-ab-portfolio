import ReactDOM from "react-dom/client";
// i18next
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
// libs
import "./index.scss";
import "moment-timezone";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "@store/slices/index.store";
// translations
import global_en from "@translations/en/global.json";
import global_uk from "@translations/uk/global.json";
// helpers
import { getBrowserLanguage } from "@helpers/lange";

i18next
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .init({
    interpolation: { escapeValue: false },
    lng: getBrowserLanguage(),
    resources: {
      en: {
        global: global_en,
      },
      uk: {
        global: global_uk,
      },
    },
  });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// Create a client
const queryClient = new QueryClient();
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
