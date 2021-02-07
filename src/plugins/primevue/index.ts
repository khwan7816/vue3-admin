import "primevue/resources/themes/luna-pink/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css"; // icons

import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";

const plugin = {
  install: (app: any) => {
    app.use(PrimeVue, { ripple: true });

    app.component("Dialog", Dialog);
  },
};

export default plugin;
