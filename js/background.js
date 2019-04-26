'use strict';

let defaultSites = {
    'Baltimore Sun': 'baltimoresun.com',
    'Barron\'s': 'barrons.com',
    'Bloomberg': 'bloomberg.com',
    'Crain\'s Chicago Business': 'chicagobusiness.com',
    'Chicago Tribune': 'chicagotribune.com',
    'Corriere Della Sera': 'corriere.it',
    'Daily Press': 'dailypress.com',
    'Dagens Nyheter': 'dn.se',
    'Denver Post': 'denverpost.com',
    'Dynamed Plus': 'dynamed.com',
    'The Economist': 'economist.com',
    'Les Echos': 'lesechos.fr',
    'Encyclopedia Britannica': 'britannica.com',
    'Examiner': 'examiner.com.au',
    'Financial News': 'fnlondon.com',
    'Financial Times': 'ft.com',
    'Foreign Affairs': 'foreignaffairs.com',
    'Foreign Policy': 'foreignpolicy.com',
    'Glassdoor': 'glassdoor.com',
    'Haaretz': 'haaretz.co.il',
    'Haaretz English': 'haaretz.com',
    'Hartford Courant': 'courant.com',
    'Harper\'s Magazine': 'harpers.org',
    'Harvard Business Review': 'hbr.org',
    'Inc.com': 'inc.com',
    'Irish Times': 'irishtimes.com',
    'La Repubblica': 'repubblica.it',
    'Liberation': 'liberation.fr',
    'Los Angeles Times': 'latimes.com',
    'Medium': 'medium.com',
    'MIT Technology Review': 'technologyreview.com',
    'Newsrep': 'thenewsrep.com',
    'New York Magazine': 'nymag.com',
    'Nikkei Asian Review': 'asia.nikkei.com',
    'NRC': 'nrc.nl',
    'OrlandoSentinel': 'orlandosentinel.com',
    'Quora': 'quora.com',
    'San Francisco Chronicle': 'sfchronicle.com',
    'SunSentinel': 'sun-sentinel.com',
    'The Advocate': 'theadvocate.com.au',
    'The Age': 'theage.com.au',
    'The Boston Globe': 'bostonglobe.com',
    'The Globe and Mail': 'theglobeandmail.com',
    'The Japan Times': 'japantimes.co.jp',
    'TheMarker': 'themarker.com',
    'The Mercury News': 'mercurynews.com',
    'The Morning Call': 'mcall.com',
    'The Nation': 'thenation.com',
    'The New Statesman': 'newstatesman.com',
    'The New York Times': 'nytimes.com',
    'The New Yorker': 'newyorker.com',
    'The Seattle Times': 'seattletimes.com',
    'The Spectator': 'spectator.co.uk',
    'The Sydney Morning Herald': 'smh.com.au',
    'The Washington Post': 'washingtonpost.com',
    'The Wall Street Journal': 'wsj.com',
    'Winston-Salem Journal': 'journalnow.com',
    'Vanity Fair': 'vanityfair.com',
    'Wired': 'wired.com'
};

const restrictions = {
    'barrons.com': 'barrons.com/articles'
};

// Don't remove cookies before page load
const allow_cookies = [
    'asia.nikkei.com',
    'nytimes.com',
    'wsj.com',
    'ft.com',
    'fd.nl',
    'mercurynews.com',
    'theage.com.au',
    'economist.com',
    'bostonglobe.com',
    'denverpost.com',
    'chicagobusiness.com',
    'theadvocate.com.au',
    'examiner.com.au',
    'hbr.org',
    'medium.com',
    'washingtonpost.com',
    'nymag.com',
];

// Removes cookies after page load
const remove_cookies = [
    'asia.nikkei.com',
    'ft.com',
    'fd.nl',
    'mercurynews.com',
    'theage.com.au',
    'economist.com',
    'bostonglobe.com',
    'wired.com',
    'denverpost.com',
    'chicagobusiness.com',
    'harpers.org',
    'theadvocate.com.au',
    'examiner.com.au',
    'lesechos.fr',
    'liberation.fr',
    'hbr.org',
    'medium.com',
    'foreignpolicy.com',
    'wsj.com',
    'seattletimes.com',
    'thenewsrep.com',
    'washingtonpost.com',
    'sfchronicle.com',
    'nymag.com',
    'foreignaffairs.com',
];

function setDefaultOptions() {
    chrome.storage.sync.set({
        sites: defaultSites
    }, function () {
        chrome.tabs.create({'url': 'chrome://extensions/?options=' + chrome.runtime.id});
    });
}


