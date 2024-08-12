//const AI_OVERVIEW_BLOCK = "div.kIyOC";
//const AI_OVERVIEW_BLOCK = "div.rEow3c";
const AI_OVERVIEW_BLOCK = "h1.VW3apb";
const SUB_AI_OVERVIEW_BLOCK = "div.s7d4ef";
const TEST_AI_OVERVIEW_BLOCK = "div.ALnV7";

//Thanks to user "Yong Wang" at https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
function WaitForElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function zapAiOverview()
{
	chrome.storage.sync.get(
	    { removeAiOverview: true, forceWeb: false },
	    (settings) => {
	    	if(settings.removeAiOverview)
	    	{
	    		//If Gemini Fails to find an answer, this will remove the "Failed" text
	    		WaitForElement(AI_OVERVIEW_BLOCK).then((aiOverviewElement) => 
	    		{
		    		//console.log("Wait over for element");
		    		//console.log(aiOverviewElement);
					
					//aiOverviewElement.parentElement.removeChild(subAiOverviewElement);
					//aiOverviewElement.replaceChildren([]);
					aiOverviewElement.parentElement.replaceChildren([]);
	    		});

				/*
	    		//If Gemini finds an answer, the previous block will leave a chunk of empty space, which this gets rid of
	    		WaitForElement(SUB_AI_OVERVIEW_BLOCK).then((subAiOverviewElement) => 
	    		{
		    		console.log("Wait over for element");
		    		console.log(subAiOverviewElement);
					subAiOverviewElement.parentElement.removeChild(subAiOverviewElement);
	    		});

	    		WaitForElement(TEST_AI_OVERVIEW_BLOCK).then((testAiOverviewElement) => 
	    		{
		    		console.log("Wait over for element");
		    		console.log(testAiOverviewElement);
					//testAiOverviewElement.parentElement.removeChild(testAiOverviewElement);
					testAiOverviewElement.replaceChildren([]);
	    		});
	    		*/
	    	}
	    }
  	)
};

zapAiOverview();