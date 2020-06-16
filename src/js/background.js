'use strict';

const restrictions = {
  'barrons.com': /.+barrons\.com\/articles\/.+/,
  'wsj.com': /(.+wsj\.com\/(articles|graphics)\/.+|.+blogs\.wsj\.com\/.+)/,
  'seekingalpha.com': /.+seekingalpha\.com\/article\/.+/
};

// Don't remove cookies before page load
const allowCookies = [
  'ad.nl',
  'asia.nikkei.com',
  'brisbanetimes.com.au',
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
  'brisbanetimes.com.au',
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
  'ntnews.com.au',
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
  'kansascity.com',
  'republic.ru'
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
  'businessinsider.com': /(.+\.tinypass\.com\/.+|cdn\.onesignal\.com\/sdks\/.+\.js)/,
  'chicagotribune.com': /.+:\/\/.+\.tribdss\.com\//,
  'economist.com': /(.+\.tinypass\.com\/.+|economist\.com\/_next\/static\/runtime\/main.+\.js)/,
  'foreignpolicy.com': /.+\.tinypass\.com\/.+/,
  'fortune.com': /.+\.tinypass\.com\/.+/,
  'haaretz.co.il': /haaretz\.co\.il\/htz\/js\/inter\.js/,
  'haaretz.com': /haaretz\.com\/hdc\/web\/js\/minified\/header-scripts-int.js.+/,
  'inquirer.com': /.+\.tinypass\.com\/.+/,
  'lastampa.it': /.+\.repstatic\.it\/minify\/sites\/lastampa\/.+\/config\.cache\.php\?name=social_js/,
  'lrb.co.uk': /.+\.tinypass\.com\/.+/,
  'nzherald.co.nz': /nzherald\.co\.nz\/.+\/headjs\/.+\.js/,
  'repubblica.it': /scripts\.repubblica\.it\/pw\/pw\.js.+/,
  'spectator.co.uk': /.+\.tinypass\.com\/.+/,
  'spectator.com.au': /.+\.tinypass\.com\/.+/,
  'telegraph.co.uk': /.+telegraph\.co\.uk.+martech.+/,
  'thecourier.com.au': /.+cdn-au\.piano\.io\/api\/tinypass.+\.js/,
  'theglobeandmail.com': /theglobeandmail\.com\/pb\/resources\/scripts\/build\/chunk-bootstraps\/.+\.js/,
  'thenation.com': /thenation\.com\/.+\/paywall-script\.php/,
  'thewrap.com': /thewrap\.com\/.+\/wallkit\.js/
};

// Allowed external scripts
const allowedRegexes = {
  'economist.com': /infographics.economist.com\/utils\/ai2html-resizer.*\.js/
};

const userAgentDesktop = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const userAgentMobile = 'Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)';

let enabledSites = [];

// Get the enabled sites
extensionApi.storage.sync.get({
  sites: {}
}, function (items) {
  enabledSites = Object.values(items.sites);
  if (extensionApi === chrome) {
    initGA();
  }
});

