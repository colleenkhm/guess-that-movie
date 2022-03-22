// Key used to cycle-translate quote
var titlesDisplayed = document.getElementsByClassName("answers");
const API_KEY_ARRAY = ["7dfdabab39mshe66929e496b9f2fp1579a2jsn3839847d0fe0", "dbafd19532msh123cbfa3e8d5b7ap1f5b9fjsn6ee9576f0651", "e2864e38b4msh47717c5089b5460p174591jsn2c1bf2b46b09"];
const LANG_KEY_ARRAY = ['en', 'es', 'la', 'en'];
const QUOTES_STORE = "quotesStore"
var date = moment().format('DD')
var quote = "";
var titles = [];
var correctTitle = "";

// Fetching movie quotes and storing in local storage, setting parameters for when to call from api, calling "quote" and "quote from" variables
function getQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
	if (quotes.length === 0 || date > quotes[0].date) {
		localStorage.clear();
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
				quotes.push({ date, quote, quoteFrom });
			}
			localStorage.setItem(QUOTES_STORE, JSON.stringify(quotes));
		})
		.catch(err => {
			console.error(err);
		});
	}
}

// TODO: get random quote and movie title for question. Plus get 3 random titles for incorrect answer
function randomQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
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
}
let titleArray = titles;

//TODO: Function to pass quote through translate-cycle. overwrite quote value till final translate value of english
function translateQuote() {
	for (var index = 0; index < LANG_KEY_ARRAY.length - 1; index++) {

		var request = "https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=" + quote + "&from=" + LANG_KEY_ARRAY[index] + "&langDest=" + LANG_KEY_ARRAY[index + 1];
		fetch(request, {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "fast-translate.p.rapidapi.com",
				"x-rapidapi-key": API_KEY_ARRAY[index]
			}
		})
		.then(function (response) {
			return response.json();
		})
		.then(data => {
			quote = data.translated_text;
			console.log(quote);
		})
		.catch(err => {
			console.error(err);
		});
	}
	$("#translatedQuote").html(quote);
	// quoteDisplayed.innerHTML = quote;
}

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
	} else {$(element).addClass("red");}
}


getQuotes();
randomQuotes();
translateQuote();
randomTitles();
// localStorage.clear();