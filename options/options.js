function TryChangeRuleset()
{
  chrome.storage.sync.get(
      { removeGemini: true, forceWebMode: false },
      (settings) => 
      {
        var enable = [];
        var disable = [];

        if(settings.forceWebMode && settings.removeGemini)
        {
          enable.push("geminiKillerRuleset");
        }
        else
        {
          disable.push("geminiKillerRuleset");
        }

        chrome.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds:disable, enableRulesetIds:enable});
      }
    );
}

// Saves options to chrome.storage
const saveOptions = () => {
  const removeGemini = document.getElementById('removeGemini').checked;
  const forceWebMode = document.getElementById('forceWebMode').checked;

  chrome.storage.sync.set({ removeGemini: removeGemini, forceWebMode: forceWebMode });

  TryChangeRuleset();
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { removeGemini: true, forceWebMode: false },
    (settings) => {
      document.getElementById('removeGemini').checked = settings.removeGemini;
      document.getElementById('forceWebMode').checked = settings.forceWebMode;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('removeGemini').addEventListener('click', saveOptions);
document.getElementById('forceWebMode').addEventListener('click', saveOptions);