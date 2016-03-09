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
            requirePath = path.resolve(file.base, importee);

        return require.resolve(requirePath);
      }
    }
  };
};
