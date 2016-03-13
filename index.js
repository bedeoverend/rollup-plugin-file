var shortid = require('shortid');
var path = require('path');

module.exports = function() {
  var paths = {};

  return {
    load: function(id) {
      if (paths[id]) {
        var file = paths[id];
        return file.contents.toString();
      }
    },
    resolveId: function(importee, importer) {
      if (typeof importee !== 'string' && importee.contents) {
        var id = 'file-' + shortid();
        paths[id] = importee;
        return id;
      }

      if (paths[importer] && importee[0] === '.') {
        var file = paths[importer],
            // Note: use path.dirname(file.path) instead of file.base, so when
            //  globbing it doesn't use the root of the glob as the base dir
            folder = path.dirname(file.path),
            requirePath = path.resolve(folder, importee);

        return require.resolve(requirePath);
      }
    }
  };
};
