import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <App />
      </PersistGate>
    </Provider>
    </ThemeProvider>

  </StrictMode>
);
