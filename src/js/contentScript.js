var localStorageHoldArray = ['sfchronicle.com', 'cen.acs.org'];
var localStorageHold = localStorageHoldArray.some(function (url) {
  return window.location.href.includes(url);
});

if (!localStorageHold) {
  window.localStorage.clear();
}

if (matchDomain('rep.repubblica.it')) {
  if (window.location.href.includes('/pwa/')) {
    setTimeout(function () {
      window.location.href = window.location.href.replace('/pwa/', '/ws/detail/');
    }, 400);
  }
  if (window.location.href.includes('/ws/detail/')) {
    const paywall = document.querySelector('.paywall[subscriptions-section="content"]');
    if (paywall) {
      paywall.removeAttribute('subscriptions-section');
      const preview = document.querySelector('div[subscriptions-section="content-not-granted"]');
      if (preview) {
        preview.remove();
      }
    }
  }
}

if (matchDomain('americanbanker.com')) {
  const paywall = document.getElementsByClassName('embargo-content')[0];
  if (paywall) { paywall.classList.remove('embargo-content'); }
}

if (matchDomain('telegraaf.nl')) {
  if (window.location.href.startsWith('https://www.telegraaf.nl/error?ref=/')) {
    window.location.href = window.location.href.split('&')[0].replace('error?ref=/', '');
  }
  const articleWrapper = document.querySelector('.ArticlePageWrapper__uid');
  const spotXBanner = document.querySelector('.ArticleBodyBlocks__inlineArticleSpotXBanner');
  const paywall = document.querySelector('.PopupBackdrop__block');
  removeDOMElement(spotXBanner, paywall);
  const premium = document.querySelector('.PremiumLabelWithLine__body');
  const articleId = articleWrapper ? articleWrapper.innerText : '123';
  const articleBodyDone = document.querySelector('#articleBody' + articleId);
  if (premium && !articleBodyDone) {
    const articleBodyOld = document.querySelector('[id^=articleBody]');
    removeDOMElement(articleBodyOld);
    const json = document.querySelector('script[type="application/ld+json"][data-react-helmet="true"]');
    if (json) {
      const jsonText = JSON.parse(json.text).articleBody;
      const articleBody = document.querySelector('section.TextArticlePage__bodyText');
      if (articleBody) {
        const divMain = document.createElement('div');
        divMain.setAttribute('id', 'articleBody' + articleId);
        const divElem = document.createElement('div');
        divElem.setAttribute('data-element', 'articleBodyBlocks');
        const textArray = jsonText.split('\n\n');
        textArray.forEach(pText => {
          const pDiv = document.createElement('p');
          pDiv.setAttribute('class', 'ArticleBodyBlocks__paragraph ArticleBodyBlocks__paragraph--nieuws');
          pDiv.innerText = pText;
          divElem.appendChild(pDiv);
        });
        divMain.appendChild(divElem);
        articleBody.appendChild(divMain);
      }
    }
  }
}

if (matchDomain(['ad.nl', 'ed.nl'])) {
  const paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
  removeDOMElement(paywall);
}

if (matchDomain('washingtonpost.com')) {
  if (window.location.href.includes('/gdpr-consent/')) {
    const freeButton = document.querySelector('.gdpr-consent-container .continue-btn.button.free');
    if (freeButton) { freeButton.click(); }

    setTimeout(function () {
      const gdprcheckbox = document.querySelector('.gdpr-consent-container .consent-page:not(.hide) #agree');
      if (gdprcheckbox) {
        gdprcheckbox.checked = true;
        gdprcheckbox.dispatchEvent(new Event('change'));

        document.querySelector('.gdpr-consent-container .consent-page:not(.hide) .continue-btn.button.accept-consent').click();
      }
    }, 300); // Delay (in milliseconds)
  }
}

if (matchDomain('wsj.com')) {
  if (window.location.href.includes('/articles/')) {
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) { closeButton.click(); }
  }
}

