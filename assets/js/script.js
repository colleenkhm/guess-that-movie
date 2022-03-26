// Key used to cycle-translate quote
const API_KEY_ARRAY = ["695b7de203msh85a16cf1aaf725bp1958bajsna0fdaffe3744", "333649115emshd84300e2a1f283ap1dc477jsne70712daa27b", "9502e893e6msh44cd181c6ff0b00p19a994jsna4c2f6d66e26"];
const LANG_KEY_ARRAY = ['en', 'is', 'es', 'en'];
const QUOTES_STORE = "quotesStore"
var quote = "";
var request = "";
var titles = [];
var correctTitle = "";

// Fetching movie quotes and storing in local storage, setting parameters for when to call from api, calling "quote" and "quote from" variables
function getQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
	if (quotes.length === 0) {
	
		fetch("https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "movie-and-tv-shows-quotes.p.rapidapi.com",
				"x-rapidapi-key": API_KEY_ARRAY[Math.floor(Math.random()*3)]
			}
		})
		.then(function (response) {
			return response.json();
		})
		.then(data => {
			for (var index = 0; index < data.length; index++) {
				const { quote, quoteFrom } = data[index];
				quotes.push({quote, quoteFrom });
			}
			localStorage.setItem(QUOTES_STORE, JSON.stringify(quotes));
		})
		.catch(err => {
			console.error(err);
		});
	}
}

// Function to get random quote and movie title for question. Plus get 3 random titles for incorrect answer
function randomQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
	if(quotes.length === 0) {return;}

	var correctQuoteIndex = Math.floor(Math.random() * quotes.length);
	quote = quotes[correctQuoteIndex].quote;
	titles.push(quotes[correctQuoteIndex].quoteFrom);
	for (var index = 0; index < 3; index++) {
		var incorrectTitleIndex = Math.floor(Math.random() * quotes.length);
		while (incorrectTitleIndex === correctQuoteIndex) {
			incorrectTitleIndex = Math.floor(Math.random() * quotes.length);
		}
		titles.push(quotes[incorrectTitleIndex].quoteFrom);
	}
}(10);

// Function to pass quote through translate-cycle. overwrite quote value till final translate value of english
async function translateQuote() {
	for (var index = 0; index < LANG_KEY_ARRAY.length - 1; index++) {
		console.log(quote);
		request = "https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=" + quote + "&from=" + LANG_KEY_ARRAY[index] + "&langDest=" + LANG_KEY_ARRAY[index + 1];
		console.log(request);
		const response = await fetch(request, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "fast-translate.p.rapidapi.com",
				"x-rapidapi-key": API_KEY_ARRAY[index]
			}
		})
		const data = await response.json();
		quote = data.translated_text;
		if(quote.includes("<i>") === true){
			cleanQuote();
		}
	}
	$("#translatedQuote").html(quote);
}

// Function to clean broken results from API
function cleanQuote(){
	while(quote.includes("<i>")){
		let iStart = quote.indexOf("<i>");
		let iEnd = quote.indexOf("</i>") + 4;
		
		quote = quote.replace(quote.substring(iStart, iEnd), "");
	}
	quote = quote.replace(/<\/?[^>]+(>|$)/g, "");
	quote = quote.replace("  ", " ");
}

// Function to shuffle answer options
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function randomTitles() {
	correctTitle = titles[0];
	titles = shuffle(titles);
	for(var index = 0; index < titles.length; index++) {
		var btnId = "#answer-" + (index + 1);
		$(btnId).html(titles[index]);
	}
}

function validateAnswer(element) {
	var answer = $(element).text();
	if(answer === correctTitle) {
		$(element).addClass("green");
		location.reload();
	} else {$(element).addClass("red");}
}

$(document).ready(function(){
	getQuotes();
	randomQuotes();
	translateQuote();
	randomTitles();
});
