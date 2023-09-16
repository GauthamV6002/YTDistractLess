let videoTitles;
let blockedKeywords = [];

let maxCheckedIndex = -1;

let titleCheckDelay = 500;

// Get blocked keywords
chrome.storage.sync.get(["blockedKeywords"], ({ blockedKeywords: words }) => {
    blockedKeywords = words;
    console.log(blockedKeywords);
});

const getVideoElementFromTitle = (element) => {
    // This is so cursed lmao
    return element.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
}

const getChannelFromTitle = (element) => {
    // oh god how is this worse
    return element.parentElement.parentElement.nextElementSibling.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0]?.children[0];
}

//TODO: Memoize already checked videos
const checkTitles = () =>  {
    videoTitles.forEach((title, index) => {   
        
        if(index <= maxCheckedIndex) return; // Don't check if already checked
        if(index > maxCheckedIndex) maxCheckedIndex = index;

        const channel = getChannelFromTitle(title);
        // console.log(`CHANNEL: ${channel.innerHTML}`, getChannelFromTitle(title));
        
        blockedKeywords.forEach((keyword) => {

            if(title.innerHTML.toLowerCase().includes(keyword) || channel.innerHTML?.toLowerCase().includes(keyword)) {
                
                const parentElement = getVideoElementFromTitle(title);
                
                parentElement.classList.add("ytdl-hidden");
                parentElement.parentElement.classList.add("ytdl-wrapper");
                console.log(`Blocking ${title.innerHTML} for the word '${keyword}'The channel was ${channel.innerHTML}.`)

                const text = document.createElement('p');
                text.innerText = `Video Hidden by YTDistractLess. Watch something productive!`;
                text.classList.add("ytdl-hidden-caption");
                parentElement.parentElement.appendChild(text);
            }
        })
    });
}


// Repeatedly attempt to fetch video titles in case initial page load doesn't show them
setInterval(() => {

    videoTitles = document.querySelectorAll("yt-formatted-string#video-title");
    // console.log(videoTitles);
    checkTitles();

}, 750);

