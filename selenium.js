var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

webdriverio
  .remote(options)
  .init()
  .url('https://www.instagram.com')
  .saveScreenshot('Test_Worked.jpg') 
  .end();