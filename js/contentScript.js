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
