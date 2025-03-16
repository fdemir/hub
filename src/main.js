import { router, routes } from "./router";
import "./components";
import "./views";

import { initLocalization } from "./localization";

(async () => {
  try {
    await initLocalization();
  } catch (e) {
    console.error(`Error loading locale: ${e.message}`);
  }

  router.setRoutes(routes);
})();
