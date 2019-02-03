function ArticleInput(options)
{
	var initialText = options.text;
	var onRender = options.onRender;
	var element;
	var area;
	var renderButton;

	this.renderElement = function()
	{
		element = document.createElement('div');
		element.id = 'article-input';
		
		area = document.createElement('textarea');
		area.value = initialText;
		
		renderButton = document.createElement('button');
		renderButton.textContent = 'render';
		renderButton.onclick = onRender;
		
		element.appendChild(area);
		element.appendChild(renderButton);
		return element;
	}

	this.getText = function()
	{
		return area ? area.value : initialText; 
	}
}

function RenderedArticle(options)
{
	var renderedText = options.text;
	var onChoice = options.onChoice;

	function renderText()
    {        
        var words = renderedText.split(' ');
        var renderResult = document.createElement('div');
        renderResult.id = "rendered-article";

        for(var i = 0; i < words.length; i++)
        {
            var wordContainer = document.createElement('span');
            wordContainer.className = 'rendered-word';
            wordContainer.appendChild(document.createTextNode(words[i]));
            wordContainer.onclick = onWordClicked;

            renderResult.appendChild(wordContainer);
            renderResult.appendChild(document.createTextNode(' '));
        }

        return renderResult;
    }

    function onWordClicked(event)
    {
    	var wordContainer = event.target;
    	onChoice(wordContainer.textContent);
    }

    this.renderElement = function()
    {
    	return renderText();
    }	

    this.getText = function()
    {
    	return renderedText;
    }
}

function ChosenWord()
{
	var word = '';
	var wordHolder;

	this.renderElement = function()
	{
		var element = document.createElement('div');
		element.id = 'chosen-word';

		var header = document.createElement('h3');
		header.appendChild(document.createTextNode('You have chosen:'));

		wordHolder = document.createElement('span');
		wordHolder.innerHTML = word;

		element.appendChild(header);
		element.appendChild(wordHolder);

		return element;
	}

	this.setWord = function(_word)
	{
		word = _word;
		wordHolder.innerHTML = word;
	}

	this.getWord = function()
	{
		return word;
	}
}