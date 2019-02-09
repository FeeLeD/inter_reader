function RenderedArticle(options)
{
	var renderedText = options.text;
	var renderResult;

    this.renderElement = function()
    {
    	initElement();
    	renderText();

    	return renderResult;
    }

    function initElement()
    {
    	renderResult = document.createElement('div');
        renderResult.id = "rendered-article";

        renderResult.onclick = function(event) {
        	if (event.target.closest('.rendered-word'))
        		selectWord(event.target.closest('.rendered-word'));
        } 

       	renderResult.onmousedown = function() {
       		return false;
       	}
    }

    function selectWord(wordElement)
    {
    	var e = new CustomEvent('select', 
    		{ detail: wordElement.innerHTML });
    	renderResult.dispatchEvent(e);
    }

    function renderText()
    {        
        var words = renderedText.split(' ');
        for(var i = 0; i < words.length; i++)
        {
            var wordContainer = document.createElement('span');
            wordContainer.className = 'rendered-word';
            wordContainer.appendChild(document.createTextNode(words[i]));
            renderResult.appendChild(wordContainer);
            renderResult.appendChild(document.createTextNode(' '));
        }
    }	

    this.getText = function()
    {
    	return renderedText;
    }
}