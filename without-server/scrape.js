import puppeteer from 'puppeteer';


function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){} 
  }

  
async function channelPage(inp) {
    var inp = process.argv[2]
    var url = "https://www.youtube.com/"+inp+"/videos"
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    
    // in case statsPage does not run first:  
    if (inp === undefined || inp === null) {
        console.log("You need to input a YouTuber")
        sleeping()
        function sleeping(){
            sleepFor(1000);
            console.log("Usage: node scraping.js YouTuber");
            sleepFor(1000);
            console.log("Example: node scraping.js PewDiePie");
          }
        console.log("Exiting...")
        process.exit()
    }

    try {
        const [v] = await page.$x('//*[@id="video-title"]')
        const vid = await v.getProperty('textContent')
        const vidText = await vid.jsonValue();
    
        const [l] = await page.$x('//*[@id="video-title"]')
        const link = await l.getProperty('href')
        const linkText = await link.jsonValue();
        
        const [s] = await page.$x('//*[@id="subscriber-count"]')
        const sub = await s.getProperty('textContent')
        const subText = await sub.jsonValue();
        console.log("Latest video:",vidText)
        console.log("Latest video link:",linkText)
        console.log("Subscriber count:",subText)
    }
    catch(err) {
        console.log("Failed to collect YouTuber data on channel page")
        console.log("Make sure you have typed it in correctly")
    }
    browser.close() 
}

async function statsPage() {

    var inp = process.argv[2]
    var url = "https://www.youtube.com/"+inp+"/about"
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url) 
    
    if (inp === undefined || inp === null) {
        console.log("You need to input a YouTuber")
        sleeping()
        function sleeping(){
            sleepFor(1000);
            console.log("Usage: node scraping.js YouTuber");
            sleepFor(1000);
            console.log("Example: node scraping.js PewDiePie");
          }
        console.log("Exiting...")
        process.exit()
    }
    console.log("Showing results for",inp)
    try {
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
    
    
        console.log("--------")
        console.log("Date created:",dateText)
        console.log("Channel views:",viewsText)
        console.log("Channel description: "+"'"+descText+"'")
        console.log("Channel profile picture:",pfpText)
        console.log("--------")
    }
    catch(err) {
        console.log("Failed to collect YouTuber data on about page")
        console.log("Make sure you have typed it in correctly")
    }
    browser.close()
}

statsPage();
channelPage();



