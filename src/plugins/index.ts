// Plugin
import _ from "lodash";

import primevue from "./primevue";

const plugins = {
  install: (app: any) => {
    app.use(primevue);

    app.config.globalProperties.$_ = _;
  },
};

export default plugins;
