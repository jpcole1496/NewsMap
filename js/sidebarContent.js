

function setup(){
	
	var url = 'https://newsapi.org/v2/top-headlines?' +
		      'country=us&' +
	          'apiKey=747e8cec0a4d4c67bebbb0c83a25387e';

	var sc = sidebar.getContainer();


	generateNews("United States", "us")
	
	//generate heading



	//create set of news data and store in div newsSet
	
}

function generateNews(country_name, country_code){
	
	var sc = sidebar.getContainer();
	$(sc).empty();
	
	createHeading("Top News", country_name);
	

	var url = 'https://newsapi.org/v2/top-headlines?' +
		      'country='+country_code+'&' +
	          'apiKey=747e8cec0a4d4c67bebbb0c83a25387e';

	loadJSON(url, gotData);




	function createHeading(heading, country_name){
		var headingDiv = document.createElement("DIV");
		headingDiv.id = "headingDiv";
		headingDiv.align = "center";
		var h1 = document.createElement("H1");

		
		$(h1).append(heading);
		$(headingDiv).append(h1);
		$(headingDiv).append(country_name);
		$(sc).append(headingDiv);
	}

	function gotData(data){
		
		var h = [];
		var img = [];
		var noImageStories = [];

		var storySegment = [];
		var newsSet = document.createElement("DIV");
		newsSet.className = "newsSet";

		for(let i = 0; i < data.articles.length; i++){
			h.push(document.createElement("H3"));
			img.push(document.createElement("IMG"));
			storySegment.push(document.createElement("DIV"));
			storySegment[i].className = "storySegment";

			img[i].src = data.articles[i].urlToImage;
			//img[i].height = "300";
			//img.alt = "centered image";

			h[i].appendChild(document.createTextNode(data.articles[i].title));
			if(data.articles[i].urlToImage != null){

				storySegment[i].appendChild(img[i]);
				storySegment[i].appendChild(h[i]);
				newsSet.appendChild(storySegment[i]);
			}else{
				storySegment[i].appendChild(h[i])
				noImageStories.push(storySegment[i]);
			}
		}

		for (let i = 0; i < noImageStories.length; i++){
			newsSet.appendChild(noImageStories[i]);
		}
		sc.appendChild(newsSet);

	}
}