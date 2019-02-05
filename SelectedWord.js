function SelectedWord()
{
	var word = '';
	var wordHolder;
	var translationHolder;

	this.renderElement = function()
	{
		var element = document.createElement('div');
		element.id = 'chosen-word';

		var header = document.createElement('h3');
		header.appendChild(document.createTextNode('You have chosen:'));

		wordHolder = document.createElement('div');
		translationHolder = document.createElement('div');

		element.appendChild(header);
		element.appendChild(wordHolder);
		element.appendChild(translationHolder);

		return element;
	}

	this.setWord = function(_word)
	{
		word = _word;
		wordHolder.innerHTML = word;

		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'translate?word=' + word, false);
		xhr.send();
		translationHolder.innerHTML = xhr.responseText;
	}

	this.getWord = function()
	{
		return word;
	}
}