'use strict';

const restrictions = {
  'adweek.com': /^((?!\.adweek\.com\/(.+\/)?(amp|agencyspy|tvnewser|tvspy)\/).)*$/,
  'barrons.com': /.+barrons\.com\/(amp\/)?article(s)?\/.+/,
  'economist.com': /.+economist\.com\/.+\/\d{1,4}\/\d{1,2}\/\d{2}\/.+/,
  'seekingalpha.com': /.+seekingalpha\.com\/article\/.+/
};

// Don't remove cookies before page load
const allowCookies = [
  'ad.nl',
  'asia.nikkei.com',
  'bd.nl',
  'bndestem.nl',
  'brisbanetimes.com.au',
  'canberratimes.com.au',
  'cen.acs.org',
  'chicagobusiness.com',
  'demorgen.be',
  'denverpost.com',
  'destentor.nl',
  'ed.nl',
  'examiner.com.au',
  'ft.com',
  'gelderlander.nl',
  'grubstreet.com',
  'harpers.org',
  'hbr.org',
  'humo.be',
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
  'pzc.nl',
  'qz.com',
  'scientificamerican.com',
  'seattletimes.com',
  'seekingalpha.com',
  'sofrep.com',
  'spectator.co.uk',
  'tubantia.nl',
  'techinasia.com',
  'telegraaf.nl',
  'the-american-interest.com',
  'theadvocate.com.au',
  'theage.com.au',
  'theatlantic.com',
  'theaustralian.com.au',
  'thecut.com',
  'thediplomat.com',
  'themercury.com.au',
  'thestar.com',
  'towardsdatascience.com',
  'trouw.nl',
  'vn.nl',
  'volkskrant.nl',
  'vulture.com',
  'washingtonpost.com',
  'wired.com',
  'nzz.ch',
  'handelsblatt.com',
  'thehindu.com',
  'financialpost.com',
  'haaretz.co.il',
  'haaretz.com',
  'themarker.com',
  'sueddeutsche.de'
];

// Removes cookies after page load
const removeCookies = [
  'ad.nl',
  'asia.nikkei.com',
  'bd.nl',
  'bloombergquint.com',
  'bndestem.nl',
  'brisbanetimes.com.au',
  'canberratimes.com.au',
  'cen.acs.org',
  'chicagobusiness.com',
  'demorgen.be',
  'denverpost.com',
  'destentor.nl',
  'ed.nl',
  'examiner.com.au',
  'ft.com',
  'gelderlander.nl',
  'globes.co.il',
  'grubstreet.com',
  'harpers.org',
  'hbr.org',
  'humo.be',
  'lesechos.fr',
  'mercurynews.com',
  'mexiconewsdaily.com',
  'newstatesman.com',
  'nrc.nl',
  'nymag.com',
  'ocregister.com',
  'pzc.nl',
  'qz.com',
  'scientificamerican.com',
  'seattletimes.com',
  'sofrep.com',
  'spectator.co.uk',
  'telegraaf.nl',
  'theadvocate.com.au',
  'theage.com.au',
  'theatlantic.com',
  'thecut.com',
  'thediplomat.com',
  'thestar.com',
  'towardsdatascience.com',
  'tubantia.nl',
  'vn.nl',
  'vulture.com',
  'wired.com',
  'wsj.com'
];

// Contains remove cookie sites above plus any custom sites
let _removeCookies = removeCookies;

// select specific cookie(s) to hold from removeCookies domains
const removeCookiesSelectHold = {
  'qz.com': ['gdpr'],
  'wsj.com': ['wsjregion'],
  'seattletimes.com': ['st_newsletter_splash_seen']
};

// select only specific cookie(s) to drop from removeCookies domains
const removeCookiesSelectDrop = {
  'ad.nl': ['temptationTrackingId'],
  'ambito.com': ['TDNotesRead'],
  'bd.nl': ['temptationTrackingId'],
  'bndestem.nl': ['temptationTrackingId'],
  'demorgen.be': ['TID_ID'],
  'destentor.nl': ['temptationTrackingId'],
  'ed.nl': ['temptationTrackingId'],
  'fd.nl': ['socialread'],
  'gelderlander.nl': ['temptationTrackingId'],
  'humo.be': ['TID_ID'],
  'nrc.nl': ['counter'],
  'pzc.nl': ['temptationTrackingId'],
  'tubantia.nl': ['temptationTrackingId']
};

