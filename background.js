chrome.runtime.onInstalled.addListener(function(){
    //replace all rules
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        //with new rules
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions:[new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {pathContains: "/NFVD/"}
                }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {pathContains: "Unica"}
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

var lastRequestedId;

var demoJson = {
    "url": "workspaces/Unica",
    "params": [{
        key: "debug",
        value: "1",
        active: true
    },{
        key: "debug",
        value: "1",
        active: false
    }]
};

var redirect = function(details){
    if (lastRequestedId !== details.requestId && JSON.parse(localStorage['enable'])){
        lastRequestedId = details.requestId;
        return {redirectUrl: details.url + "&debug=1"};
    }
};

chrome.webRequest.onBeforeRequest.addListener(redirect,{
    urls : ["*://*/*workspaces/Unica/view*","*://*/*workspaces/NFVD/view*"]
},['blocking']
);

//chrome.webRequest.onBeforeRequest.removeListener(ddd);
