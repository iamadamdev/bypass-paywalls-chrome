'use strict';

const restrictions = {
  'barrons.com': /.+barrons\.com\/articles\/.+/,
  'wsj.com': /(.+wsj\.com\/articles\/.+|.+blogs\.wsj\.com\/.+)/
}

// Don't remove cookies before page load
const allow_cookies = [
'ad.nl',
'asia.nikkei.com',
'bostonglobe.com',
'canberratimes.com.au',
'cen.acs.org',
'chicagobusiness.com',
'demorgen.be',
'denverpost.com',
'economist.com',
'ed.nl',
'examiner.com.au',
'ft.com',
'harpers.org',
'hbr.org',
'lesechos.fr',
'lrb.co.uk',
'medium.com',
'mercurynews.com',
'mexiconewsdaily.com',
'newstatesman.com',
'nrc.nl',
'nymag.com',
'nytimes.com',
'ocregister.com',
'parool.nl',
'qz.com',
'scientificamerican.com',
'seattletimes.com',
'seekingalpha.com',
'sofrep.com',
'spectator.co.uk',
'techinasia.com',
'telegraaf.nl',
'the-american-interest.com',
'theadvocate.com.au',
'theage.com.au',
'theathletic.com',
'theatlantic.com',
'theaustralian.com.au',
'thediplomat.com',
'themercury.com.au',
'thestar.com',
'towardsdatascience.com',
'trouw.nl',
'vn.nl',
'volkskrant.nl',
'washingtonpost.com',
'wired.com',
]

// Removes cookies after page load
const remove_cookies = [
'ad.nl',
'asia.nikkei.com',
'bloombergquint.com',
'bostonglobe.com',
'canberratimes.com.au',
'cen.acs.org',
'chicagobusiness.com',
'demorgen.be',
'denverpost.com',
'economist.com',
'ed.nl',
'examiner.com.au',
'ft.com',
'harpers.org',
'hbr.org',
'lesechos.fr',
'medium.com',
'mercurynews.com',
'mexiconewsdaily.com',
'newstatesman.com',
'nrc.nl',
'nymag.com',
'nytimes.com',
'ocregister.com',
'qz.com',
'scientificamerican.com',
'seattletimes.com',
'sofrep.com',
'spectator.co.uk',
'telegraaf.nl',
'theadvocate.com.au',
'theage.com.au',
'theatlantic.com',
'thediplomat.com',
'thestar.com',
'towardsdatascience.com',
'vn.nl',
'washingtonpost.com',
'wired.com',
'wsj.com',
]

// select specific cookie(s) to hold from remove_cookies domains
const remove_cookies_select_hold = {
  'qz.com': ['gdpr'],
  'washingtonpost.com': ['wp_gdpr'],
  'wsj.com': ['wsjregion'],
}

// select only specific cookie(s) to drop from remove_cookies domains
const remove_cookies_select_drop = {
  'ad.nl': ['temptationTrackingId'],
  'ed.nl': ['temptationTrackingId'],
  'bostonglobe.com': ['FMPaywall'],
  'demorgen.be': ['TID_ID'],
  'economist.com': ['rvuuid'],
  'fd.nl': ['socialread'],
  'nrc.nl': ['counter'],
}

// Override User-Agent with Googlebot
const use_google_bot = [
'adelaidenow.com.au',
'barrons.com',
'couriermail.com.au',
'dailytelegraph.com.au',
'fd.nl',
'haaretz.co.il',
'haaretz.com',
'heraldsun.com.au',
'mexiconewsdaily.com',
'ntnews.com.au',
'nytimes.com',
'quora.com',
'seekingalpha.com',
'telegraph.co.uk',
'theathletic.com',
'theaustralian.com.au',
'themarker.com',
'themercury.com.au',
'thetimes.co.uk',
'wsj.com',
'kansascity.com',
]

function setDefaultOptions() {
  var initSites = defaultSites;
  // Disable Daily Average User tracking by default on FF
  if (typeof browser === 'object' && extension_api === browser)
    Object.keys(initSites).forEach(key => initSites[key] == 'allowDAU' && delete initSites[key]);

  extension_api.storage.sync.set({
    sites: initSites,
  }, function() {
    extension_api.runtime.openOptionsPage();
  });
}

