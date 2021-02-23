/*
If you aren't running this with a server, 
use the other file in the "without-server" folder. 
Puppeteer does not work with client side scripts.
*/ 
import puppeteer from 'puppeteer';

async function main() {
    const inp = document.getElementById("inp").value;
    channelPage();
    statsPage();
    return inp;  
}

const inp = main();
const user = "https://www.youtube.com/"+inp+"/videos"
const about = "https://www.youtube.com/"+inp+"/about"

async function channelPage(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(user)

    const [v] = await page.$x('//*[@id="video-title"]')
    const vid = await v.getProperty('textContent')
    const vidText = await vid.jsonValue();

    const [l] = await page.$x('//*[@id="video-title"]')
    const link = await l.getProperty('href')
    const linkText = await link.jsonValue();
    
    const [s] = await page.$x('//*[@id="subscriber-count"]')
    const sub = await s.getProperty('textContent')
    const subText = await sub.jsonValue();

    document.getElementById("channel").innerHTML = 
    "Latest video:"+vidText+"<br>"+"Latest video link:"+linkText
    +"<br>"+"Subscriber count:"+subText;

    browser.close() 
}

async function statsPage(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(about)

    const [d] = await page.$x('//*[@id="right-column"]/yt-formatted-string[2]/span[2]')
    const date = await d.getProperty('textContent')
    const dateText = await date.jsonValue();

    const [v] = await page.$x('//*[@id="right-column"]/yt-formatted-string[3]')
    const views = await v.getProperty('textContent')
    const viewsText = await views.jsonValue();

    const [dd] = await page.$x('//*[@id="description"]')
    const desc = await dd.getProperty('textContent')
    const descText = await desc.jsonValue();

    const [p] = await page.$x('//*[@id="img"]')
    const pfp = await p.getProperty('src')
    const pfpText = await pfp.jsonValue();

    document.getElementById("stats").innerHTML = 
    "Date created:"+dateText+"<br>"+"Channel views:"+viewsText
    +"<br>"+"Channel description:"+descText+"<br>"+"Channel profile picture:"+pfpText;

    browser.close()
}


