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
  const forceWebMode = document.getElementById('forceWebMode').checked;

  chrome.storage.sync.set({ removeAiOverview: removeAiOverview, forceWebMode: forceWebMode });

  TryChangeRuleset();
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { removeAiOverview: true, forceWebMode: false },
    (settings) => {
      document.getElementById('removeAiOverview').checked = settings.removeAiOverview;
      document.getElementById('forceWebMode').checked = settings.forceWebMode;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('removeAiOverview').addEventListener('click', saveOptions);
document.getElementById('forceWebMode').addEventListener('click', saveOptions);