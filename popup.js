// Saves options to chrome.storage
const saveOptions = () => {
  const removeGemini = document.getElementById('removeGemini').checked;

  var enable = [];
  var disable = [];

  if(removeGemini)
  {
    enable.push("geminiKillerRuleset");
  }
  else
  {
    disable.push("geminiKillerRuleset");
  }
  chrome.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds:disable, enableRulesetIds:enable});

  chrome.storage.sync.set({ removeGemini: removeGemini });
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { removeGemini: true },
    (settings) => {
      document.getElementById('removeGemini').checked = settings.removeGemini;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('removeGemini').addEventListener('click', saveOptions);