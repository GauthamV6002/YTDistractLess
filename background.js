// Set default settings
chrome.runtime.onInstalled.addListener(() => {
	console.log("Unrecommend was installed/reloaded! 🚀");

	chrome.storage.sync.get(["blockedKeywords"], ({ blockedKeywords }) => {
		if (blockedKeywords === {} || !blockedKeywords) {
			chrome.storage.sync.set({ blockedKeywords: [] });
			console.log("Set Default Blocked Keywords List");
		}
	});

	chrome.storage.sync.get(["redirectList"], ({ redirectList }) => {
		if (redirectList === {} || !redirectList) {
            // Items in the redirect list are { redirectURL: <url>, type: 'search' | 'video'  }
			chrome.storage.sync.set({ redirectList: [] });
			console.log("Set Default Redirect List");
		}
	});
});

/*
// Check if time's up - and redirect
chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.sync.get(['blockedSites'], ({ blockedSites }) => {
        blockedSites.forEach(site => {
            if(tab.url?.includes(site.url) || tab.pendingUrl?.includes(site.url)){
                startTimer();
                console.log(TIMER);
                
                chrome.tabs.update(tab.id, {
                    url: `${_SEARCH_TOOL_URL}${site.route}`
                })
            } else {
                stopTimer();
            }
        });
    })
})

chrome.tabs.onUpdated.addListener((id, changeInfo) => {

    chrome.storage.sync.get(['blockedSites'], ({ blockedSites }) => {
        blockedSites.forEach(site => {
            if(changeInfo.url?.includes(site.url)){
                startTimer();
                console.log(TIMER);
            } else {
                stopTimer();
            }
        });
    })
}) */
