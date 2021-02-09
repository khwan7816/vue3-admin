import "primevue/resources/themes/bootstrap4-dark-blue/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core css
import "primeicons/primeicons.css"; // icons

import PrimeVue from "primevue/config";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Checkbox from "primevue/checkbox";

const plugin = {
  install: (app: any) => {
    app.use(PrimeVue, { ripple: true });

    app.component("Button", Button);
    app.component("InputText", InputText);
    app.component("Password", Password);
    app.component("Checkbox", Checkbox);
  },
};

export default plugin;
