const manifestData = extensionApi.runtime.getManifest();
const versionString = 'v' + manifestData.version;
document.getElementById('version').innerText = versionString;
