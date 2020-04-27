'use strict';

const restrictions = {
  'barrons.com': /.+barrons\.com\/articles\/.+/,
  'wsj.com': /(.+wsj\.com\/(articles|graphics)\/.+|.+blogs\.wsj\.com\/.+)/
};

// Don't remove cookies before page load
const allowCookies = [
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
  'miamiherald.com',
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
  'theathletic.co.uk',
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
  'wired.com'
];

// Removes cookies after page load
const removeCookies = [
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
  'miamiherald.com',
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
  'wsj.com'
];

// select specific cookie(s) to hold from removeCookies domains
const removeCookiesSelectHold = {
  'qz.com': ['gdpr'],
  'washingtonpost.com': ['wp_gdpr'],
  'wsj.com': ['wsjregion']
};

// select only specific cookie(s) to drop from removeCookies domains
const removeCookiesSelectDrop = {
  'ad.nl': ['temptationTrackingId'],
  'ed.nl': ['temptationTrackingId'],
  'bostonglobe.com': ['FMPaywall'],
  'demorgen.be': ['TID_ID'],
  'economist.com': ['rvuuid'],
  'fd.nl': ['socialread'],
  'nrc.nl': ['counter']
};

// Override User-Agent with Googlebot
const useGoogleBotSites = [
  'adelaidenow.com.au',
  'barrons.com',
  'couriermail.com.au',
  'dailytelegraph.com.au',
  'fd.nl',
  'genomeweb.com',
  'haaretz.co.il',
  'haaretz.com',
  'heraldsun.com.au',
  'mexiconewsdaily.com',
  'miamiherald.com',
  'ntnews.com.au',
  'nytimes.com',
  'quora.com',
  'seekingalpha.com',
  'telegraph.co.uk',
  'theathletic.com',
  'theathletic.co.uk',
  'theaustralian.com.au',
  'themarker.com',
  'themercury.com.au',
  'thetimes.co.uk',
  'wsj.com',
  'kansascity.com'
];

function setDefaultOptions () {
  extensionApi.storage.sync.set({
    sites: defaultSites
  }, function () {
    extensionApi.runtime.openOptionsPage();
  });
}

// Block external scripts
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
  'thewrap.com': /thewrap\.com\/.+\/wallkit\.js/
};

const userAgentDesktop = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const userAgentMobile = 'Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)';

let enabledSites = [];

// Get the enabled sites
extensionApi.storage.sync.get({
  sites: {}
}, function (items) {
  enabledSites = Object.keys(items.sites).map(function (key) {
    return items.sites[key];
  });
  if (extensionApi === chrome) {
    initGA();
  }
});

// Listen for changes to options
extensionApi.storage.onChanged.addListener(function (changes, namespace) {
  let key;
  for (key in changes) {
    const storageChange = changes[key];
    if (key === 'sites') {
      const sites = storageChange.newValue;
      enabledSites = Object.keys(sites).map(function (key) {
        return sites[key];
      });
    }
  }
});

// Set and show default options on install
extensionApi.runtime.onInstalled.addListener(function (details) {
  if (details.reason === 'install') {
    setDefaultOptions();
  } else if (details.reason === 'update') {
    // User updated extension
  }
});

extensionApi.tabs.onUpdated.addListener(updateBadge);
extensionApi.tabs.onActivated.addListener(updateBadge);

function updateBadge () {
  extensionApi.tabs.query({
    active: true,
    currentWindow: true
  }, function (arrayOfTabs) {
    const activeTab = arrayOfTabs[0];
    if (!activeTab) { return; }
    const badgeText = getBadgeText(activeTab.url);
    extensionApi.browserAction.setBadgeBackgroundColor({ color: 'blue' });
    extensionApi.browserAction.setBadgeText({ text: badgeText });
  });
}

function getBadgeText (currentUrl) {
  return currentUrl && isSiteEnabled({ url: currentUrl }) ? 'ON' : '';
}

// Disable javascript for these sites
extensionApi.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details) && !enabledSites.some(function (enabledSite) {
    return enabledSite.indexOf('generalpaywallbypass') !== -1;
  })) {
    return;
  }
  return { cancel: true };
},
{
  urls: [
    '*://*.newstatesman.com/*',
    '*://*.outbrain.com/*',
    '*://*.piano.io/*',
    '*://*.poool.fr/*',
    '*://*.tinypass.com/*'
  ],
  types: ['script']
},
['blocking']
);

var extraInfoSpec = ['blocking', 'requestHeaders'];
if (Object.prototype.hasOwnProperty.call(extensionApi.webRequest.OnBeforeSendHeadersOptions, 'EXTRA_HEADERS')) {
  extraInfoSpec.push('extraHeaders');
}