// to block external script also add domain to Firefox manifest.json (permissions)
const blockedRegexes = {
'adweek.com': /.+\.lightboxcdn\.com\/.+/,
'afr.com': /afr\.com\/assets\/vendorsReactRedux_client.+\.js/,
'bostonglobe.com': /meter\.bostonglobe\.com\/js\/.+/,
'businessinsider.com': /(.+\.tinypass\.com\/.+|cdn\.onesignal\.com\/sdks\/.+\.js)/,
'chicagotribune.com': /.+:\/\/.+\.tribdss\.com\//,
'economist.com': /(.+\.tinypass\.com\/.+|economist\.com\/_next\/static\/runtime\/main.+\.js)/,
'foreignpolicy.com': /.+\.tinypass\.com\/.+/,
'haaretz.co.il': /haaretz\.co\.il\/htz\/js\/inter\.js/,
'haaretz.com': /haaretz\.com\/hdc\/web\/js\/minified\/header-scripts-int.js.+/,
'inquirer.com': /.+\.tinypass\.com\/.+/,
'lastampa.it': /.+\.repstatic\.it\/minify\/sites\/lastampa\/.+\/config\.cache\.php\?name=social_js/,
'lrb.co.uk': /.+\.tinypass\.com\/.+/,
'nzherald.co.nz': /nzherald\.co\.nz\/.+\/headjs\/.+\.js/,
'repubblica.it': /scripts\.repubblica\.it\/pw\/pw\.js.+/,
'spectator.co.uk': /.+\.tinypass\.com\/.+/,
'spectator.com.au': /.+\.tinypass\.com\/.+/,
'thecourier.com.au': /.+cdn-au\.piano\.io\/api\/tinypass.+\.js/,
'theglobeandmail.com': /theglobeandmail\.com\/pb\/resources\/scripts\/build\/chunk-bootstraps\/.+\.js/,
'thenation.com': /thenation\.com\/.+\/paywall-script\.php/,
};

const userAgentDesktop = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
const userAgentMobile = "Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)"

var enabledSites = [];

// Get the enabled sites
extension_api.storage.sync.get({
  sites: {}
}, function(items) {
  var sites = items.sites;
  enabledSites = Object.keys(items.sites).map(function(key) {
    return items.sites[key];
  });
  if (extension_api === chrome) {
    init_GA();
  }
});

// Listen for changes to options
extension_api.storage.onChanged.addListener(function(changes, namespace) {
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
extension_api.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    setDefaultOptions();
  } else if (details.reason == "update") {
    // User updated extension
  }
});

extension_api.tabs.onUpdated.addListener(updateBadge);
extension_api.tabs.onActivated.addListener(updateBadge);

function updateBadge() {
    extension_api.tabs.query({
        active: true,
        currentWindow: true
    }, function (arrayOfTabs) {
        var activeTab = arrayOfTabs[0];
        if (!activeTab)
            return;
        var badgeText = getBadgeText(activeTab.url);
        extension_api.browserAction.setBadgeBackgroundColor({color: "blue"});
        extension_api.browserAction.setBadgeText({text: badgeText});
    });
}

function getBadgeText(currentUrl) {
  return currentUrl && isSiteEnabled({url: currentUrl}) ? 'ON' : '';
}

/**
// WSJ bypass
extension_api.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details) || details.url.indexOf("mod=rsswn") !== -1) {
    return;
  }

  var param;
  var updatedUrl;

  param = getParameterByName("mod", details.url);

  if (param === null) {
    updatedUrl = stripQueryStringAndHashFromPath(details.url);
    updatedUrl += "?mod=rsswn";
  } else {
    updatedUrl = details.url.replace(param, "rsswn");
  }
  return { redirectUrl: updatedUrl};
},
{urls:["*://*.wsj.com/*"], types:["main_frame"]},
["blocking"]
);
**/

// Disable javascript for these sites
extension_api.webRequest.onBeforeRequest.addListener(function(details) {
  if (!isSiteEnabled(details) && !enabledSites.some(function(enabledSite) {
    return enabledSite.indexOf("generalpaywallbypass") !== -1
  })) {
    return;
  }
  return {cancel: true};
  },
  {
    urls: [
           "*://*.newstatesman.com/*",
           "*://*.outbrain.com/*",
           "*://*.piano.io/*",
           "*://*.poool.fr/*",
           "*://*.tinypass.com/*",
          ],
    types: ["script"],
  },
  ["blocking"]
);