let blockedRegexes = [
    /.+:\/\/.+\.tribdss\.com\//,
    /thenation\.com\/.+\/paywall-script\.php/,
    /haaretz\.co\.il\/htz\/js\/inter\.js/
];

let enabledSites = [];

// Get the enabled sites
chrome.storage.sync.get({
    sites: {}
}, function (items) {
    let sites = items.sites;
    enabledSites = Object.keys(items.sites).map(function (key) {
        return items.sites[key];
    });
});

// Listen for changes to options
chrome.storage.onChanged.addListener(function (changes) {
    let key;
    for (key in changes) {
        let storageChange = changes[key];
        if (key === 'sites') {
            let sites = storageChange.newValue;
            enabledSites = Object.keys(sites).map(function (key) {
                return sites[key];
            });
        }
    }
});

// Set and show default options on install
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        setDefaultOptions();
    } else if (details.reason === "update") {
        // User updated extension
    }
});


// WSJ bypass
chrome.webRequest.onBeforeRequest.addListener(function (details) {
        if (!isSiteEnabled(details) || details.url.indexOf("mod=rsswn") !== -1) {
            return;
        }

        let param;
        let updatedUrl;

        param = getParameterByName("mod", details.url);

        if (param === null) {
            updatedUrl = stripQueryStringAndHashFromPath(details.url);
            updatedUrl += "?mod=rsswn";
        } else {
            updatedUrl = details.url.replace(param, "rsswn");
        }
        return {redirectUrl: updatedUrl};
    },
    {urls: ["*://*.wsj.com/*"], types: ["main_frame"]},
    ["blocking"]
);

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    if (!isSiteEnabled(details)) {
        return;
    }

    if (blockedRegexes.some(function (regex) {
        return regex.test(details.url);
    })) {
        return {cancel: true};
    }

    let requestHeaders = details.requestHeaders;
    let tabId = details.tabId;

    let setReferer = false;

    // if referer exists, set it to google
    requestHeaders = requestHeaders.map(function (requestHeader) {
        if (requestHeader.name === 'Referer') {
            if (details.url.indexOf("wsj.com") !== -1 || details.url.indexOf("ft.com") !== -1) {
                requestHeader.value = 'https://www.facebook.com/';
            } else {
                requestHeader.value = 'https://www.google.com/';
            }

            setReferer = true;
        }
        return requestHeader;
    });

    // otherwise add it
    if (!setReferer) {
        if (details.url.indexOf("wsj.com") !== -1) {
            requestHeaders.push({
                name: 'Referer',
                value: 'https://www.facebook.com/'
            });
        } else {
            requestHeaders.push({
                name: 'Referer',
                value: 'https://www.google.com/'
            });
        }

    }

    // remove cookies before page load
    requestHeaders = requestHeaders.map(function (requestHeader) {
        for (let siteIndex in allow_cookies) {
            if (details.url.indexOf(allow_cookies[siteIndex]) !== -1) {
                return requestHeader;
            }
        }
        if (requestHeader.name === 'Cookie') {
            requestHeader.value = '';

        }
        return requestHeader;
    });

    if (tabId !== -1) {
        // run contentScript inside tab
        chrome.tabs.executeScript(tabId, {
            file: 'contentScript.js',
            runAt: 'document_start'
        }, function (res) {
            if (chrome.runtime.lastError || res[0]) {

            }
        });
    }

    return {requestHeaders: requestHeaders};
}, {
    urls: ['<all_urls>']
}, ['blocking', 'requestHeaders', 'extraHeaders']);

// remove cookies after page load
chrome.webRequest.onCompleted.addListener(function (details) {
    for (let domainIndex in remove_cookies) {
        let domainVar = remove_cookies[domainIndex];
        if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
            continue; // don't remove cookies
        }
        chrome.cookies.getAll({domain: domainVar}, function (cookies) {
            for (let i = 0; i < cookies.length; i++) {
                chrome.cookies.remove({
                    url: (cookies[i].secure ? "https://" : "http://") + cookies[i].domain + cookies[i].path,
                    name: cookies[i].name
                });
            }
        });
    }
}, {
    urls: ["<all_urls>"]
});

let _gaq = [];
_gaq.push(['_setAccount', 'UA-69824169-2']);
_gaq.push(['_trackPageview']);

(function () {
    let ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    let s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

function isSiteEnabled(details) {
    return enabledSites.some(function (enabledSite) {
        let useSite = details.url.indexOf("." + enabledSite) !== -1;
        if (enabledSite in restrictions) {
            return useSite && details.url.indexOf(restrictions[enabledSite]) !== -1;
        }
        return useSite;
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripQueryStringAndHashFromPath(url) {
    return url.split("?")[0].split("#")[0];
}
