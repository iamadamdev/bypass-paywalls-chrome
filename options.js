var defaultSites = {
  'Algemeen Dagblad': 'ad.nl', 
  'American Banker': 'americanbanker.com',
  'Baltimore Sun': 'baltimoresun.com',
  'Barron\'s': 'barrons.com',
  'Bloomberg': 'bloomberg.com',
  'Bloomberg Quint': 'bloombergquint.com',
  'Business Insider (javascript disabled)': 'businessinsider.com',
  'Crain\'s Chicago Business': 'chicagobusiness.com',
  'Chicago Tribune': 'chicagotribune.com',
  'Corriere Della Sera': 'corriere.it',
  'Daily Press': 'dailypress.com',
  'Dagens Nyheter': 'dn.se',
  'De Groene Amsterdammer': 'groene.nl',
  'De Volkskrant': 'volkskrant.nl',
  'DeMorgen': 'demorgen.be',
  'Denver Post': 'denverpost.com',
  'Dynamed Plus': 'dynamed.com',
  'Encyclopedia Britannica': 'britannica.com',
  'Eindhovens Dagblad': 'ed.nl',
  'Examiner': 'examiner.com.au',
  'First Things': 'firstthings.com',
  'Financial News': 'fnlondon.com',
  'Financial Times': 'ft.com',
  'Foreign Policy': 'foreignpolicy.com',
  'Glassdoor': 'glassdoor.com',
  'Haaretz': 'haaretz.co.il',
  'Haaretz English': 'haaretz.com',
  'Harper\'s Mag': 'harpers.org',
  'Hartford Courant': 'courant.com',
  'Harvard Business Review': 'hbr.org',
  'Inc.com': 'inc.com',
  'Irish Times': 'irishtimes.com',
  'La Nacion': 'lanacion.com.ar',
  'La Repubblica': 'repubblica.it',
  'La Tercera': 'latercera.com',
  'L\'Echo': 'lecho.be',
  'Le Monde': 'lemonde.fr',
  'Les Echos': 'lesechos.fr',
  'Liberation': 'liberation.fr',
  'Loeb Classical Library': 'loebclassics.com',
  'Los Angeles Business Journal': 'labusinessjournal.com',
  'Los Angeles Times': 'latimes.com',
  'Medium': 'medium.com',
  'Mexico News Daily': 'mexiconewsdaily.com',
  'MIT Sloan Management Review': 'sloanreview.mit.edu',
  'MIT Technology Review': 'technologyreview.com',
  'Newsrep': 'thenewsrep.com',
  'New York Magazine': 'nymag.com',
  'Nikkei Asian Review': 'asia.nikkei.com',
  'NRC': 'nrc.nl',
  'New Zealand Herald': 'nzherald.co.nz',
  'OrlandoSentinel': 'orlandosentinel.com',
  'Parool': 'parool.nl',
  'Pittsburgh Post-Gazette': 'post-gazette.com',
  'Quartz': 'qz.com',
  'Quora': 'quora.com',
  'San Diego Union Tribune': 'sandiegouniontribune.com',
  'San Francisco Chronicle': 'sfchronicle.com',
  'Scientific American': 'scientificamerican.com',
  'Statista': 'statista.com',
  'SunSentinel': 'sun-sentinel.com',
  'Telegraaf': 'telegraaf.nl',
  'The Advocate': 'theadvocate.com.au',
  'The Age': 'theage.com.au',
  'The American Interest': 'the-american-interest.com',
  'The Atlantic': 'theatlantic.com',
  'The Australian': 'theaustralian.com.au',
  'The Australian Financial Review (javascript disabled)': 'afr.com',
  'The Boston Globe (javascript disabled)': 'bostonglobe.com',
  'The Business Journals (javascript disabled)': 'bizjournals.com',
  'The Economist (javascript disabled)': 'economist.com',
  'The Globe and Mail (javascript disabled)': 'theglobeandmail.com',
  'The Japan Times': 'japantimes.co.jp',
  'TheMarker': 'themarker.com',
  'The Mercury News': 'mercurynews.com',
  'The Morning Call': 'mcall.com',
  'The Nation': 'thenation.com',
  'The News-Gazette': 'news-gazette.com',
  'The New Statesman': 'newstatesman.com',
  'The New York Times': 'nytimes.com',
  'The New Yorker': 'newyorker.com',
  'The Philadelphia Inquirer': 'inquirer.com',
  'The Seattle Times': 'seattletimes.com',
  'The Spectator': 'spectator.co.uk',
  'The Sydney Morning Herald': 'smh.com.au',
  'The Telegraph': 'telegraph.co.uk',
  'The Times': 'thetimes.co.uk',
  'The Toronto Star (javascript disabled)': 'thestar.com',
  'The Washington Post': 'washingtonpost.com',
  'The Wall Street Journal': 'wsj.com',
  'Trouw': 'trouw.nl',
  'Winston-Salem Journal': 'journalnow.com',
  'Vanity Fair': 'vanityfair.com',
  'Vrij Nederland': 'vn.nl',
  'Wired': 'wired.com',
  'Zeit Online': 'zeit.de'
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
