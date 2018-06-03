'use strict';

var defaultSites = {
  'The Age': 'theage.com.au',
  'Baltimore Sun': 'baltimoresun.com',
  'Barron\'s': 'barrons.com',
  'Bloomberg': 'bloomberg.com',
  'Crain\'s Chicago Business': 'chicagobusiness.com',
  'Chicago Tribune': 'chicagotribune.com',
  'Corriere Della Sera': 'corriere.it',
  'Daily Press': 'dailypress.com',
  'Dagens Nyheter': 'dn.se',
  'The Economist': 'economist.com',
  'Financial Times': 'ft.com',
  'Glassdoor': 'glassdoor.com',
  'Haaretz': 'haaretz.co.il',
  'Haaretz English': 'haaretz.com',
  'Hartford Courant': 'courant.com',
  'Harvard Business Review': 'hbr.org',
  'Het Financieele Dagblad': 'fd.nl',
  'Inc.com': 'inc.com',
  'Le Temps': 'letemps.ch',
  'Los Angeles Times': 'latimes.com',
  'Medium': 'medium.com',
  'Medscape': 'medscape.com',
  'MIT Technology Review': 'technologyreview.com',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NRC': 'nrc.nl',
  'The Boston Globe': 'bostonglobe.com',
  'The Mercury News': 'mercurynews.com',
  'The Morning Call': 'mcall.com',
  'The Nation': 'thenation.com',
  'The New York Times': 'nytimes.com',
  'The New Yorker': 'newyorker.com',
  'OrlandoSentinel': 'orlandosentinel.com',
  'Quora': 'quora.com',
  'SunSentinel': 'sun-sentinel.com',
  'TheMarker': 'themarker.com',
  'The Seattle Times': 'seattletimes.com',
  'The Sydney Morning Herald': 'smh.com.au',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Wired': 'wired.com'
};

const restrictions = {
  'barrons.com': 'barrons.com/articles'
}

// Don't remove cookies before page load
const allow_cookies = [
'asia.nikkei.com',
'wsj.com',
'ft.com',
'letemps.ch',
'fd.nl',
'bostonglobe.com',
'mercurynews.com',
'theage.com.au',
'economist.com',
'bostonglobe.com'
]

// Removes cookies after page load
const remove_cookies = [
'asia.nikkei.com',
'ft.com',
'letemps.ch',
'fd.nl',
'bostonglobe.com',
'mercurynews.com',
'theage.com.au',
'economist.com',
'bostonglobe.com',
'nytimes.com',
'wired.com'
]

function setDefaultOptions() {
  chrome.storage.sync.set({
    sites: defaultSites
  }, function() {
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
  });
}


var blockedRegexes = [
/.+:\/\/.+\.tribdss\.com\//,
/thenation\.com\/.+\/paywall-script\.php/
];

var enabledSites = [];

// Get the enabled sites
chrome.storage.sync.get({
  sites: {}
}, function(items) {
  var sites = items.sites;
  enabledSites = Object.keys(items.sites).map(function(key) {
    return items.sites[key];
  });
});


// Listen for changes to options
chrome.storage.onChanged.addListener(function(changes, namespace) {
  var key;
  for (key in changes) {
    var storageChange = changes[key];
    if (key === 'sites') {
      var sites = storageChange.newValue;
      enabledSites = Object.keys(sites).map(function(key) {
        return sites[key];
      });
    }
  }
});


// Set and show default options on install
chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    setDefaultOptions();
  } else if (details.reason == "update") {
    // User updated extension
  }
});


chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
  if (blockedRegexes.some(function(regex) { return regex.test(details.url); })) {
    return { cancel: true };
  }

  var isEnabled = enabledSites.some(function(enabledSite) {

    var useSite = details.url.indexOf("." + enabledSite) !== -1;

    if (enabledSite in restrictions) {
      return useSite && details.url.indexOf(restrictions[enabledSite]) !== -1;
    }

    return useSite;

  });

  if (!isEnabled) {
    return;
  }

  var requestHeaders = details.requestHeaders;
  var tabId = details.tabId;

  var setReferer = false;

  // if referer exists, set it to google
  requestHeaders = requestHeaders.map(function(requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (details.url.indexOf("wsj.com") !== -1) {
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
  requestHeaders = requestHeaders.map(function(requestHeader) {
    for (var siteIndex in allow_cookies) {
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
    }, function(res) {
      if (chrome.runtime.lastError || res[0]) {
        return;
      }
    });
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['<all_urls>']
}, ['blocking', 'requestHeaders']);

// remove cookies after page load
chrome.webRequest.onCompleted.addListener(function(details) {
  for (var domainIndex in remove_cookies) {
    var domainVar = remove_cookies[domainIndex];
    if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
      continue; // don't remove cookies
    }
    chrome.cookies.getAll({domain: domainVar}, function(cookies) {
      for (var i=0; i<cookies.length; i++) {
        chrome.cookies.remove({url: cookies[i].secure ? "https://" : "http://" + cookies[i].domain + cookies[i].path, name: cookies[i].name});
      }
    });
  }
}, {
  urls: ["<all_urls>"]
});