if (matchDomain('sloanreview.mit.edu')) {
  document.querySelector('#cboxClose').click();
}

if (matchDomain('mexiconewsdaily.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const sideNotification = document.querySelector('.pigeon-widget-prompt');
    const subMessage = document.querySelector('.sub_message_container');
    const popup = document.querySelector('.popupally-pro-outer-full-width-7-fluid_qemskqa');
    const bgFocusRemoverId = document.getElementById('popup-box-pro-gfcr-7');

    removeDOMElement(sideNotification, subMessage, popup, bgFocusRemoverId);
  });
}

if (matchDomain('miamiherald.com')) {
  // Accept cookie to close the banner
  const acceptBtn = document.querySelector('#onetrust-accept-btn-handler');
  if (acceptBtn) {
    acceptBtn.click();
  }
}

if (matchDomain('theathletic.com') || matchDomain('theathletic.co.uk')) {
  const landingBanner = document.querySelector('.logged-out-landing-banner');
  const sampleBanner = document.querySelector('.main-sample-banner');
  const bottomBanner = document.querySelector('.border-bottom-cc');
  const subscribe = document.querySelector('.subscribe-ad-text');
  removeDOMElement(landingBanner, sampleBanner, bottomBanner, subscribe);
}

if (matchDomain('the-american-interest.com')) {
  const counter = document.getElementById('article-counter');
  removeDOMElement(counter);
}

if (matchDomain('nzherald.co.nz')) {
  const paywall = document.getElementById('article-content');
  if (paywall) {
    const premium = document.getElementsByClassName('premium-sub')[0];
    removeDOMElement(premium);
    paywall.classList.remove('premium-content');
    paywall.classList.add('full-content');
    removeClassesByPrefix(paywall, 'QUnW');
    const paras = paywall.querySelectorAll('p, span, h2, div');
    for (const para of paras) {
      removeClassesByPrefix(para, 'QUnW');
      para.classList.remove('ellipsis');
      para.removeAttribute('style');
    }
  }
}

if (matchDomain('thestar.com')) {
  setTimeout(function () {
    const paywall = document.querySelector('.basic-paywall-new');
    removeDOMElement(paywall);
    const tbc = document.querySelectorAll('.text-block-container');
    for (let i = 0; i < tbc.length; i++) {
      tbc[i].removeAttribute('style');
    }
  }, 1000); // Delay (in milliseconds)
}

if (matchDomain('afr.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const hiddenImage = document.querySelectorAll('img');
    for (let i = 0; i < hiddenImage.length; i++) {
      const src = hiddenImage[i].src;
      if ('src: ' + src.indexOf('.gif') !== -1) {
        const dataSrc = hiddenImage[i].getAttribute('data-src');
        if (dataSrc) { hiddenImage[i].setAttribute('src', dataSrc); }
      }
    }
    const plista = document.querySelector('div[data-plista-placement="underArticle_Group"]');
    removeDOMElement(plista);
  });
}

if (matchDomain(['parool.nl', 'trouw.nl', 'volkskrant.nl', 'demorgen.be'])) {
  document.addEventListener('DOMContentLoaded', () => {
    const paywall = document.querySelector('div[data-temptation-position="ARTICLE_BOTTOM"]');
    const hiddenSection = document.querySelector('div[data-temptation-position="ARTICLE_INLINE"]');
    removeDOMElement(paywall, hiddenSection);
  });
}

if (matchDomain('firstthings.com')) {
  const paywall = document.getElementsByClassName('paywall')[0];
  removeDOMElement(paywall);
}

if (matchDomain('fortune.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const paywall = document.getElementById('freestar-instream-content');
    if (paywall) {
      paywall.classList.remove('tp-container-inner');
    }
    const paywallJunk = document.getElementById('article_overlay');
    if (paywallJunk) {
      paywallJunk.classList.remove('ntv-moap');
    }
    const ptags = paywallJunk.getElementsByTagName('p');
    const h3tags = paywallJunk.getElementsByTagName('h3');
    for (let i = 0; i < ptags.length; i++) {
      ptags[i].removeAttribute('style');
    }
    for (let i = 0; i < h3tags.length; i++) {
      h3tags[i].removeAttribute('style');
    }
  });
}

