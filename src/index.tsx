import React from "react";
import ReactDOM from "react-dom/client";
// libs
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@store/slices/index.store";
// translations
import global_en from "@translations/en/global.json";
import global_uk from "@translations/uk/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { LangType } from "@models/lang.model";

i18next.init({
  interpolation: { escapeValue: false },
  lng: LangType.en,
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
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <I18nextProvider i18n={i18next}>
          <div className="w-screen h-screen">
            <App />
          </div>
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
