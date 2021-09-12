const puppeteer = require('puppeteer');
const fs = require('fs');

const getDataSiteContent = async (search, actualPage) => {

  const domain = `https://www.amazon.co.uk/s?k=${search}&page=${actualPage}`;

  try {

    if(!search || !actualPage) return ('Inform the parameters')

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(domain, {
      timeout: 3000000
    });

    const products = await page.evaluate(() => {

      const links = Array.from(document.querySelectorAll('.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.sg-col-12-of-16 > div'));

      return links.map((link, index) => {
        return {
          title: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
          link: link.querySelector(".a-link-normal.a-text-normal").href,
          image: link.querySelector(".s-image").src,
          isSponsored: link.querySelector('.s-label-popover.s-sponsored-label-text') ? true : false,
          price: link.querySelector(".a-price-whole") ? link.querySelector(".a-price-whole").textContent + link.querySelector(".a-price-fraction").textContent : 0,
          previousPrice: link.querySelector('.a-price.a-text-price > span') ? link.querySelector('.a-price.a-text-price > span').textContent.slice(1, 6) : null,
          rating: link.querySelector('.a-icon-alt') ? link.querySelector('.a-icon-alt').textContent.slice(0, 3) : null,
          numberOfReviews: link.querySelector('.a-size-base') ? link.querySelector('.a-size-base').textContent.replace(',', '') : null,
          resultPage: this.actualPage,
          resultPosition: index,
        }
      }).slice(0, 10);
    });
 
    await browser.close();

    return products

  } catch (error) {
    console.log(error)
  }

}

const saveDataSiteContent = async (data) => {
  
  fs.writeFile('./results/output.json', JSON.stringify(data), err => err ? console.log(err): null);

}

module.exports = {
  getDataSiteContent,
  saveDataSiteContent
}