// Override User-Agent with Googlebot
const useGoogleBotSites = [
  'adelaidenow.com.au',
  'barrons.com',
  'couriermail.com.au',
  'dailytelegraph.com.au',
  'fd.nl',
  'genomeweb.com',
  'heraldsun.com.au',
  'lavoixdunord.fr',
  'mexiconewsdaily.com',
  'ntnews.com.au',
  'quora.com',
  'seekingalpha.com',
  'telegraph.co.uk',
  'theaustralian.com.au',
  'themercury.com.au',
  'thenational.scot',
  'thetimes.co.uk',
  'wsj.com',
  'kansascity.com',
  'republic.ru',
  'nzz.ch',
  'handelsblatt.com',
  'washingtonpost.com',
  'df.cl'
];

// Override User-Agent with Bingbot
const useBingBot = [
  'haaretz.co.il',
  'haaretz.com',
  'themarker.com'
];

// Contains google bot sites above plus any custom sites
let _useGoogleBotSites = useGoogleBotSites;

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
  'economist.com': /(.+\.tinypass\.com\/.+|economist\.com\/engassets\/_next\/static\/chunks\/framework.+\.js)/,
  'editorialedomani.it': /(js\.pelcro\.com\/.+|editorialedomani.it\/pelcro\.js)/,
  'foreignpolicy.com': /.+\.tinypass\.com\/.+/,
  'fortune.com': /.+\.tinypass\.com\/.+/,
  'haaretz.co.il': /haaretz\.co\.il\/htz\/js\/inter\.js/,
  'haaretz.com': /haaretz\.com\/hdc\/web\/js\/minified\/header-scripts-int.js.+/,
  'inquirer.com': /.+\.tinypass\.com\/.+/,
  'lastampa.it': /.+\.repstatic\.it\/minify\/sites\/lastampa\/.+\/config\.cache\.php\?name=social_js/,
  'lrb.co.uk': /.+\.tinypass\.com\/.+/,
  'medscape.com': /.+\.medscapestatic\.com\/.*medscape-library\.js/,
  'interest.co.nz': /(.+\.presspatron\.com.+|.+interest\.co\.nz.+pp-ablock-banner\.js)/,
  'repubblica.it': /scripts\.repubblica\.it\/pw\/pw\.js.+/,
  'spectator.co.uk': /.+\.tinypass\.com\/.+/,
  'spectator.com.au': /.+\.tinypass\.com\/.+/,
  'telegraph.co.uk': /.+telegraph\.co\.uk.+martech.+/,
  'thecourier.com.au': /.+cdn-au\.piano\.io\/api\/tinypass.+\.js/,
  'thenation.com': /thenation\.com\/.+\/paywall-script\.php/,
  'thenational.scot': /(.+\.tinypass\.com\/.+|.+thenational\.scot.+omniture\.js|.+thenational\.scot.+responsive-sync.+)/,
  'thewrap.com': /thewrap\.com\/.+\/wallkit\.js/,
  'wsj.com': /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
  'historyextra.com': /.+\.evolok\.net\/.+\/authorize\/.+/,
  'barrons.com': /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
  'irishtimes.com': /cdn\.ampproject\.org\/v\d\/amp-access-.+\.js/,
  'elmercurio.com': /(merreader\.emol\.cl\/assets\/js\/merPramV2.js|staticmer\.emol\.cl\/js\/inversiones\/PramModal.+\.js)/,
  'sloanreview.mit.edu': /(.+\.tinypass\.com\/.+|.+\.netdna-ssl\.com\/wp-content\/themes\/smr\/assets\/js\/libs\/welcome-ad\.js)/,
  'latercera.com': /.+\.cxense\.com\/+/,
  'lesechos.fr': /.+\.tinypass\.com\/.+/,
  'washingtonpost.com': /.+\.washingtonpost\.com\/.+\/pwapi-proxy\.min\.js/,
  'thehindu.com': /ajax\.cloudflare\.com\/cdn-cgi\/scripts\/.+\/cloudflare-static\/rocket-loader\.min\.js/,
  'technologyreview.com': /.+\.blueconic\.net\/.+/,
  'spectator.us': /(cdn\.cxense\.com\/.+|\.tinypass\.com\/.+)/
};

