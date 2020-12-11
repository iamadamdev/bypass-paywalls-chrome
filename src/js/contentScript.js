if (!matchDomain(['seekingalpha.com', 'sfchronicle.com', 'cen.acs.org', 'thetimes.co.uk'])) {
  window.localStorage.clear();
}

if (matchDomain('elmercurio.com')) {
  if (window.location.href.toLowerCase().includes('/inversiones/')) {
    document.addEventListener('DOMContentLoaded', () => {
      const paywall = document.querySelector('#modal_limit_articulos');
      const body = document.querySelector('body');
      removeDOMElement(paywall);
      if (body.hasAttribute('class')) { body.removeAttribute('class'); }
    });
  }
} else if (matchDomain('estadao.com.br')) {
  setTimeout(function () {
    const paywall = document.querySelector('#paywall-wrapper-iframe-estadao');
    const body = document.querySelector('html');

    removeDOMElement(paywall);
    body.removeAttribute('style');
  }, 300); // Delay (in milliseconds)
} else if (matchDomain('rep.repubblica.it')) {
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
} else if (matchDomain('americanbanker.com')) {
  const paywall = document.getElementsByClassName('embargo-content')[0];
  if (paywall) { paywall.classList.remove('embargo-content'); }
} else if (matchDomain('telegraaf.nl')) {
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
} else if (matchDomain(['ad.nl', 'ed.nl', 'bndestem.nl', 'bd.nl', 'tubantia.nl', 'destentor.nl', 'pzc.nl', 'gelderlander.nl'])) {
  const paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
  removeDOMElement(paywall);
} else if (matchDomain('washingtonpost.com')) {
  const leaderboard = document.querySelector('#leaderboard-wrapper');
  const adverts = document.querySelectorAll('div[data-qa="article-body-ad"]');
  removeDOMElement(leaderboard, ...adverts);
  if (window.location.href.includes('/gdpr-consent/')) {
    const freeButton = document.querySelector('.gdpr-consent-container .continue-btn.button.free');
    if (freeButton) { freeButton.click(); }
    window.setTimeout(function () {
      const gdprcheckbox = document.querySelector('.gdpr-consent-container .consent-page:not(.hide) #agree');
      if (gdprcheckbox) {
        gdprcheckbox.checked = true;
        gdprcheckbox.dispatchEvent(new Event('change'));
        document.querySelector('.gdpr-consent-container .consent-page:not(.hide) .continue-btn.button.accept-consent').click();
      }
    }, 300); // Delay (in milliseconds)
  }
} else if (matchDomain('wsj.com') && !matchDomain('cn.wsj.com')) {
  if (window.location.href.includes('/articles/')) {
    const closeButton = document.querySelector('div.close-btn[role="button"]');
    if (closeButton) { closeButton.click(); }
  }
  document.addEventListener('DOMContentLoaded', () => {
    const url = window.location.href;
    const snippet = document.querySelector('.snippet-promotion');
    const wsjPro = document.querySelector('meta[name="page.site"][content="wsjpro"]');
    if (snippet || wsjPro) {
      if (!window.location.hash) {
        if (url.includes('?')) {
          window.location.href = url.replace('?', '#refreshed?');
        } else { window.location.href = url + '#refreshed'; }
      } else { window.location.href = window.location.href.replace('wsj.com', 'wsj.com/amp').replace('#refreshed', ''); }
    }
  });
} else if (matchDomain('sloanreview.mit.edu')) {
  const readMore = document.querySelector('.btn-read-more');
  if (readMore) {
    readMore.click();
  }
} else if (matchDomain('mexiconewsdaily.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const sideNotification = document.querySelector('.pigeon-widget-prompt');
    const subMessage = document.querySelector('.sub_message_container');
    const popup = document.querySelector('.popupally-pro-outer-full-width-7-fluid_qemskqa');
    const bgFocusRemoverId = document.getElementById('popup-box-pro-gfcr-7');

    removeDOMElement(sideNotification, subMessage, popup, bgFocusRemoverId);
  });
} else if (matchDomain('the-american-interest.com')) {
  const counter = document.getElementById('article-counter');
  removeDOMElement(counter);
} else if (matchDomain('nzherald.co.nz')) {
  NZHerald();
} else if (matchDomain('interest.co.nz')) {
  const wrapper = document.getElementById('pp-ablock-banner-wrapper');
  const overlay = document.querySelector('.black-overlay');
  removeDOMElement(overlay, wrapper);
} else if (matchDomain('stuff.co.nz')) {
  const overlay = document.querySelector('.x0');
  removeDOMElement(overlay);
} else if (matchDomain('thenational.scot')) {
  const overlay = document.querySelector('.template-container');
  removeDOMElement(overlay);
} else if (matchDomain('thestar.com')) {
  setTimeout(function () {
    const paywall = document.querySelector('.basic-paywall-new');
    removeDOMElement(paywall);
    const tbc = document.querySelectorAll('.text-block-container');
    for (const el of tbc) {
      el.removeAttribute('style');
    }
  }, 1000); // Delay (in milliseconds)
} else if (matchDomain('afr.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const hiddenImage = document.querySelectorAll('img');
    for (const image of hiddenImage) {
      const src = image.src;
      if ('src: ' + src.indexOf('.gif') !== -1) {
        const dataSrc = image.getAttribute('data-src');
        if (dataSrc) {
          image.setAttribute('src', dataSrc);
        }
      }
    }
    const plista = document.querySelector('div[data-plista-placement="underArticle_Group"]');
    removeDOMElement(plista);
  });
} else if (matchDomain(['parool.nl', 'trouw.nl', 'volkskrant.nl', 'demorgen.be', 'humo.be'])) {
  document.addEventListener('DOMContentLoaded', () => {
    const topBanner = document.querySelector('div[data-temptation-position="PAGE_TOP"]');
    const paywall = document.querySelector('div[data-temptation-position="ARTICLE_BOTTOM"]');
    const hiddenSection = document.querySelector('div[data-temptation-position="ARTICLE_INLINE"]');
    const overlay = document.querySelector('div[data-temptation-position="PAGE_BOTTOM"]');
    removeDOMElement(topBanner, paywall, hiddenSection, overlay);
  });
} else if (matchDomain('firstthings.com')) {
  const paywall = document.getElementsByClassName('paywall')[0];
  removeDOMElement(paywall);
} else if (matchDomain('bloomberg.com')) {
  blockElement('#graphics-paywall-overlay', true);
} else if (matchDomain('bloombergquint.com')) {
  const articlesLeftModal = document.getElementsByClassName('paywall-meter-module__story-paywall-container__1UgCE')[0];
  const paywall = document.getElementById('paywallDmp');
  removeDOMElement(articlesLeftModal, paywall);
} else if (matchDomain('medium.com')) {
  const bottomMessageText = 'Get one more story in your member preview when you sign up. It’s free.';
  const DOMElementsToTextDiv = pageContains('div', bottomMessageText);
  if (DOMElementsToTextDiv[2]) removeDOMElement(DOMElementsToTextDiv[2]);
} else if (matchDomain('theglobeandmail.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const realArticle = document.querySelector('.js-c-article-body');
    let decoyArticle = document.querySelector('.decoy-article');
    if (realArticle && !decoyArticle) {
      decoyArticle = document.createElement('div');
      decoyArticle.classList.add('js-c-article-body');
      decoyArticle.classList.add('decoy-article');
      decoyArticle.hidden = true;
      realArticle.parentElement.insertBefore(decoyArticle, realArticle);
      for (var child = realArticle.firstChild; child !== null; child = child.nextSibling) {
        if (child.style) {
          child.style.display = 'block';
        }
      }
    }
    const regWall = document.querySelector('#regwall');
    const lightBox = document.querySelector('.c-lightbox');
    if (regWall && lightBox) {
      regWall.hidden = true;
      lightBox.hidden = true;
    }
    const subscribed = document.querySelector('html.story-subscribed');
    if (subscribed && !window.location.href.includes('?ref=premium')) {
      window.setTimeout(function () {
        window.location.href = new URL(window.location.href).pathname + '?ref=premium';
      }, 100);
    }
  });
  const cCards = document.querySelectorAll('div.c-card');
  for (const cCard of cCards) {
    const aLink = cCard.querySelector('a');
    const key = cCard.querySelector('span.c-indicator-icon--key');
    if (key && aLink && !aLink.href.includes('?ref=premium')) {
      aLink.href = aLink.href + '?ref=premium';
    }
  }
} else if (matchDomain(['examiner.com.au', 'thecourier.com.au', 'theadvocate.com.au'])) {
  const subscribeTruncate = document.querySelector('.subscribe-truncate');
  if (subscribeTruncate) { subscribeTruncate.classList.remove('subscribe-truncate'); }
  const subscriberHider = document.querySelectorAll('.subscriber-hider');
  for (const el of subscriberHider) {
    el.classList.remove('subscriber-hider');
  }
} else if (matchDomain('canberratimes.com.au')) {
  const paywall = document.querySelector('.subscribe-article.news-article-body.article__body');
  paywall.classList.remove('subscribe-article');
  const subscribe = document.getElementsByClassName('subscriber-container')[0];
  removeDOMElement(subscribe);
  const content = document.getElementsByClassName('subscriber-hider');
  for (const el of content) {
    el.classList.remove('subscriber-hider');
  }
} else if (matchDomain('asia.nikkei.com')) {
  const cookieBanner = document.querySelector('.pw-widget');
  removeDOMElement(cookieBanner);
} else if (matchDomain('ledevoir.com')) {
  const counter = document.querySelector('.full.hidden-print.popup-msg');
  removeDOMElement(counter);
} else if (matchDomain('ft.com')) {
  const cookieBanner = document.querySelector('.cookie-banner');
  removeDOMElement(cookieBanner);
} else if (matchDomain('thehindu.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('#test');
    const coBanner = document.querySelector('.co-banner');
    const support = document.querySelector('div.support-jlm');
    removeDOMElement(counter, coBanner, support);
  });
} else if (matchDomain('nytimes.com')) {
  const previewButton = document.querySelector('.css-3s1ce0');
  if (previewButton) { previewButton.click(); }
  blockElement('.css-3fbowa'); // Prevent bottom dock from appearing
  blockElement('#gateway-content'); // Remove paywall
  blockElement('.css-1bd8bfl'); // Remove filter
  // Restore scrolling
  document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
      document.querySelector('.css-mcm29f').setAttribute('style', 'position:relative');
    }
  };
} else if (matchDomain('technologyreview.com')) {
  window.setTimeout(function () {
    const bodyObscured = document.querySelector('body[class*="body__obscureContent"]');
    if (bodyObscured) { removeClassesByPrefix(bodyObscured, 'body__obscureContent'); }
    const overlay = document.querySelector('div[class*="overlayFooter__wrapper"]');
    if (overlay) { overlay.setAttribute('style', 'display:none'); }
    const contentBodyHidden = document.querySelector('div[class*="contentBody__contentHidden"]');
    if (contentBodyHidden) { removeClassesByPrefix(contentBodyHidden, 'contentBody__contentHidden'); }
    const contentBodyOverlay = document.querySelector('div[class*="contentBody__overlay"]');
    if (contentBodyOverlay) { contentBodyOverlay.removeAttribute('class'); }
  }, 500);
} else if (matchDomain('leparisien.fr')) {
  window.removeEventListener('scroll', this.scrollListener);
  const paywall = document.querySelector('.relative.piano-paywall.below_nav.sticky');
  removeDOMElement(paywall);
  setTimeout(function () {
    const content = document.getElementsByClassName('content');
    for (const el of content) {
      el.removeAttribute('style');
    }
  }, 300); // Delay (in milliseconds)
} else if (matchDomain('caixinglobal.com')) {
  const payTips = document.querySelectorAll('.cons-pay-tip');
  for (const payTip of payTips) {
    payTip.removeAttribute('style');
  }
  const appContent = document.getElementById('appContent');
  if (appContent) {
    const pHidden = document.querySelectorAll('p:not([style="display:block;"]');
    for (const el of pHidden) {
      el.setAttribute('style', 'display:block;');
    }
  }
} else if (matchDomain('bizjournals.com')) {
  const sheetOverlay = document.querySelector('.sheet-overlay');
  const chunkPaywall = document.querySelector('.chunk--paywall');
  removeDOMElement(sheetOverlay, chunkPaywall);
  const overlaid = document.querySelectorAll('.is-overlaid');
  for (const el of overlaid) {
    el.classList.remove('is-overlaid');
  }
  const bodyHidden = document.querySelector('.js-pre-chunks__story-body');
  bodyHidden.removeAttribute('style');
} else if (matchDomain('the-tls.co.uk')) {
  const paywall = document.querySelector('.tls-subscriptions-banner__closed-skin');
  removeDOMElement(paywall);
} else if (matchDomain('cen.acs.org')) {
  const paywall = document.querySelector('.meteredBar');
  removeDOMElement(paywall);
} else if (matchDomain('elpais.com')) {
  setTimeout(function () {
    const paywall = document.querySelector('.fc-ab-root');
    const body = document.querySelector('.salida_articulo');

    removeDOMElement(paywall);
    body.removeAttribute('style');
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('techinasia.com')) {
  const paywall = document.querySelector('.paywall-content');
  if (paywall) {
    paywall.classList.remove('paywall-content');
  }
  const splashSubscribe = document.querySelector('.splash-subscribe');
  const paywallHard = document.querySelector('.paywall-hard');
  removeDOMElement(splashSubscribe, paywallHard);
} else if (matchDomain('thewrap.com')) {
  const embed = document.querySelector('.embed');
  if (embed) {
    // Display feature video
    const container = document.querySelector('.featured-image-container');
    removeDOMElement(container);
    embed.classList.remove('d-none');
  }
} else if (matchDomain('hbr.org')) {
  const banner = document.querySelector('.persistent-banner');
  removeDOMElement(banner);
} else if (matchDomain('spectator.co.uk')) {
  const container = document.querySelector('.HardPayWallContainer-module__overlay');
  window.setTimeout(function () {
    if (container && window.location.href.includes('/www.spectator.co.uk/')) {
      window.location.href = window.location.href + '/amp';
    }
  }, 500);
} else if (matchDomain('barrons.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const bodyContinuous = document.querySelector('body.is-continuous');
    const snippet = document.querySelector('meta[content="snippet"]');
    if (bodyContinuous && snippet) {
      window.location.href = window.location.href.replace('barrons.com', 'barrons.com/amp');
    }
  });
  if (!window.location.href.includes('barrons.com/amp/')) {
    let href = '';
    const signinLinks = document.querySelectorAll('a.primary-button--link');
    for (const signinLink of signinLinks) {
      href = signinLink.href;
      if (href.includes('target=')) {
        href = href.split('target')[1].split('%3F')[0];
        href = href.replace('=', '').replace('%3A', ':').replace(/%2F/g, '/');
        signinLink.href = href;
        signinLink.text = 'Click';
      }
    }
  }
} else if (matchDomain('nzz.ch')) {
  const paywall = document.querySelector('.dynamic-regwall');
  removeDOMElement(paywall);
} else if (matchDomain('irishtimes.com')) {
  document.addEventListener('DOMContentLoaded', () => {
    const stubArticleMsg = document.querySelector('div.stub-article-msg');
    const url = window.location.href;
    if (url.includes('mode=sample') || stubArticleMsg) { window.location.href = new URL(url).pathname + '?mode=amp'; }
  });
} else if (matchDomain('thesaturdaypaper.com.au')) {
  const paywall = document.querySelector('div.paywall-hard-always-show');
  removeDOMElement(paywall);
} else if (matchDomain('lesechos.fr') && window.location.href.match(/-\d{6,}/)) {
  window.setTimeout(function () {
    const aboBanner = document.querySelector('[class^="pgxf3b"]');
    const adBlocks = document.querySelectorAll('[class*="jzxvkd"');
    for (const adBlock of adBlocks) { adBlock.setAttribute('style', 'display:none'); }
    if (aboBanner) {
      removeDOMElement(aboBanner);
      const url = window.location.href;
      const html = document.documentElement.outerHTML;
      let state;
      const split1 = html.split('window.__PRELOADED_STATE__=')[1];
      const split2 = split1.split('</script>')[0].trim();
      if (split2.includes('; window.__DATA__=')) { state = split2.split('; window.__DATA__=')[0].trim(); } else { state = split2.substr(0, split2.length - 1); }
      try {
        const data = JSON.parse(state);
        const article = data.article.data.stripes[0].mainContent[0].data.description;
        const urlLoaded = data.article.data.path;
        if (!url.includes(urlLoaded)) { window.location.reload(true); }
        const paywallNode = document.querySelector('.post-paywall');
        if (paywallNode) {
          const contentNode = document.createElement('div');
          const parser = new DOMParser();
          const articleHtml = parser.parseFromString('<div>' + article + '</div>', 'text/html');
          const articlePar = articleHtml.querySelector('div');
          if (articlePar) {
            contentNode.appendChild(articlePar);
            contentNode.className = paywallNode.className;
            paywallNode.parentNode.insertBefore(contentNode, paywallNode);
            removeDOMElement(paywallNode);
            const paywallLastChildNode = document.querySelector('.post-paywall  > :last-child');
            if (paywallLastChildNode) {
              paywallLastChildNode.setAttribute('style', 'height: auto !important; overflow: hidden !important; max-height: none !important;');
            }
          }
        }
        const styleElem = document.head.appendChild(document.createElement('style'));
        styleElem.innerHTML = '.post-paywall::after {height: auto !important;}';
      } catch (err) {
        window.location.reload(true);
      }
    }
  }, 500); // Delay (in milliseconds)
} else if (matchDomain('startribune.com')) {
  // remove active class from all elements
  document.querySelectorAll('div.ReactModalPortal').forEach(function (el) {
    removeDOMElement(el);
  });
  // Enable Scroll. Reveal Hiddlen Paragraph
  document.getElementsByTagName('body')[0].removeAttribute('class');
} else if (matchDomain('seattletimes.com')) {
  window.setTimeout(function () {
    // remove modal class from all elements
    document.querySelectorAll('div.modal').forEach(function (el) {
      removeDOMElement(el);
    });
    // Remove Blurred Style from all matching Divs
    document.getElementById('container').removeAttribute('style');
    document.querySelectorAll('div[style~="filter"]').forEach(function (el) {
      el.removeAttribute('style');
    });
    document
      .querySelectorAll('div[class~="NewsletterSignupSplash"]')
      .forEach(function (el) {
        el.removeAttribute('class');
      });
  }, 2000); // Delay (in milliseconds)
} else if (matchDomain('theatlantic.com')) {
  // Remove all nudge elements
  document.querySelectorAll('div[class*="c-nudge"]').forEach(function (el) {
    removeDOMElement(el);
  });
  // Remove all FancyBox ads
  document.querySelectorAll('div[class*="fancybox"]').forEach(function (el) {
    removeDOMElement(el);
  });
} else if (matchDomain('newyorker.com')) {
  blockElement('.paywall-bar', true);
  blockElement('.paywall-modal');
} else if (matchDomain('vanityfair.com')) {
  const paywall = document.querySelector('.paywall-bar');
  removeDOMElement(paywall);
} else if (matchDomain('delfi.ee')) {
  // Remove 'adblocker-detected' notification overlay
  document.body.classList.remove('adb-curtain');
  const el = document.getElementById('ab--notification-header');
  removeDOMElement(el);
} else if (matchDomain(['postimees.ee', 'elu24.ee'])) {
  setTimeout(function () {
    // Remove 'adblocker-detected' footer notification
    const adblockNotif = document.querySelector('.adblock-notif');
    removeDOMElement(adblockNotif);
  }, 800); // Delay (in milliseconds)
} else if (matchDomain('thetimes.co.uk')) {
  const block = document.querySelector('.subscription-block');
  const adBlock = document.getElementById('ad-article-inline');
  const adHeader = document.getElementById('sticky-ad-header');
  removeDOMElement(block, adBlock, adHeader);
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
  for (const clazz of el.classList) {
    if (clazz.startsWith(prefix)) {
      el.classList.remove(clazz);
    }
  }
}

function pageContains (selector, text) {
  const elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

// Prevent element from being added the first time to the DOM
function blockElement (selector, blockAlways = false) {
  new window.MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node instanceof window.HTMLElement) {
          if (node.matches(selector)) {
            removeDOMElement(node);
            if (!blockAlways) {
              this.disconnect(); // Stop watching for element being added after one removal
            }
          }
        }
      }
    }
  }).observe(document, { subtree: true, childList: true });
}

