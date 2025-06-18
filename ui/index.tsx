import React from "react";
import ForgeReconciler, {
  useProductContext,
} from "@forge/react";

import { jsmModuleKey } from "./constants";
import { QueueModule } from "./components/QueueModule";
import { OrganizationPanel } from "./components/OrganizationPanelModule";

const App = () => {
  const context = useProductContext();

  const serviceDeskKey = context?.extension.project.key;
  const moduleKey = context?.moduleKey;

  const renderUI = () => {
    switch (moduleKey) {
      case jsmModuleKey.Queue: 
        return <QueueModule serviceDeskKey={serviceDeskKey} />
      case jsmModuleKey.OrganizationPanel:
        return <OrganizationPanel />
      default:
        return <QueueModule serviceDeskKey={serviceDeskKey} />
    }
  }
  
  return renderUI()
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