const userAgentDesktop = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const userAgentMobile = 'Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible ; Googlebot/2.1 ; +http://www.google.com/bot.html)';
const userAgentDesktopBingBot = 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)';
const userAgentMobileBingBot = 'Chrome/80.0.3987.92 Mobile Safari/537.36 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)';

let enabledSites = [];

// Get the enabled sites
extensionApi.storage.sync.get({
  sites: {},
  customSites: []
}, function (items) {
  enabledSites = Object.values(items.sites).concat(items.customSites);

  // Use googlebot UA for custom sites
  _useGoogleBotSites = useGoogleBotSites.concat(items.customSites);

  // Remove cookies for custom sites
  _removeCookies = removeCookies.concat(items.customSites);

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

function updateBadge (activeTab) {
  if (extensionApi.runtime.lastError || !activeTab) { return; }
  const badgeText = getBadgeText(activeTab.url);
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
  return { cancel: true };
},
{
  urls: [
    '*://*.newstatesman.com/*',
    '*://*.outbrain.com/*',
    '*://*.piano.io/*',
    '*://*.poool.fr/*',
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
  let requestHeaders = details.requestHeaders;

  let headerReferer = '';
  for (const n in requestHeaders) {
    if (requestHeaders[n].name.toLowerCase() === 'referer') {
      headerReferer = requestHeaders[n].value;
      continue;
    }
  }

  // check for blocked regular expression: domain enabled, match regex, block on an internal or external regex
  const blockedDomains = Object.keys(blockedRegexes);
  const domain = matchUrlDomain(blockedDomains, headerReferer);
  if (domain && details.url.match(blockedRegexes[domain]) && isSiteEnabled({ url: headerReferer })) {
    return { cancel: true };
  }

  if (!isSiteEnabled(details)) {
    return;
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
      } else if (matchUrlDomain('fd.nl', details.url)) {
        requestHeader.value = 'https://www.facebook.com/';
      } else if (matchUrlDomain('medium.com', details.url)) {
        requestHeader.value = 'https://t.co/x?amp=1'
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
    if (matchUrlDomain('fd.nl', details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.facebook.com/'
      });
    } else if (matchUrlDomain('medium.com', details.url)) {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://t.co/x?amp=1'
      });
    } else {
      requestHeaders.push({
        name: 'Referer',
        value: 'https://www.google.com/'
      });
    }
  }

  // override User-Agent to use Googlebot
  const useGoogleBot = _useGoogleBotSites.some(function (item) {
    return typeof item === 'string' && matchUrlDomain(item, details.url);
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

  // override User-Agent to use Bingbot
  if (matchUrlDomain(useBingBot, details.url)) {
    requestHeaders.push({
      name: 'User-Agent',
      value: useUserAgentMobile ? userAgentMobileBingBot : userAgentDesktopBingBot
    });
  }

  // remove cookies before page load
  const enabledCookies = allowCookies.some(function (site) {
    return matchUrlDomain(site, details.url);
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
  for (const domain of _removeCookies) {
    if (enabledSites.includes(domain) && matchUrlDomain(domain, details.url)) {
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
  const enabledSite = matchUrlDomain(enabledSites, details.url);
  if (enabledSite in restrictions) {
    return restrictions[enabledSite].test(details.url);
  }
  return !!enabledSite;
}

function matchUrlDomain (domains, url) {
  return matchDomain(domains, urlHost(url));
}

function matchDomain (domains, hostname) {
  let matchedDomain = false;
  if (!hostname) { hostname = window.location.hostname; }
  if (typeof domains === 'string') { domains = [domains]; }
  domains.some(domain => (hostname === domain || hostname.endsWith('.' + domain)) && (matchedDomain = domain));
  return matchedDomain;
}

function urlHost (url) {
  if (url && url.startsWith('http')) {
    try {
      return new URL(url).hostname;
    } catch (e) {
      console.log(`url not valid: ${url} error: ${e}`);
    }
  }
  return url;
}
