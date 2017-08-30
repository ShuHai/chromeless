const puppeteer = require('puppeteer');

let sleep = function(delay) {
    return new Promise((promise,reject) => {
      setTimeout(()=> {
        resolve(1);
      },delay)
    })
}
puppeteer.launch().then(async browser => {
  // 打开一个新的页面
  var page = await browser.newPage();

  // 跳转到mdn
  await page.goto('https://developer.mozilla.org/zh-CN/docs/Web/JavaScript');

  // pdf test
  await page.pdf({path: './shuhai/get/index.pdf'});
  
  let aList = await page.evaluate(() => {
    return [...document.querySelectorAll('ol li a')].map(item => {
        return {
            href: item.href.trim(),
            name: item.text
        }
    })
  })

  // 然后就可以愉快的爬爬爬了,30条先控制一下
  aList = aList.slice(0, 30)
  for (var i = 1; i < aList.length; i++) {
      page = await browser.newPage()
      var a = aList[i];
      await page.goto(a.href);
      await page.pdf({path: `./shuhai/get/${a.name}.pdf`});
      console.log(i,'done');
      page.close();
    }
});
