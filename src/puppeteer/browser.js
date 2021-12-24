const puppeteer = require("puppeteer");
const EventEmitter = require("event-emitter");

var emitConfig = function() {
  /* .. */
};
EventEmitter(emitConfig.prototype);

var emitter = new emitConfig();

var browser,
  page,
  init = false,
  emitter = new EventEmitter(),
  openBrowser = true;
if (openBrowser) {
  (async () => {
    console.log("launched");
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true
    });
    page = await browser.newPage();
    await page.goto("http://sandbox.moomoo.io");
    init = true;
    emitter.emit("open", page, init);
  })();
}
module.exports = { browser, page, init, emitter };
