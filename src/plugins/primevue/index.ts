import "primevue/resources/themes/bootstrap4-dark-blue/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css"; // icons

import PrimeVue from "primevue/config";
import Button from "primevue/button";

const plugin = {
  install: (app: any) => {
    app.use(PrimeVue, { ripple: true });

    app.component("Button", Button);
  },
};

export default plugin;
