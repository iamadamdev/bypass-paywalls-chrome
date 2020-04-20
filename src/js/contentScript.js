var arr_localstorage_hold = ['sfchronicle.com', 'cen.acs.org'];
var localstorage_hold = arr_localstorage_hold.some(function(url) {
    return window.location.href.indexOf(url) !== -1;
});

if (!localstorage_hold){
    window.localStorage.clear();
}

if (matchDomain('rep.repubblica.it')) {
    if (location.href.includes('/pwa/')) {
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
    if (paywall)
        paywall.classList.remove('embargo-content');
}

if (matchDomain('telegraaf.nl')) {
    if (window.location.href.startsWith('https://www.telegraaf.nl/error?ref=/')) {
        window.location.href = window.location.href.split('&')[0].replace('error?ref=/', '');
    }
    let article_wrapper = document.querySelector('.ArticlePageWrapper__uid');
    let spotx_banner = document.querySelector('.ArticleBodyBlocks__inlineArticleSpotXBanner');
    let paywall = document.querySelector('.PopupBackdrop__block');
    removeDOMElement(spotx_banner, paywall);
    let premium = document.querySelector('.PremiumLabelWithLine__body');
    let article_id = article_wrapper ? article_wrapper.innerText : '123';
    let article_body_done = document.querySelector('#articleBody' + article_id);
    if (premium && !article_body_done) {
        let article_body_old = document.querySelector('[id^=articleBody]');
        removeDOMElement(article_body_old);
        let json = document.querySelector('script[type="application/ld+json"][data-react-helmet="true"]');
        if (json) {
            json_text = JSON.parse(json.text).articleBody;
            let article_body = document.querySelector('section.TextArticlePage__bodyText');
            if (article_body) {
                let div_main = document.createElement("div");
                div_main.setAttribute('id', 'articleBody' + article_id);
                let div_elem = document.createElement("div");
                div_elem.setAttribute('data-element', 'articleBodyBlocks');
                let text_array = json_text.split('\n\n');
                text_array.forEach(p_text => {
                    let p_div = document.createElement("p");
                    p_div.setAttribute('class', 'ArticleBodyBlocks__paragraph ArticleBodyBlocks__paragraph--nieuws');
                    p_div.innerText = p_text;
                    div_elem.appendChild(p_div);
                });
                div_main.appendChild(div_elem);
                article_body.appendChild(div_main);
            }
        }
    }
}

if (matchDomain(['ad.nl', 'ed.nl'])) {
    let paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
    removeDOMElement(paywall);
}

if (matchDomain('washingtonpost.com')) {
    if (window.location.href.includes('/gdpr-consent/')) {
        const free_button = document.querySelector('.gdpr-consent-container .continue-btn.button.free');
        if (free_button)
            free_button.click();

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
        const close_button = document.querySelector('.close-btn');
        if (close_button)
            close_button.click();
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

if (matchDomain('theathletic.com')) {
    const landing_banner = document.querySelector('.logged-out-landing-banner');
    const sample_banner = document.querySelector('.main-sample-banner');
    const bottom_banner = document.querySelector('.border-bottom-cc');
    const subscribe = document.querySelector('.subscribe-ad-text');
    removeDOMElement(landing_banner, sample_banner, bottom_banner, subscribe);
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
        var paras = paywall.querySelectorAll("p, span, h2, div");
        for (var i = 0; i < paras.length; i++) {
            removeClassesByPrefix(paras[i], 'QUnW');
            paras[i].classList.remove("ellipsis");
            paras[i].removeAttribute('style');
        }
    }
}

if (matchDomain('thestar.com')) {
    const paywall = document.querySelector('.basic-paywall-new');
    removeDOMElement(paywall);
    const tbc = document.querySelectorAll('.text-block-container');
    for (let i = 0; i < tbc.length; i++) {
        tbc[i].removeAttribute('style');
    }
}

if (matchDomain('afr.com')) {
    document.addEventListener('DOMContentLoaded', () => {
        const hidden_image = document.querySelectorAll('img');
        for (let i = 0; i < hidden_image.length; i++) {
            var src = hidden_image[i].src;
            if ('src: ' + src.indexOf(".gif") !== -1) {
                var data_src = hidden_image[i].getAttribute("data-src");
                if (data_src)
                    hidden_image[i].setAttribute('src', data_src);
            }
        }
        const plista = document.querySelector('div[data-plista-placement="underArticle_Group"]');
        removeDOMElement(plista);
    });
}

if (matchDomain(['parool.nl', 'trouw.nl', 'volkskrant.nl', 'demorgen.be'])) {
    document.addEventListener('DOMContentLoaded', () => {
        const paywall = document.querySelector('div[data-temptation-position="ARTICLE_BOTTOM"]');
        const hidden_section = document.querySelector('div[data-temptation-position="ARTICLE_INLINE"]');
        removeDOMElement(paywall, hidden_section);
    });
}

if (matchDomain('firstthings.com')) {
    const paywall = document.getElementsByClassName('paywall')[0];
    removeDOMElement(paywall);
}

if (matchDomain('fortune.com')) {
    document.addEventListener('DOMContentLoaded', () => {
        const paywall = document.getElementById('freestar-instream-content');
        if (paywall){
            paywall.classList.remove('tp-container-inner');
        }
        const paywallJunk = document.getElementById('article_overlay');
        if (paywallJunk){
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
        if (fence){
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
        const lazy_image = document.querySelectorAll('.js-lazyimage');
        for (let i = 0; i < lazy_image.length; i++) {
            lazy_image[i].classList.remove('js-lazyimage');
        }
        const hidden_image = document.querySelectorAll('img');
        for (let i = 0; i < hidden_image.length; i++) {
            var src = hidden_image[i].src;
            if (src.indexOf("data:image/gif") !== -1) {
                var data_src = hidden_image[i].getAttribute("data-src");
                if (data_src)
                    hidden_image[i].setAttribute('src', data_src);
                var data_bg = hidden_image[i].getAttribute("data-bg");
                if (data_bg)
                    hidden_image[i].setAttribute('src', data_bg);
            }
        }
    });
}

if (matchDomain(['examiner.com.au', 'thecourier.com.au', 'theadvocate.com.au'])) {
  const subscribe_truncate = document.querySelector('.subscribe-truncate');
  if (subscribe_truncate)
      subscribe_truncate.classList.remove('subscribe-truncate');
  const subscriber_hider = document.querySelectorAll('.subscriber-hider');
  for (let i = 0; i < subscriber_hider.length; i++) {
      subscriber_hider[i].classList.remove('subscriber-hider');
  }
}

if (matchDomain('lemonde.fr')) {
    document.addEventListener('DOMContentLoaded', () => {
        const hidden_section = document.getElementsByClassName('article__content--restricted-media')[0];
        if (hidden_section)
            hidden_section.classList.remove('article__content--restricted-media');
        const longform_article_restricted = document.getElementsByClassName('article__content--restricted')[0];
        if (longform_article_restricted)
            longform_article_restricted.classList.remove('article__content--restricted');
        const longform_paywall = document.getElementsByClassName('paywall--longform')[0];
        if (longform_paywall)
            longform_paywall.classList.remove('paywall--longform');
        const paywall = document.getElementById('js-paywall-content');
        const friend_paywall = document.getElementsByClassName('friend--paywall')[0];
        const cookie_banner = document.getElementById('cookie-banner');
        removeDOMElement(paywall, friend_paywall, cookie_banner);
    });
}

if (matchDomain('canberratimes.com.au')) {
        const paywall = document.querySelector('.subscribe-article.news-article-body.article__body');
        paywall.classList.remove('subscribe-article');
        var subscribe = document.getElementsByClassName('subscriber-container')[0];
        removeDOMElement(subscribe);
        var content = document.getElementsByClassName('subscriber-hider');
        for (var i = 0; i < content.length; i++) {
        content[i].classList.remove('subscriber-hider');
    }
}

if (matchDomain('asia.nikkei.com')) {
    const cookie_banner = document.querySelector('.pw-widget');
    removeDOMElement(cookie_banner);
}

if (matchDomain('ledevoir.com')) {
        const counter = document.querySelector('.full.hidden-print.popup-msg');
        removeDOMElement(counter);
}

if (matchDomain('ft.com')) {
    const cookie_banner = document.querySelector('.cookie-banner');
    removeDOMElement(cookie_banner);
}

if (matchDomain('thehindu.com')) {
        const paywall = document.getElementById('test');
        removeDOMElement(paywall);
}

if (matchDomain('nytimes.com')) {
    const preview_button = document.querySelector('.css-3s1ce0');
        if (preview_button)
            preview_button.click();
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
            var content = document.getElementsByClassName('content');
            for (var i = 0; i < content.length; i++) {
                content[i].removeAttribute("style");
            }
        }, 300); // Delay (in milliseconds)
}

if (matchDomain('caixinglobal.com')) {
    const pay_tip = document.querySelectorAll('.cons-pay-tip');
    for (let i = 0; i < pay_tip.length; i++) {
        pay_tip[i].removeAttribute('style');
    }
    const appContent = document.getElementById('appContent');
    if (appContent) {
        const p_hidden = document.querySelectorAll('p:not([style="display:block;"]');
        for (let i = 0; i < p_hidden.length; i++) {
            p_hidden[i].setAttribute('style', 'display:block;');
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
            const paywall = document.querySelector('.layout-article-regwall'); ;
            if (paywall) {
                window.location.reload(true);
            }
        }, 500); // Delay (in milliseconds)
        const p_article = document.querySelectorAll('p.article__body-text');
        var href;
        for (let i = 0; i < p_article.length; i++) {
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
        const sheet_overlay = document.querySelector('.sheet-overlay');
        const chunk_paywall = document.querySelector('.chunk--paywall');
        removeDOMElement(sheet_overlay, chunk_paywall);
        const overlaid = document.querySelectorAll('.is-overlaid');
        for (var i = 0; i < overlaid.length; i++) {
            overlaid[i].classList.remove('is-overlaid');
        }
        const body_hidden = document.querySelector('.js-pre-chunks__story-body');
        body_hidden.removeAttribute('style');
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
    const splash_subscribe = document.querySelector('.splash-subscribe');
    const paywall_hard = document.querySelector('.paywall-hard');
    removeDOMElement(splash_subscribe, paywall_hard);
}

if (matchDomain('forbes.com')) {
  const auth_container = document.querySelector('.fbs-auth__container');
  const content_wrapper = document.querySelector('.fbs-ad--ntv-contentd-wrapper');
  removeDOMElement(auth_container, content_wrapper);

  const body_no_scroll = document.querySelector('body');
  removeClassesByPrefix(body_no_scroll, 'body--no-scroll');
  removeClassesByPrefix(body_no_scroll, 'adblock-on');
}

function matchDomain(domains) {
    var hostname = window.location.hostname;
    if (typeof domains === 'string')
        domains = [domains];
    return domains.some(domain => hostname === domain || hostname.endsWith('.' + domain));
}

function removeDOMElement(...elements) {
    for (let element of elements) {
        if (element)
            element.remove();
    }
}

function removeClassesByPrefix(el, prefix) {
    for (var i = 0; i < el.classList.length; i++){
        if (el.classList[i].startsWith(prefix)) {
            el.classList.remove(el.classList[i]);
        }
    }
}

function pageContains(selector, text) {
    let elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
}
