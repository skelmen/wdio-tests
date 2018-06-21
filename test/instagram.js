var assert = require('assert');
var fs = require('fs');
var request = require('request');

describe('Instagram test', function() {
    before(function() {
        browser.url('https://www.instagram.com/');
        browser.saveScreenshot('./screenshots/1-homepage.png');
        browser.click('a[href="/accounts/login/"]');
        synchronousTimer(2000);
        browser.setValue('input[name="username"]', 'test.wdio');
        browser.setValue('input[name="password"]', 'testapps2529');
        browser.saveScreenshot('./screenshots/2-enter_credentials.png');
        browser.click('form button');
    });

    it('page url after login', function () {
        browser.waitUntil(function(){
            var pageUrl = browser.getUrl();
            return pageUrl === 'https://www.instagram.com/';
        }, 3000);
        // assert.notEqual(pageUrl, 'https://www.instagram.com/accounts/login');
        // assert.equal(pageUrl, 'https://www.instagram.com/');
    });

    it('fill search field', function () {
        var tag = 'sea';
        browser.setValue('input[type="text"]', '#' + tag);
        synchronousTimer(3000);
        browser.saveScreenshot('./screenshots/3-tag_search_results.png');
        browser.click('span=#' + tag);
        synchronousTimer(2000);
    });

    it('get second image and save it', function () {
        browser.saveScreenshot('./screenshots/4-second_post_image.png');
        var img = browser.getAttribute('article div div div div div a', 'href');
        var pattern = /[^\/p\/]+([A-Z])\w+/;
        var imgId = img[1].match(pattern);
        browser.waitUntil(function(){
            browser.url('https://www.instagram.com/p/'+ imgId[0] +'/media');
            browser.saveScreenshot('./screenshots/5-image_url.png');
            var curUrl = browser.getUrl();
            return request.get(curUrl).pipe(fs.createWriteStream('Test_Worked.jpg', { encoding: 'binary' }));
        }, 4000);
    });
});

//Синхронный таймер
function synchronousTimer(milliseconds) {
    const time = new Date().getTime();
    while(new Date().getTime() < time+ milliseconds) {}
}