// Listen for changes to options
extensionApi.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.sites && changes.sites.newValue) {
    const sites = changes.sites.newValue;
    enabledSites = Object.values(sites);
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

extensionApi.tabs.onUpdated.addListener(function (tabId, info, tab) {
  updateBadge(tab);
});
extensionApi.tabs.onActivated.addListener(function (activeInfo) {
  extensionApi.tabs.get(activeInfo.tabId, updateBadge);
});

let cachedBadgeText = '';
function updateBadge (activeTab) {
  if (!activeTab) { return; }
  const badgeText = getBadgeText(activeTab.url);
  if (cachedBadgeText === badgeText) { return; }
  cachedBadgeText = badgeText;
  extensionApi.browserAction.setBadgeBackgroundColor({ color: 'blue' });
  extensionApi.browserAction.setBadgeText({ text: badgeText });
}

function getBadgeText (currentUrl) {
  return currentUrl && isSiteEnabled({ url: currentUrl }) ? 'ON' : '';
}

// Disable javascript for these sites
extensionApi.webRequest.onBeforeRequest.addListener(function (details) {
  if (!isSiteEnabled(details) && !enabledSites.includes('generalpaywallbypass')) {
    return;
  }
  // Don't block allowed scripts
  for (const domain in allowedRegexes) {
    if (isSameDomain(details.url, domain) && details.url.match(allowedRegexes[domain])) {
      return;
    }
  }
  return { cancel: true };
},
{
  urls: [
    '*://*.newstatesman.com/*',
    '*://*.outbrain.com/*',
    '*://*.piano.io/*',
    '*://*.poool.fr/*',
    '*://*.economist.com/*',
    '*://*.qiota.com/*',
    '*://*.tinypass.com/*'
  ],
  types: ['script']
},
['blocking']
);

const extraInfoSpec = ['blocking', 'requestHeaders'];
if (Object.prototype.hasOwnProperty.call(extensionApi.webRequest.OnBeforeSendHeadersOptions, 'EXTRA_HEADERS')) {
  extraInfoSpec.push('extraHeaders');
}

extensionApi.webRequest.onBeforeSendHeaders.addListener(function (details) {
  if (!isSiteEnabled(details)) {
    return;
  }

  let requestHeaders = details.requestHeaders;
  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  for (const domain in blockedRegexes) {
    if (isSiteEnabled({ url: domain }) && details.url.match(blockedRegexes[domain])) {
      if (isSameDomain(details.url, domain)) {
        return { cancel: true };
      }
    }
  }

  const tabId = details.tabId;
  let useUserAgentMobile = false;
  let setReferer = false;

  // if referer exists, set it to google
  requestHeaders = requestHeaders.map(function (requestHeader) {
    if (requestHeader.name === 'Referer') {
      if (details.url.includes('cooking.nytimes.com/api/v1/users/bootstrap')) {
        // this fixes images not being loaded on cooking.nytimes.com main page
        // referrer has to be *nytimes.com otherwise returns 403
        requestHeader.value = 'https://cooking.nytimes.com';
      } else if (isSameDomain(details.url, 'fd.nl')) {
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
    if (isSameDomain(details.url, 'fd.nl')) {
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
  const useGoogleBot = useGoogleBotSites.some(function (item) {
    return typeof item === 'string' && isSameDomain(details.url, item);
  });

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
  const enabledCookies = allowCookies.some(function (site) {
    return isSameDomain(details.url, site);
  });
  if (!enabledCookies) {
    requestHeaders = requestHeaders.map(function (requestHeader) {
      if (requestHeader.name === 'Cookie') {
        requestHeader.value = '';
      }
      return requestHeader;
    });
  }

  if (tabId !== -1) {
    extensionApi.tabs.get(tabId, function (currentTab) {
      // Validate url of current tab to avoid injecting script to unrelated sites
      if (currentTab && currentTab.url && isSiteEnabled(currentTab)) {
        // run contentScript inside tab
        extensionApi.tabs.executeScript(tabId, {
          file: 'src/js/contentScript.js',
          runAt: 'document_start'
        }, function (res) {
          if (extensionApi.runtime.lastError || res[0]) {

          }
        });
      }
    });
  }

  return { requestHeaders: requestHeaders };
}, {
  urls: ['<all_urls>']
}, extraInfoSpec);

// remove cookies after page load
extensionApi.webRequest.onCompleted.addListener(function (details) {
  let domainToRemove;
  for (const domain of removeCookies) {
    if (enabledSites.includes(domain) && isSameDomain(details.url, domain)) {
      domainToRemove = domain;
      break;
    }
  }
  if (domainToRemove) {
    extensionApi.cookies.getAll({ domain: domainToRemove }, function (cookies) {
      for (const ck of cookies) {
        const cookie = {
          url: (ck.secure ? 'https://' : 'http://') + ck.domain + ck.path,
          name: ck.name,
          storeId: ck.storeId
        };
        // .firstPartyDomain = undefined on Chrome (doesn't support it)
        if (ck.firstPartyDomain !== undefined) {
          cookie.firstPartyDomain = ck.firstPartyDomain;
        }
        const cookieDomain = ck.domain;
        const rcDomain = cookieDomain.replace(/^(\.?www\.|\.)/, '');
        // hold specific cookie(s) from removeCookies domains
        if ((rcDomain in removeCookiesSelectHold) && removeCookiesSelectHold[rcDomain].includes(ck.name)) {
          continue; // don't remove specific cookie
        }
        // drop only specific cookie(s) from removeCookies domains
        if ((rcDomain in removeCookiesSelectDrop) && !(removeCookiesSelectDrop[rcDomain].includes(ck.name))) {
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
    const useSite = isSameDomain(details.url, enabledSite);
    if (enabledSite in restrictions) {
      return useSite && details.url.match(restrictions[enabledSite]);
    }
    return useSite;
  });
  return isEnabled;
}

function isSameDomain (url, domain) {
  if (url.indexOf('http') !== 0) {
    // Not start with http or https, add a prefix
    url = 'http://' + url;
  }
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    return hostname === domain || hostname.endsWith('.' + domain);
  } catch (err) {
    return false;
  }
}
