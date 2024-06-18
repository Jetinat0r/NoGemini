const GEMINI_BLOCK = "div.ALnV7";
const SUB_GEMINI_BLOCK = "div.s7d4ef";
const TEST_GEMINI_BLOCK = "div.KTPFee";

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


function zapGemini()
{
	chrome.storage.sync.get(
	    { removeGemini: true, forceWeb: false },
	    (settings) => {
	    	if(settings.removeGemini)
	    	{
	    		//If Gemini Fails to find an answer, this will remove the "Failed" text
	    		/*
	    		WaitForElement(SUB_GEMINI_BLOCK).then((subGeminiElement) => 
	    		{
		    		console.log("Wait over for element");
		    		console.log(subGeminiElement);
					subGeminiElement.parentElement.removeChild(subGeminiElement);
	    		});

	    		//If Gemini finds an answer, the previous block will leave a chunk of empty space, which this gets rid of
	    		WaitForElement(GEMINI_BLOCK).then((geminiElement) => 
	    		{
		    		console.log("Wait over for element");
		    		console.log(geminiElement);
					geminiElement.parentElement.removeChild(geminiElement);
	    		});
				*/

	    		WaitForElement(TEST_GEMINI_BLOCK).then((testGeminiElement) => 
	    		{
		    		console.log("Wait over for element");
		    		console.log(testGeminiElement);
					//testGeminiElement.parentElement.removeChild(testGeminiElement);
					testGeminiElement.replaceChildren([]);
	    		});
	    	}
	    }
  	)
};

zapGemini();