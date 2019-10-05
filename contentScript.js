window.localStorage.clear();

const getHostName = _ => {
	let url = location.hostname;
	if (location.hostname.startsWith('www.')) {
		return url.replace('www.', '');
	}

	return url;
};

const urlMatches = (url) => {

	return getHostName() === url;
};


if (urlMatches('rep.repubblica.it')) {
	console.log('inside republica')
	if (location.href.includes('/pwa/')) {
		location.href = location.href.replace('/pwa/', '/ws/detail/');
	}

	if (location.href.includes('/ws/detail/')) {
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

if (urlMatches('americanbanker.com')) {
	const paywall = document.getElementsByClassName(
		"embargo-content"
	);
	if (paywall && paywall.length>0 ) {
		paywall[0].className = "";
	}
}

if (urlMatches('telegraaf.nl')) {
	const paywall = document.getElementById('TEMPRORARY_METERING_ID');
	if (paywall) {
		window.location.reload(1);
	}
}

if (urlMatches('ed.nl')) {
	const paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
	if (paywall) {
		paywall.remove();
		paywall = null;
	}
}

if (urlMatches('washingtonpost.com')) {
	if (location.href.includes('/gdpr-consent/')) {
		document.querySelector('.gdpr-consent-container .continue-btn.button.free').click();

		const gdprcheckbox = document.querySelector('.gdpr-consent-container .consent-page:not(.hide) #agree');
		if (gdprcheckbox) {
			gdprcheckbox.checked = true;
			gdprcheckbox.dispatchEvent(new Event('change'));

			document.querySelector('.gdpr-consent-container .consent-page:not(.hide) .continue-btn.button.accept-consent').click();
		}
	}
}

if (urlMatches('wsj.com')) {
	if (location.href.includes('/articles/')) {
		document.querySelector('.close-btn').click();
	}
}

if (urlMatches('sloanreview.mit.edu')) {
	document.querySelector('#cboxClose').click();
}

if (urlMatches('mexiconewsdaily.com')) {
	document.addEventListener('DOMContentLoaded', () => {
		const sideNotification = document.querySelector('.pigeon-widget-prompt');
		const subMessage = document.querySelector('.sub_message_container');
		const popup = document.querySelector('.popupally-pro-outer-full-width-7-fluid_qemskqa');
		const bgFocusRemoverId = document.getElementById('popup-box-pro-gfcr-7');

		removeDOMElement(sideNotification, subMessage, popup, bgFocusRemoverId);
	});
}

if (urlMatches('the-american-interest.com')) {
  const counter = document.getElementById('article-counter') || false;
  if (counter) {
    counter.remove();
    counter = false; 
  }
}

if (urlMatches('nzherald.co.nz')) {
  const paywall = document.getElementById(
    "article-content"
  );
    if (paywall) {
      paywall.classList.remove('premium-content');
      paywall.classList.add('full-content');
      var paras = paywall.querySelectorAll("p, span, h2, div");
	  var delClass = "";
	  for (var i = paras.length; i--;) {
	    if (delClass == "") {
		  delClass = paras[i].className;
		}
        paras[i].classList.remove(delClass);
        paras[i].removeAttribute('style');
      }
  }
}

function removeDOMElement(...elements) {
	for (let element of elements) {
		if (element) element.remove();
	}
}
