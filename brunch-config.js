exports.files = {
  javascripts: {
    joinTo: {
      // "modules.js": /^node_modules/,
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "index.js": /^app/
    }
  },
  stylesheets: {
    joinTo: {
      "app.css": [
        (path) => path.includes(".scss"),
        (path) => path.includes(".css")
      ]
    }
  }
}

exports.modules = {
  autoRequire: {
    "index.js": ["initialize"]
  }
}

exports.npm = {
  globals: {
    Stream: "mithril-stream/stream.js",
    m: "mithril",
    Icons: "@mithril-icons/feather/cjs"
  }
}
exports.paths = {
  public: "docs"
}

exports.plugins = {
  babel: {
    presets: ["@babel/env"],
    ignore: /^node_modules/
  },
  uglify: {
    ignored: /^node_modules/
  },
  copycat: {
    verbose: true,
    onlyChanged: true
  }
}
