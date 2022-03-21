// Key used to cycle-translate quote
const lucasKey = "7dfdabab39mshe66929e496b9f2fp1579a2jsn3839847d0fe0";
const philipKey = "dbafd19532msh123cbfa3e8d5b7ap1f5b9fjsn6ee9576f0651";
const colleenKey = "e2864e38b4msh47717c5089b5460p174591jsn2c1bf2b46b09";
const LANG_KEY_ARRAY = ['en', 'hi', 'sw', 'en'];
const QUOTES_STORE = "quotesStore"
var date = moment().format('DD')
var titles = [];

// Fetching movie quotes and storing in local storage, setting parameters for when to call from api, calling "quote" and "quote from" variables
function getQuotes() {
	var quotes = JSON.parse(localStorage.getItem(QUOTES_STORE)) ?? [];
	if (quotes.length === 0 || date > quotes[0].date) {
		fetch("https://movie-and-tv-shows-quotes.p.rapidapi.com/quotes", {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "movie-and-tv-shows-quotes.p.rapidapi.com",
				"x-rapidapi-key": philipKey
			}
		})
		.then(function (response) {
			return response.json();
		})
		.then(data => {
			for(var index = 0; index < data.length; index++){
                const {quote, quoteFrom} = data[index];
				quotes.push({date, quote, quoteFrom});
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
	var quoteIndex = Math.floor(Math.random()*quotes.length);
	var quote = quotes[quoteIndex].quote;
	titles.push(quotes[quoteIndex].quoteFrom);
	for(var index = 0; index < 3; index++) {
		var num = Math.floor(Math.random()*quotes.length);
		while(num === quoteIndex) {
			num = Math.floor(Math.random()*quotes.length);
		}
	}
	console.log(quote);
	console.log(titles[0]);
}

getQuotes();
randomQuotes();

//TODO: Function to pass quote through translate-cycle. overwrite quote value till final translate value of english
// fetch("https://fast-translate.p.rapidapi.com/fastTranslate/translate?text=Heres looking at you!&langDest=es&from=en", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "fast-translate.p.rapidapi.com",
// 		"x-rapidapi-key": "7dfdabab39mshe66929e496b9f2fp1579a2jsn3839847d0fe0"
// 	}
// })
// .then(function(response) {
// 	return response.json();
// })
// .then(data => {
// 	console.log(data);
// })
// .catch(err => {
// 	console.error(err);
// });

// TODO: Post translated quote into read-only text-area
// TODO: Create buttons containing 1 true answer and 3 false answers
// TODO: Based on user answer indicate whether anser correct or incorrect