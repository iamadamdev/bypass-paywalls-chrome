var defaultSites = {
  'The Age': 'theage.com.au',
  'Baltimore Sun': 'baltimoresun.com',
  'Barron\'s': 'barrons.com',
  'Bloomberg': 'bloomberg.com',
  'Crain\'s Chicago Business': 'chicagobusiness.com',
  'Chicago Tribune': 'chicagotribune.com',
  'Corriere Della Sera': 'corriere.it',
  'Daily Press': 'dailypress.com',
  'Dagens Nyheter': 'dn.se',
  'The Economist': 'economist.com',
  'Financial Times': 'ft.com',
  'Glassdoor': 'glassdoor.com',
  'Haaretz': 'haaretz.co.il',
  'Haaretz English': 'haaretz.com',
  'Hartford Courant': 'courant.com',
  'Harvard Business Review': 'hbr.org',
  'Het Financieele Dagblad': 'fd.nl',
  'Inc.com': 'inc.com',
  'Le Temps': 'letemps.ch',
  'Los Angeles Times': 'latimes.com',
  'Medium': 'medium.com',
  'Medscape': 'medscape.com',
  'MIT Technology Review': 'technologyreview.com',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NRC': 'nrc.nl',
  'The Boston Globe': 'bostonglobe.com',
  'The Mercury News': 'mercurynews.com',
  'The Morning Call': 'mcall.com',
  'The Nation': 'thenation.com',
  'The New York Times': 'nytimes.com',
  'The New Yorker': 'newyorker.com',
  'OrlandoSentinel': 'orlandosentinel.com',
  'Quora': 'quora.com',
  'SunSentinel': 'sun-sentinel.com',
  'TheMarker': 'themarker.com',
  'The Seattle Times': 'seattletimes.com',
  'The Sydney Morning Herald': 'smh.com.au',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Wired': 'wired.com'
};

// Saves options to chrome.storage
function save_options() {
  var gh_url = document.getElementById('bypass_sites').value;
  var inputEls = document.querySelectorAll('#bypass_sites input');
  var sites = {};

  var sites = Array.from(inputEls).reduce(function(memo, inputEl) {
    if (inputEl.checked) {
      memo[inputEl.dataset.key] = inputEl.dataset.value;
    }
    return memo;
  }, {});

  chrome.storage.sync.set({
    sites: sites
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
      window.close();
    }, 800);
  });
}

// Restores checkbox input states using the preferences
// stored in chrome.storage.
function renderOptions() {
  chrome.storage.sync.get({
    sites: {}
  }, function(items) {
    var sites = items.sites;
    var sitesEl = document.getElementById('bypass_sites');
    for (var key in defaultSites) {
      if (!defaultSites.hasOwnProperty(key)) {
        continue;
      }

      var value = defaultSites[key];
      var labelEl = document.createElement('label');
      var inputEl = document.createElement('input');
      inputEl.type = 'checkbox';
      inputEl.dataset.key = key;
      inputEl.dataset.value = value;
      inputEl.checked = key in sites;

      labelEl.appendChild(inputEl);
      labelEl.appendChild(document.createTextNode(' '+key));
      sitesEl.appendChild(labelEl);
    }
  });
}

function selectAll() {
  var inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function(inputEl) {
    inputEl.checked = true;
  });
}

function selectNone() {
  var inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function(inputEl) {
    inputEl.checked = false;
  });
}

document.addEventListener('DOMContentLoaded', renderOptions);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('select-all').addEventListener('click', selectAll);
document.getElementById('select-none').addEventListener('click', selectNone);

