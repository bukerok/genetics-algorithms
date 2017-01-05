var algorithmConfig = require('../configs/algorithm-config.json');
var debugConfig = require('../configs/debug-config.json');
var filesCount = algorithmConfig.iterations / debugConfig.checkPoint;

/* jshint -W104 */
class Reader {
  static getData() {
    let result = [];
    // read shears from logs 
    for (let i = 0; i < filesCount; i++) {
      result.push(require('../logs/data-' + i + '.json'));
    }
    // read final result from data-final  
    result.push(require('../logs/data-final.json'));
    // read target from data
    result.push(require('../data/data.json'));
    return result;
  }
}
/* jshint +W104 */

module.exports = Reader;