if (matchDomain('bloomberg.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const fence = document.querySelector('.fence-body');
    if (fence) {
      fence.classList.remove('fence-body');
    }
    const paywall = document.getElementById('paywall-banner');
    removeDOMElement(paywall);
  });
}

if (matchDomain('bloombergquint.com')) {
  const articlesLeftModal = document.getElementsByClassName('paywall-meter-module__story-paywall-container__1UgCE')[0];
  const paywall = document.getElementById('paywallDmp');
  removeDOMElement(articlesLeftModal, paywall);
}

if (matchDomain('medium.com')) {
  const bottomMessageText = 'Get one more story in your member preview when you sign up. It’s free.';
  const DOMElementsToTextDiv = pageContains('div', bottomMessageText);
  if (DOMElementsToTextDiv[2]) removeDOMElement(DOMElementsToTextDiv[2]);
}

if (matchDomain('theglobeandmail.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const lazyImage = document.querySelectorAll('.js-lazyimage');
    for (let i = 0; i < lazyImage.length; i++) {
      lazyImage[i].classList.remove('js-lazyimage');
    }
    const hiddenImage = document.querySelectorAll('img');
    for (let i = 0; i < hiddenImage.length; i++) {
      const src = hiddenImage[i].src;
      if (src.indexOf('data:image/gif') !== -1) {
        const dataSrc = hiddenImage[i].getAttribute('data-src');
        if (dataSrc) { hiddenImage[i].setAttribute('src', dataSrc); }
        const dataBg = hiddenImage[i].getAttribute('data-bg');
        if (dataBg) { hiddenImage[i].setAttribute('src', dataBg); }
      }
    }
  });
}

if (matchDomain(['examiner.com.au', 'thecourier.com.au', 'theadvocate.com.au'])) {
  const subscribeTruncate = document.querySelector('.subscribe-truncate');
  if (subscribeTruncate) { subscribeTruncate.classList.remove('subscribe-truncate'); }
  const subscriberHider = document.querySelectorAll('.subscriber-hider');
  for (let i = 0; i < subscriberHider.length; i++) {
    subscriberHider[i].classList.remove('subscriber-hider');
  }
}

if (matchDomain('canberratimes.com.au')) {
  const paywall = document.querySelector('.subscribe-article.news-article-body.article__body');
  paywall.classList.remove('subscribe-article');
  const subscribe = document.getElementsByClassName('subscriber-container')[0];
  removeDOMElement(subscribe);
  const content = document.getElementsByClassName('subscriber-hider');
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove('subscriber-hider');
  }
}

if (matchDomain('asia.nikkei.com')) {
  const cookieBanner = document.querySelector('.pw-widget');
  removeDOMElement(cookieBanner);
}

if (matchDomain('ledevoir.com')) {
  const counter = document.querySelector('.full.hidden-print.popup-msg');
  removeDOMElement(counter);
}

if (matchDomain('ft.com')) {
  const cookieBanner = document.querySelector('.cookie-banner');
  removeDOMElement(cookieBanner);
}

if (matchDomain('thehindu.com')) {
  const paywall = document.getElementById('test');
  removeDOMElement(paywall);
}

if (matchDomain('nytimes.com')) {
  const previewButton = document.querySelector('.css-3s1ce0');
  if (previewButton) { previewButton.click(); }
}

if (matchDomain('technologyreview.com')) {
  // The class of banner is like 'overlayFooter__wrapper--3DhFn', which is hard to select exactly
  const subscribeBanner = document.querySelector('[class*=overlayFooter__wrapper]');
  removeDOMElement(subscribeBanner);
}