var extraInfoSpec = ['blocking', 'requestHeaders'];
if (extension_api.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS'))
  extraInfoSpec.push('extraHeaders');

extension_api.webRequest.onBeforeSendHeaders.addListener(function(details) {
  var requestHeaders = details.requestHeaders;

  var header_referer = '';
  for (var n in requestHeaders) {
    if (requestHeaders[n].name.toLowerCase() == 'referer') {
      header_referer = requestHeaders[n].value;
      continue;
    }
  }

  // remove cookies for sites medium platform (mainfest.json needs in permissions: <all_urls>)
  if (isSiteEnabled({url: '.medium.com'}) && details.url.indexOf('cdn-client.medium.com') !== -1 && header_referer.indexOf('.medium.com') === -1) {
    var domainVar = new URL(header_referer).hostname;
    extension_api.cookies.getAll({domain: domainVar}, function(cookies) {
      for (var i=0; i<cookies.length; i++) {
        extension_api.cookies.remove({url: (cookies[i].secure ? "https://" : "http://") + cookies[i].domain + cookies[i].path, name: cookies[i].name});
      }
    });
  }

  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  for (var domain in blockedRegexes) {
    if ((isSiteEnabled({url: '.'+ domain}) || isSiteEnabled({url: header_referer})) && details.url.match(blockedRegexes[domain])) {
      // allow BG paywall-script to set cookies in homepage/sections (else no article-text)
      if (details.url.indexOf(domain) !== -1 || header_referer.indexOf(domain) !== -1) {
        if (details.url.indexOf('meter.bostonglobe.com/js/') !== -1 && (header_referer === 'https://www.bostonglobe.com/'
            || header_referer.indexOf('/?p1=BGHeader_') !== -1  || header_referer.indexOf('/?p1=BGMenu_') !== -1)) {
          extension_api.webRequest.handlerBehaviorChanged(function () {});
          break;
        } else if (header_referer.indexOf('theglobeandmail.com') !== -1 && !(header_referer.indexOf('/article-') !== -1)) {
          extension_api.webRequest.handlerBehaviorChanged(function () {});
          break;
        }
        return { cancel: true };
      }
    }
  }

  if (!isSiteEnabled(details)) {
    return;
  }

  var tabId = details.tabId;

  var useUserAgentMobile = false;
  var setReferer = false;

  // if referer exists, set it to google
  requestHeaders = requestHeaders.map(function(requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (details.url.indexOf("cooking.nytimes.com/api/v1/users/bootstrap") !== -1) {
        // this fixes images not being loaded on cooking.nytimes.com main page
        // referrer has to be *nytimes.com otherwise returns 403
        requestHeader.value = 'https://cooking.nytimes.com';
      } else if (details.url.indexOf("wsj.com") !== -1 || details.url.indexOf("ft.com") !== -1 || details.url.indexOf("fd.nl") !== -1) {
        requestHeader.value = 'https://www.facebook.com/';
      } else {
        requestHeader.value = 'https://www.google.com/';
      }
      setReferer = true;
    }
    if (requestHeader.name === 'User-Agent') {
      useUserAgentMobile = requestHeader.value.toLowerCase().includes("mobile");
    }

    return requestHeader;
  });

  // otherwise add it
  if (!setReferer) {
    if (details.url.indexOf("wsj.com") !== -1 || details.url.indexOf("ft.com") !== -1 || details.url.indexOf("fd.nl") !== -1) {
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

  // override User-Agent to use Googlebot
  var useGoogleBot = use_google_bot.filter(function(item) {
    return typeof item == 'string' && details.url.indexOf(item) > -1;
  }).length > 0;

  if (useGoogleBot) {
    requestHeaders.push({
      "name": "User-Agent",
      "value": useUserAgentMobile ? userAgentMobile : userAgentDesktop
    })
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
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
    extension_api.tabs.executeScript(tabId, {
      file: 'contentScript.js',
      runAt: 'document_start'
    }, function(res) {
      if (extension_api.runtime.lastError || res[0]) {
        return;
      }
    });
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['<all_urls>']
}, extraInfoSpec);

// remove cookies after page load
extension_api.webRequest.onCompleted.addListener(function(details) {
  for (var domainIndex in remove_cookies) {
    var domainVar = remove_cookies[domainIndex];
    if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
      continue; // don't remove cookies
    }
    extension_api.cookies.getAll({domain: domainVar}, function(cookies) {
      for (var i=0; i<cookies.length; i++) {
        var cookie = {
          url: (cookies[i].secure ? "https://" : "http://") + cookies[i].domain + cookies[i].path,
          name: cookies[i].name,
          storeId: cookies[i].storeId
        };
        // .firstPartyDomain = undefined on Chrome (doesn't support it)
        if (cookies[i].firstPartyDomain !== undefined) {
          cookie.firstPartyDomain = cookies[i].firstPartyDomain;
        }
        var cookie_domain = cookies[i].domain;
        var rc_domain = cookie_domain.replace(/^(\.?www\.|\.)/, '');
        // hold specific cookie(s) from remove_cookies domains
        if ((rc_domain in remove_cookies_select_hold) && remove_cookies_select_hold[rc_domain].includes(cookies[i].name)){
          continue; // don't remove specific cookie
        }
        // drop only specific cookie(s) from remove_cookies domains
        if ((rc_domain in remove_cookies_select_drop) && !(remove_cookies_select_drop[rc_domain].includes(cookies[i].name))){
          continue; // only remove specific cookie
        }
        extension_api.cookies.remove(cookie);
      }
    });
  }
}, {
  urls: ["<all_urls>"]
});

// Google Analytics to track DAU (Chrome only)
function init_GA() {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-69824169-2']);
  _gaq.push (['_gat._anonymizeIp']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}

function isSiteEnabled(details) {
  var isEnabled = enabledSites.some(function(enabledSite) {
    var useSite = (details.url.indexOf("." + enabledSite) !== -1 || details.url.indexOf("/" + enabledSite) !== -1);
    if (enabledSite in restrictions) {
      return useSite && details.url.match(restrictions[enabledSite]);
    }
    return useSite;
  });
  return isEnabled;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function stripQueryStringAndHashFromPath(url) {
  return url.split("?")[0].split("#")[0];
}
