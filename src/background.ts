console.log("Hello");
chrome.runtime.onInstalled.addListener((res) => {
    // chrome.permissions.contains
    console.log("Hello - res: ", res);
    // chrome.action.disable();
    if (res.reason === "install") {
        chrome.tabs.create({
            url: 'https://mail.google.com',
            active: true
        });
    }

    chrome.contextMenus.removeAll();

    const option: chrome.contextMenus.CreateProperties = {
        type: "normal",
        id: "root",
        title: "Angular",
        contexts: ["editable"]
    }
    const option1: chrome.contextMenus.CreateProperties = {
        type: "normal",
        id: "copy-username",
        parentId: "root",
        title: "SignIn",
        contexts: ["editable"]
    }

    chrome.contextMenus.create(option, () => {
        if (chrome.runtime.lastError) {
            console.log("chrome.runtime.lastError", chrome.runtime.lastError);
            return;
        }
    });

    chrome.contextMenus.create(option1, () => {
        if (chrome.runtime.lastError) {
            console.log("chrome.runtime.lastError", chrome.runtime.lastError);
            return;
        }
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab: any) {
        if (!tab) {
            return;
        }

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs: any) {
            switch (info.menuItemId) {
                case "copy-username":
                    console.log("tab", tab);
                    console.log("info", info);
                    const data = {
                        email: "test@mail.com",
                        password: "Test@123"
                    }
                    chrome.tabs.sendMessage(tab.id, data);
                    
                    break;
                default:
                    console.log("tab", tab);
                    console.log("info", info);
            }
        });
    });

    chrome.webNavigation.onCompleted.addListener(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
            if (id) {
                chrome.action.disable(id);
            }
        });
    }, { url: [{ hostContains: 'google.com' }] });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'formSubmit') {
        console.log('Form submitted in background!');
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs: any) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: showCustomConfirmBox
            }).then(() => console.log("injected a function"));
        });
    }
});

function showCustomConfirmBox() {
    // Your code to show the custom confirm box goes here
    // For example, you can create an Angular element and append it to the body
    const appRoot = document.createElement('app-root');
    return document.body.appendChild(appRoot);
}
