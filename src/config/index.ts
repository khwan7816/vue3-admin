/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

type ConfigOptions = {
  mode: string;
};

class Config {
  private _mode = "";
  private _config: any;

  get mode() {
    return this._mode;
  }

  get version() {
    return process.env.VUE_APP_VERSION;
  }

  get apiServer() {
    return this._config.api;
  }

  get webServer() {
    return this._config.web;
  }

  async _parseConfig(options: ConfigOptions) {
    const { mode } = options;

    try {
      const content = require("./conf.d/config." + mode + ".json");
      this._config = content;
    } catch (e) {
      this._config = require("./conf.d/config.production.json");
    }

    this._mode = mode;
  }

  constructor(options: ConfigOptions) {
    this._parseConfig(options);

    if (this.mode === "debug") {
      // require('debug').enable('');
    } else {
      // require('debug').enable('');
    }
  }

  get(name: string) {
    return this._config[name];
  }

  printVersion() {
    //     const c1 =
    //       "font-family: Helvetica; font-size: 32px; color: #f21d2f; font-weight: bold;";
    //     const c2 =
    //       "font-family: Helvetica; font-size: 8px; color: #666666; font-weight: bold;";
    //     const text = `
    // %cVue3-admin
    // %cv${this.version}
    // `;
    //     console.log(text, c1, c2);
  }
}

const mode = process.env.VUE_APP_MODE || process.env.NODE_ENV;

const config = new Config({
  mode: mode,
});

export default config;
