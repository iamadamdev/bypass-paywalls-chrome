/* Please respect alphabetical order when adding a site in any list */

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
'lemonde.fr',
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
  'bostonglobe.com': ['FMPaywall'],
  'demorgen.be': ['TID_ID'],
  'economist.com': ['rvuuid'],
  'ed.nl': ['temptationTrackingId'],
  'fd.nl': ['socialread'],
  'nrc.nl': ['counter'],
}

// Override User-Agent with Googlebot
const use_google_bot = [
'barrons.com',
'dailytelegraph.com.au',
'fd.nl',
'haaretz.co.il',
'haaretz.com',
'kansascity.com',
'lemonde.fr',
'mexiconewsdaily.com',
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
  if (details.url.includes('mod=rsswn') || !isSiteEnabled(details)) {
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
  if (!isSiteEnabled(details) && !enabledSites.includes('generalpaywallbypass')) {
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
  var header_referer_idx = -1;
  var useUserAgentMobile = false;
  var user_agent_idx = -1;
  for (var n in requestHeaders) {
    if (requestHeaders[n].name.toLowerCase() == 'referer') {
      header_referer = requestHeaders[n].value;
      header_referer_idx = n;
    }
    if (requestHeaders[n].name.toLowerCase() == 'user-agent') {
      useUserAgentMobile = requestHeaders[n].value.toLowerCase().includes('mobile');
      user_agent_idx = n;
    }
  }

  // remove cookies for sites medium platform (mainfest.json needs in permissions: <all_urls>)
  if (isSiteEnabled({url: 'https://medium.com'}) && matchUrlDomain('cdn-client.medium.com', details.url) && !matchUrlDomain('medium.com', header_referer)) {
    extension_api.cookies.getAll({domain: urlHost(header_referer)}, function(cookies) {
      for (var i=0; i<cookies.length; i++) {
        extension_api.cookies.remove({url: (cookies[i].secure ? "https://" : "http://") + cookies[i].domain + cookies[i].path, name: cookies[i].name});
      }
    });
  }

  if (!isSiteEnabled(details)) {
    return;
  }

  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  var domain;
  var blockedDomains = Object.keys(blockedRegexes);
  var blocked = true;
  if (((domain = matchUrlDomain(blockedDomains, details.url)) ||
       (domain = matchUrlDomain(blockedDomains, header_referer))) &&
      isSiteEnabled({url: domain}) &&
      details.url.match(blockedRegexes[domain]))
  {
    // allow BG paywall-script to set cookies in homepage/sections (else no article-text)
    if (domain == 'bostonglobe.com' &&
        (header_referer === 'https://www.bostonglobe.com/' ||
         header_referer.includes('/?p1=BGHeader_') ||
         header_referer.includes('/?p1=BGMenu_'))) {
      blocked = false;
    } else if (domain == 'theglobeandmail.com' && !(header_referer.includes('/article-'))) {
      blocked = false;
    }
    if (blocked) return { cancel: true };
  }

  var tabId = details.tabId;

  var setReferer = false;

  if (header_referer_idx == -1) {
      header_referer_idx = requestHeaders.length;
      requestHeaders.push({ name: 'Referer' });
  }

  // set Referer (which we might have added) to google
  var requestHeader = requestHeaders[header_referer_idx];
  if (details.url.includes('cooking.nytimes.com/api/v1/users/bootstrap')) {
    // this fixes images not being loaded on cooking.nytimes.com main page
    // referrer has to be *nytimes.com otherwise returns 403
    requestHeader.value = 'https://cooking.nytimes.com';
  } else if (matchUrlDomain(['wsj.com', 'ft.com', 'fd.nl'], details.url)) {
    requestHeader.value = 'https://www.facebook.com/';
  } else {
    requestHeader.value = 'https://www.google.com/';
  }

  // override User-Agent to use Googlebot
  if (matchUrlDomain(use_google_bot, details.url)) {
    if (user_agent_idx == -1) {
        user_agent_idx = requestHeaders.length;
        requestHeaders.push({ name: 'User-Agent' });
    }
    requestHeaders[user_agent_idx].value = useUserAgentMobile ? userAgentMobile : userAgentDesktop;
    requestHeaders.push({
      "name": "X-Forwarded-For",
      "value": "66.249.66.1"
    })
  }

  // remove cookies before page load
  if (!matchUrlDomain(allow_cookies, details.url)) {
    requestHeaders = requestHeaders.map(function(requestHeader) {
      if (requestHeader.name === 'Cookie') {
        requestHeader.value = '';
      }
      return requestHeader;
    });
  }

  if (tabId !== -1) {
    // run contentScript inside tab
    extension_api.tabs.executeScript(tabId, {
      file: 'common.js',
      runAt: 'document_start'
    });
    extension_api.tabs.executeScript(tabId, {
      file: 'contentScript.js',
      runAt: 'document_start'
    });
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['<all_urls>']
}, extraInfoSpec);

// remove cookies after page load
extension_api.webRequest.onCompleted.addListener(function(details) {
  var cookie_domain = matchUrlDomain(remove_cookies, details.url);
  if (!cookie_domain || !enabledSites.includes(cookie_domain)) return;
  extension_api.cookies.getAll({domain: cookie_domain}, function(cookies) {
    for (var i=0; i<cookies.length; i++) {
      var cookie = {
        url: (cookies[i].secure ? 'https://' : 'http://') + cookies[i].domain + cookies[i].path,
        name: cookies[i].name,
        storeId: cookies[i].storeId
      };
      // .firstPartyDomain = undefined on Chrome (doesn't support it)
      if (cookies[i].firstPartyDomain !== undefined) {
        cookie.firstPartyDomain = cookies[i].firstPartyDomain;
      }
      var rc_domain = cookies[i].domain.replace(/^(\.?www\.|\.)/, '');
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
}, {
  urls: ["<all_urls>"]
});

// Google Analytics to track DAU
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
  var enabledSite = matchUrlDomain(enabledSites, details.url);
  if (enabledSite in restrictions) {
    return restrictions[enabledSite].test(details.url);
  }
  return !!enabledSite;
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
