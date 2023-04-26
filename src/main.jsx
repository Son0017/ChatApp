import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./context/userContext";
import { DataProvider } from "./context/dataContext";
// import { UserProvider } from "./context/userContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-oxa0qoyvsmcg5cor.us.auth0.com"
    clientId="t9sGQbK78eshVV8tlqA0GfMwJQUtFwso"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserProvider>
  </Auth0Provider>
);
