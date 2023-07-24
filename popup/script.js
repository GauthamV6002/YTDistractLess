document.getElementById("settings").addEventListener("click", () => {
    chrome.runtime.openOptionsPage()
})
document.getElementById("open_link").addEventListener("click", () => {
    window.open(`${_SEARCH_TOOL_URL}/sites`)
})

const getQuickOption = (option) => {
    const html = `
    <button class="btn quick-option-btn tooltip">
        <img src=${option.src} class="img-icon"/>
        <span class="tooltiptext"> ${option.tooltip} </span>
    </button>`
    
    const button = document.createElement('button');
    button.className = "btn quick-option-btn tooltip";
    
    const img = document.createElement('img');
    img.className = "img-icon";
    img.src = option.src;

    const span = document.createElement('span');
    span.className = "tooltiptext";
    span.innerText = option.tooltip;

    button.appendChild(img);
    button.appendChild(span);

    const template = document.createElement('template');
    template.innerHTML = html.trim();

    button.addEventListener('click', () => {
        window.open(`${_SEARCH_TOOL_URL}${option.route}`)
    })

    return button;
}

// Fill Quick Options
chrome.storage.sync.get(['quickOptions'], ({ quickOptions }) => {
    if(quickOptions === {}) chrome.storage.sync.set({'quickOptions': []});

    for(let option of quickOptions){    
        const ele = getQuickOption(option);
        document.getElementById('quickOptions').appendChild(ele);
    }
});