window.localStorage.clear();
if (window.location.href.indexOf("bizjournals.com") !== -1) {
	const hiddenStory = document.getElementsByClassName(
		"js-pre-chunks__story-body"
	);
	if (hiddenStory && hiddenStory.length > 0) {
		hiddenStory[0].style.display = "block";
	}

	const payWallMessage = document.getElementsByClassName(
		"chunk chunk--flex@lg chunk--paywall"
	);
	if (payWallMessage && payWallMessage.length > 0) {
		payWallMessage[0].style.display = "none";
	}
} else if (window.location.href.indexOf("businessinsider.com") !== -1) {
	const paywall = document.getElementsByClassName(
		"tp-modal"
	);
	while (paywall.length > 0) {
		paywall[0].parentNode.removeChild(paywall[0]);
	}
} else if (location.hostname.endsWith('haaretz.co.il')) {
	const html = document.getElementsByTagName('html');
	if (html && html.length > 0) {
		html[0].style['overflow-y'] = 'auto';
	}
	const msg = document.getElementById('article-wrapper');
	if (msg) {
		msg.style['display'] = 'none';
	}
} else if (window.location.href.indexOf("nzherald.co.nz") !== -1) {
	const paywall = document.getElementById(
		"article-content"
	);
	if (paywall) {
		paywall.classList.remove('premium-content');
		paywall.classList.add('full-content');
		var paras = paywall.querySelectorAll("p, span, h2, div");
		var delClass = "";
		for (var i = 0; i < paras.length; i++) {
			if (paras[i].nodeName == 'P' || paras[i].nodeName == 'SPAN') {
				paras[i].classList.remove("ellipsis");
				if (delClass == "" && paras[i].className != "") {
					delClass = paras[i].className;
				} else {
					if (delClass != "") {
						paras[i].classList.remove(delClass);
					}
				}
			}
			paras[i].removeAttribute('style');
		}
	}
} else if (location.hostname.endsWith('rep.repubblica.it')) {
	if (location.href.includes("/pwa/")) {
		location.href = location.href.replace("/pwa/", "/ws/detail/");
	}

	if (location.href.includes("/ws/detail/")) {
		const paywall = document.querySelector('.paywall[subscriptions-section="content"]');
		if (paywall) {
			paywall.removeAttribute('subscriptions-section');
			const preview = document.querySelector('div[subscriptions-section="content-not-granted"]');
			if (preview) {
				preview.remove();
			}
		}
	}
} else if (window.location.href.indexOf("wsj.com") !== -1) {
	if (location.href.includes('/articles/')) {
		document.addEventListener('DOMContentLoaded', () => {
			const paywall = document.getElementById('cx-scrim');
			const candybar = document.getElementById('cx-candybar');
			removeDOMElement(paywall, candybar);
		});
		/**
		setTimeout(function () {
			const close_button = document.querySelector('.close-btn');
			if (close_button)
				close_button.click();
		}, 2000);
		**/
	}
} else if (window.location.href.indexOf("washingtonpost.com") !== -1) {
	if (location.href.includes('/gdpr-consent/')) {
		document.querySelector('.gdpr-consent-container .continue-btn.button.free').click();

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

if (window.location.href.indexOf("medium.com") !== -1) {
	const bottomMessageText = 'Get one more story in your member preview when you sign up. It’s free.';
	const DOMElementsToTextDiv = pageContains('div', bottomMessageText);

	if (DOMElementsToTextDiv[2]) removeDOMElement(DOMElementsToTextDiv[2]);
}

if (window.location.href.indexOf("bloombergquint.com") !== -1) {
	const articlesLeftModal = document.getElementsByClassName('paywall-meter-module__story-paywall-container__1UgCE')[0];
	const paywall = document.getElementById('paywallDmp');
	removeDOMElement(articlesLeftModal,	paywall);
}

if (window.location.href.indexOf("bloomberg.com") !== -1) {
    document.addEventListener('DOMContentLoaded', () => {
		const fence = document.querySelector('.fence-body');
		if (fence)
			fence.classList.remove('fence-body');
        const paywall = document.getElementById('paywall-banner');
        removeDOMElement(paywall);
    });
}

if (window.location.href.indexOf('telegraaf.nl') !== -1) {
	setTimeout(function () {
		const paywall = document.getElementById('TEMPRORARY_METERING_ID');
		if (paywall) {
			window.location.reload(true);
		}
	}, 500); // Delay (in milliseconds)
}

if (window.location.href.indexOf('ed.nl') !== -1) {
	const paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
	if (paywall) {
		paywall.remove();
		paywall = null;
	}
}

if (window.location.href.indexOf("parool.nl") !== -1 ||	window.location.href.indexOf("trouw.nl") !== -1 || 	window.location.href.indexOf("volkskrant.nl") !== -1) {
	document.addEventListener('DOMContentLoaded', () => {
		const paywall = document.querySelector('div[data-temptation-position="ARTICLE_BOTTOM"]');
		const hidden_section = document.querySelector('div[data-temptation-position="ARTICLE_INLINE"]');
		removeDOMElement(paywall, hidden_section);
	});
}

if (window.location.href.indexOf('lemonde.fr') !== -1) {
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

if (window.location.href.indexOf("nytimes.com") !== -1) {
    const preview_button = document.querySelector('.css-3s1ce0');
        if (preview_button)
            preview_button.click();
}

if (window.location.href.indexOf("caixinglobal.com") !== -1) {
	const appContent = document.getElementById('appContent');
	if (appContent) {
		const p_hidden = document.querySelectorAll('p:not([style="display:block;"]');
		for (var i = 0; i < p_hidden.length; i++) {
			p_hidden[i].setAttribute('style', 'display:block;');
		}
	}
}

function removeDOMElement(...elements) {
	for (let element of elements) {
		if (element) element.remove();
	}
}

function pageContains(selector, text) {
	let elements = document.querySelectorAll(selector);

	return Array.prototype.filter.call(elements, function(element){
		return RegExp(text).test(element.textContent);
	});
}