if (matchDomain('leparisien.fr')) {
  window.removeEventListener('scroll', this.scrollListener);
  const paywall = document.querySelector('.relative.piano-paywall.below_nav.sticky');
  removeDOMElement(paywall);
  setTimeout(function () {
    const content = document.getElementsByClassName('content');
    for (let i = 0; i < content.length; i++) {
      content[i].removeAttribute('style');
    }
  }, 300); // Delay (in milliseconds)
}

if (matchDomain('caixinglobal.com')) {
  const payTip = document.querySelectorAll('.cons-pay-tip');
  for (let i = 0; i < payTip.length; i++) {
    payTip[i].removeAttribute('style');
  }
  const appContent = document.getElementById('appContent');
  if (appContent) {
    const pHidden = document.querySelectorAll('p:not([style="display:block;"]');
    for (let i = 0; i < pHidden.length; i++) {
      pHidden[i].setAttribute('style', 'display:block;');
    }
  }
}

if (matchDomain('economist.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const subscribe = document.querySelector('.subscription-proposition');
    const advert = document.querySelector('.advert');
    const wrapper = document.getElementById('bottom-page-wrapper');
    removeDOMElement(subscribe, advert, wrapper);
    setTimeout(function () {
      const paywall = document.querySelector('.layout-article-regwall');
      if (paywall) {
        window.location.reload(true);
      }
    }, 500); // Delay (in milliseconds)
    const pArticle = document.querySelectorAll('p.article__body-text');
    let href;
    for (let i = 0; i < pArticle.length; i++) {
      const anchor = document.querySelectorAll('a');
      href = '';
      for (let j = 0; j < anchor.length; j++) {
        if (anchor[j].href) {
          href = anchor[j].href;
        } else {
          anchor[j].href = href;
        }
      }
    }
  });
}

if (matchDomain('bizjournals.com')) {
  const sheetOverlay = document.querySelector('.sheet-overlay');
  const chunkPaywall = document.querySelector('.chunk--paywall');
  removeDOMElement(sheetOverlay, chunkPaywall);
  const overlaid = document.querySelectorAll('.is-overlaid');
  for (let i = 0; i < overlaid.length; i++) {
    overlaid[i].classList.remove('is-overlaid');
  }
  const bodyHidden = document.querySelector('.js-pre-chunks__story-body');
  bodyHidden.removeAttribute('style');
}

if (matchDomain('the-tls.co.uk')) {
  const paywall = document.querySelector('.tls-subscriptions-banner__closed-skin');
  removeDOMElement(paywall);
}

if (matchDomain('cen.acs.org')) {
  const paywall = document.querySelector('.meteredBar');
  removeDOMElement(paywall);
}

if (matchDomain('elpais.com')) {
  setTimeout(function () {
    const paywall = document.querySelector('.fc-ab-root');
    const body = document.querySelector('.salida_articulo');

    removeDOMElement(paywall);
    body.removeAttribute('style');
  }, 500); // Delay (in milliseconds)
}

if (matchDomain('techinasia.com')) {
  const paywall = document.querySelector('.paywall-content');
  if (paywall) {
    paywall.classList.remove('paywall-content');
  }
  const splashSubscribe = document.querySelector('.splash-subscribe');
  const paywallHard = document.querySelector('.paywall-hard');
  removeDOMElement(splashSubscribe, paywallHard);
}

if (matchDomain('thewrap.com')) {
  const embed = document.querySelector('.embed');
  if (embed) {
    // Display feature video
    const container = document.querySelector('.featured-image-container');
    removeDOMElement(container);
    embed.classList.remove('d-none');
  }
}

function matchDomain (domains) {
  const hostname = window.location.hostname;
  if (typeof domains === 'string') { domains = [domains]; }
  return domains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
}

function removeDOMElement (...elements) {
  for (const element of elements) {
    if (element) { element.remove(); }
  }
}

function removeClassesByPrefix (el, prefix) {
  for (let i = 0; i < el.classList.length; i++) {
    if (el.classList[i].startsWith(prefix)) {
      el.classList.remove(el.classList[i]);
    }
  }
}

function pageContains (selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}
