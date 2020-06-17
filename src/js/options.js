// Shortcut for document.querySelector()
function $(sel, el = document) {
  return el.querySelector(sel);
}

// Shortcut for document.querySelectorAll()
function $$(sel, el = document) {
  return Array.from(el.querySelectorAll(sel));
}

// Select UI pane
function selectPane(e) {
  const panes = $$('.pane');
  for (const tab of $$('#tabs button')) {
    tab.classList.toggle('active', tab == e.target);
  }

  for (const pane of panes) {
    pane.classList.toggle('active', pane.id == e.target.dataset.pane);
  }
}

// Saves options to extensionApi.storage
function saveOptions () {

  const sites = $$('#bypass_sites input').reduce(function (memo, inputEl) {
    if (inputEl.checked) {
      memo[inputEl.dataset.key] = inputEl.dataset.value;
    }
    return memo;
  }, {});

  const customSites = $('#custom_sites').value
    .split('\n')
    .map(s => s.trim())
    .filter(s => s);

  extensionApi.storage.sync.set({
    sites: sites,
    customSites: customSites
  }, function () {
    // Update status to let user know options were saved.
    const status = $('#status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';

      // Reload runtime so background script picks up changes
      chrome.runtime.reload();

      window.close();
    }, 800);
  });
}

// Restores checkbox input states using the preferences
// stored in extensionApi.storage.
function renderOptions () {
  extensionApi.storage.sync.get({
    sites: {},
    customSites: [],
  }, function (items) {
    // Render supported sites
    const sites = items.sites;
    for (const key in defaultSites) {
      if (!Object.prototype.hasOwnProperty.call(defaultSites, key)) {
        continue;
      }

      const value = defaultSites[key];
      const labelEl = document.createElement('label');
      const inputEl = document.createElement('input');
      inputEl.type = 'checkbox';
      inputEl.dataset.key = key;
      inputEl.dataset.value = value;
      inputEl.checked = (key in sites) || (key.replace(/\s\(.*\)/, '') in sites);

      labelEl.appendChild(inputEl);
      labelEl.appendChild(document.createTextNode(key));
      $('#bypass_sites').appendChild(labelEl);
    }

    // Render custom sites
    const customSites = items.customSites;
    $('#custom_sites').value = customSites.join('\n');
  });
}

// Select/deselect all supported sites
function selectAll () {
  for (const el of $$('input')) {
    el.checked = this.checked;
  };
}

// Initialize UI
function init() {
  renderOptions();

  $('#save').addEventListener('click', saveOptions);
  $('#select-all input').addEventListener('click', selectAll);

  for (const el of $$('#tabs button')) {
    el.addEventListener('click', selectPane);
  }

  selectPane({target: $('#tabs button:first-child')});

  if (extensionApi === chrome) {
    document.body.classList.add('customSitesEnabled');
  }
}

document.addEventListener('DOMContentLoaded', init);
