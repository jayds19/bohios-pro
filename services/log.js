var fs = require('fs');
 
var logger = require('tracer').console({
  transport: function(data) {
    console.log(data.output)
    fs.appendFile('./tracer.log', data.rawoutput + '\n', err => {
      if (err) throw err
    })
  }
});

module.exports = logger;