extensionApi.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var requestHeaders = details.requestHeaders;

  var headerReferer = '';
  for (const n in requestHeaders) {
    if (requestHeaders[n].name.toLowerCase() === 'referer') {
      headerReferer = requestHeaders[n].value;
      continue;
    }
  }

  // remove cookies for sites medium platform (mainfest.json needs in permissions: <all_urls>)
  if (isSiteEnabled({ url: '.medium.com' }) && details.url.indexOf('cdn-client.medium.com') !== -1 && headerReferer.indexOf('.medium.com') === -1) {
    var domainVar = new URL(headerReferer).hostname;
    extensionApi.cookies.getAll({ domain: domainVar }, function (cookies) {
      for (let i = 0; i < cookies.length; i++) {
        extensionApi.cookies.remove({ url: (cookies[i].secure ? 'https://' : 'http://') + cookies[i].domain + cookies[i].path, name: cookies[i].name });
      }
    });
  }

  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  for (const domain in blockedRegexes) {
    if ((isSiteEnabled({ url: '.' + domain }) || isSiteEnabled({ url: headerReferer })) && details.url.match(blockedRegexes[domain])) {
      // allow BG paywall-script to set cookies in homepage/sections (else no article-text)
      if (details.url.indexOf(domain) !== -1 || headerReferer.indexOf(domain) !== -1) {
        if (details.url.indexOf('meter.bostonglobe.com/js/') !== -1 && (headerReferer === 'https://www.bostonglobe.com/' ||
            headerReferer.indexOf('/?p1=BGHeader_') !== -1 || headerReferer.indexOf('/?p1=BGMenu_') !== -1)) {
          extensionApi.webRequest.handlerBehaviorChanged(function () {});
          break;
        } else if (headerReferer.indexOf('theglobeandmail.com') !== -1 && !(headerReferer.indexOf('/article-') !== -1)) {
          extensionApi.webRequest.handlerBehaviorChanged(function () {});
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
  requestHeaders = requestHeaders.map(function (requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (details.url.indexOf('cooking.nytimes.com/api/v1/users/bootstrap') !== -1) {
        // this fixes images not being loaded on cooking.nytimes.com main page
        // referrer has to be *nytimes.com otherwise returns 403
        requestHeader.value = 'https://cooking.nytimes.com';
      } else if (details.url.indexOf('wsj.com') !== -1 || details.url.indexOf('ft.com') !== -1 || details.url.indexOf('fd.nl') !== -1) {
        requestHeader.value = 'https://www.facebook.com/';
      } else {
        requestHeader.value = 'https://www.google.com/';
      }
      setReferer = true;
    }
    if (requestHeader.name === 'User-Agent') {
      useUserAgentMobile = requestHeader.value.toLowerCase().includes('mobile');
    }

    return requestHeader;
  });

  // otherwise add it
  if (!setReferer) {
    if (details.url.indexOf('wsj.com') !== -1 || details.url.indexOf('ft.com') !== -1 || details.url.indexOf('fd.nl') !== -1) {
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
  const useGoogleBot = useGoogleBotSites.filter(function (item) {
    return typeof item === 'string' && details.url.indexOf(item) > -1;
  }).length > 0;

  if (useGoogleBot) {
    requestHeaders.push({
      name: 'User-Agent',
      value: useUserAgentMobile ? userAgentMobile : userAgentDesktop
    });
    requestHeaders.push({
      name: 'X-Forwarded-For',
      value: '66.249.66.1'
    });
  }

  // remove cookies before page load
  requestHeaders = requestHeaders.map(function (requestHeader) {
    for (const siteIndex in allowCookies) {
      if (details.url.indexOf(allowCookies[siteIndex]) !== -1) {
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
    extensionApi.tabs.executeScript(tabId, {
      file: 'src/js/contentScript.js',
      runAt: 'document_start'
    }, function (res) {
      if (extensionApi.runtime.lastError || res[0]) {

      }
    });
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['<all_urls>']
}, extraInfoSpec);

// remove cookies after page load
extensionApi.webRequest.onCompleted.addListener(function (details) {
  for (const domainIndex in removeCookies) {
    const domainVar = removeCookies[domainIndex];
    if (!enabledSites.includes(domainVar) || details.url.indexOf(domainVar) === -1) {
      continue; // don't remove cookies
    }
    extensionApi.cookies.getAll({ domain: domainVar }, function (cookies) {
      for (let i = 0; i < cookies.length; i++) {
        const cookie = {
          url: (cookies[i].secure ? 'https://' : 'http://') + cookies[i].domain + cookies[i].path,
          name: cookies[i].name,
          storeId: cookies[i].storeId
        };
        // .firstPartyDomain = undefined on Chrome (doesn't support it)
        if (cookies[i].firstPartyDomain !== undefined) {
          cookie.firstPartyDomain = cookies[i].firstPartyDomain;
        }
        const cookieDomain = cookies[i].domain;
        const rcDomain = cookieDomain.replace(/^(\.?www\.|\.)/, '');
        // hold specific cookie(s) from removeCookies domains
        if ((rcDomain in removeCookiesSelectHold) && removeCookiesSelectHold[rcDomain].includes(cookies[i].name)) {
          continue; // don't remove specific cookie
        }
        // drop only specific cookie(s) from removeCookies domains
        if ((rcDomain in removeCookiesSelectDrop) && !(removeCookiesSelectDrop[rcDomain].includes(cookies[i].name))) {
          continue; // only remove specific cookie
        }
        extensionApi.cookies.remove(cookie);
      }
    });
  }
}, {
  urls: ['<all_urls>']
});

// Google Analytics to anonymously track DAU (Chrome only)
function initGA () {
  (function (i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-69824169-2', 'auto');
  ga('set', 'checkProtocolTask', null);
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');
}

function isSiteEnabled (details) {
  const isEnabled = enabledSites.some(function (enabledSite) {
    const useSite = (details.url.indexOf('.' + enabledSite) !== -1 || details.url.indexOf('/' + enabledSite) !== -1);
    if (enabledSite in restrictions) {
      return useSite && details.url.match(restrictions[enabledSite]);
    }
    return useSite;
  });
  return isEnabled;
}
