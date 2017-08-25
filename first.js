const puppeteer = require('puppeteer');

puppeteer.launch({headless: false}).then(async browser => {
  // 打开一个新的页面
  const page = await browser.newPage();

  // 跳转到github
  await page.goto('https://github.com/ShuHai/chromeless');

  // 截图
  await page.screenshot({path: './shuhai/first.png', type: 'png'});

  // 打打log,拿拿dom元素，改改样式
  await page.evaluate(() => console.log(5, 'hello', {foo: 'bar'}));
  await page.evaluate(() => {
    let auther = document.querySelector('.author');
    auther.firstChild.style.color = 'red';
  });

  // 
  await page.goto('https://github.com/ShuHai');
  await page.evaluate(() => {
      let ele = document.querySelector('[href="/ShuHai/basic"]');
      ele.click();
  });
});