function NZHerald () {
  const video = document.querySelector('.video-js');
  if (video) {
    const s = document.getElementsByTagName('script')[0];
    if (s.src === '') {
      const vId = video.getAttribute('data-account');
      const vPlay = video.getAttribute('data-player');
      const vScript = document.createElement('script');
      vScript.type = 'text/javascript';
      vScript.async = true;
      vScript.src = 'https://players.brightcove.net/' + vId + '/' + vPlay + '_default/index.min.js';
      s.parentNode.insertBefore(vScript, s);
      const ticker = document.querySelector('.vcTicker');
      if (ticker) {
        ticker.style.display = 'none';
      }
      const msg = document.querySelector('.vcMsg');
      if (msg) {
        msg.style.display = 'none';
      }
      const overlay = document.querySelector('.vcOverlay');
      if (overlay) {
        overlay.style.display = 'none';
      }
    }
  }

  window.setTimeout(function () {
    const articleBody = document.querySelector('.article__body');
    if (articleBody) {
      const childItems = articleBody.getElementsByTagName('*');
      let classHidden = '';
      for (const el of childItems) {
        if (el.getAttribute('class') !== null && el.getAttribute('style') !== null && classHidden === '') {
          classHidden = el.getAttribute('class');
        }
      }
      if (classHidden !== '') {
        for (const el of childItems) {
          el.classList.remove(classHidden);
          el.removeAttribute('style');
        }
      }
    }
    const overlay = document.querySelector('#premium-toaster');
    if (overlay) {
      overlay.style.display = 'none';
    }
    const advert = document.querySelector('.section-iframe.both');
    if (advert) {
      advert.style.display = 'none';
    }
    const els = document.querySelectorAll('.header__navigation-toggle-button');
    for (let i = 0; i < els.length; i++) {
      els[i].addEventListener('click', function (ev) {
        document.querySelector('.container').classList.toggle('container--sidebar-is-active');
        ev.stopImmediatePropagation();
      });
    }
    const subEls = document.querySelectorAll('.subnavigation');
    for (let i = 0; i < subEls.length; i++) {
      subEls[i].addEventListener('mouseover', function () {
        this.childNodes[1].classList.add('subnavigation__item-wrapper--is-active');
      });
      subEls[i].addEventListener('mouseleave', function () {
        this.childNodes[1].classList.remove('subnavigation__item-wrapper--is-active');
      });
    }
    const accEls = document.querySelectorAll('.accordion__button');
    for (let i = 0; i < accEls.length; i++) {
      accEls[i].addEventListener('click', function (ev) {
        this.parentNode.classList.toggle('accordion--is-expanded');
        ev.stopImmediatePropagation();
      });
    }
  }, 1000);
}
