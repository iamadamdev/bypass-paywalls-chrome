window.localStorage.clear();

if (location.hostname.endsWith('rep.repubblica.it')) {
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

if (window.location.href.indexOf("americanbanker.com") !== -1) {
  const paywall = document.getElementsByClassName(
    "embargo-content"
  );
  if (paywall && paywall.length>0 ) {
    paywall[0].className = "";
  }
}

if (window.location.href.indexOf('telegraaf.nl') !== -1) {
  const paywall = document.getElementById('TEMPRORARY_METERING_ID');
  if (paywall) {
    window.location.reload(1);
  }
}

if (window.location.href.indexOf('ed.nl') !== -1) {
  const paywall = document.querySelector('.article__component.article__component--paywall-module-notification');
  if (paywall) {
    paywall.remove();
    paywall = null;
  }
}

if (window.location.href.indexOf("washingtonpost.com") !== -1) {
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

if (window.location.href.indexOf("wsj.com") !== -1) {
  if (location.href.includes('/articles/')) {
    document.querySelector('.close-btn').click();
  }
}

if (window.location.href.indexOf("sloanreview.mit.edu") !== -1) {
  document.querySelector('#cboxClose').click();
}

