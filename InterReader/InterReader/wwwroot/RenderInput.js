function RenderInput(options)
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