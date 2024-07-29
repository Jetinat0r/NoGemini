function TryChangeRuleset()
{
  chrome.storage.sync.get(
      { removeAiOverview: true, forceWebMode: false },
      (settings) => 
      {
        var enable = [];
        var disable = [];

        if(settings.forceWebMode && settings.removeAiOverview)
        {
          enable.push("aiOverviewKillerRuleset");
        }
        else
        {
          disable.push("aiOverviewKillerRuleset");
        }

        chrome.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds:disable, enableRulesetIds:enable});
      }
    );
}

// Saves options to chrome.storage
const saveOptions = () => {
  const removeAiOverview = document.getElementById('removeAiOverview').checked;
  chrome.storage.sync.set({ removeAiOverview: removeAiOverview });

  //We may need to update the Force Web Mode rules
  TryChangeRuleset();
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { removeAiOverview: true, forceWebMode: false },
    (settings) => {
      document.getElementById('removeAiOverview').checked = settings.removeAiOverview;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('removeAiOverview').addEventListener('click', saveOptions);
document.getElementById('options').addEventListener('click', () => chrome.runtime.openOptionsPage());