// Saves options to extensionApi.storage
function saveOptions () {
  const inputEls = document.querySelectorAll('#bypass_sites input');

  const sites = Array.from(inputEls).reduce(function (memo, inputEl) {
    if (inputEl.checked) {
      memo[inputEl.dataset.key] = inputEl.dataset.value;
    }
    return memo;
  }, {});

  extensionApi.storage.sync.set({
    sites: sites
  }, function () {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
      window.close();
    }, 800);
  });
}

// Restores checkbox input states using the preferences
// stored in extensionApi.storage.
function renderOptions () {
  extensionApi.storage.sync.get({
    sites: {}
  }, function (items) {
    const sites = items.sites;
    const sitesEl = document.getElementById('bypass_sites');
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
      labelEl.appendChild(document.createTextNode(' ' + key));
      sitesEl.appendChild(labelEl);
    }
  });
}

function selectAll () {
  const inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function (inputEl) {
    inputEl.checked = true;
  });
}

function selectNone () {
  const inputEls = Array.from(document.querySelectorAll('input'));
  inputEls.forEach(function (inputEl) {
    inputEl.checked = false;
  });
}

document.addEventListener('DOMContentLoaded', renderOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('select-all').addEventListener('click', selectAll);
document.getElementById('select-none').addEventListener('click', selectNone);
