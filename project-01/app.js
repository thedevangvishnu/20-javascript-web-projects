const quotesContainer = document.getElementById("quotes-container"),
  nextBtn = document.getElementById("next-btn"),
  twitterBtn = document.getElementById("twitter-btn"),
  loader = document.getElementById("loader"),
  quoteText = document.getElementById("quote"),
  authorText = document.getElementById("author");

// global quotes array
let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quotesContainer.hidden = true;
};

const removeloadingSpinner = () => {
  quotesContainer.hidden = false;
  loader.hidden = true;
};

// generate new quote
const newQuote = () => {
  showLoadingSpinner();
  const random = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[random];
  const { text, author } = quote;

  quoteText.textContent = text;
  authorText.textContent = author;

  if (text.length > 110 && text.length < 180) {
    quoteText.classList.add("quote__small");
  } else if (text.length > 180) {
    quoteText.classList.add("quote__very__small");
  } else {
    quoteText.classList.remove("quote__small");
    quoteText.classList.remove("quote__very__small");
  }
  removeloadingSpinner();
};

// fetch data using api
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
  } catch (error) {
    console.log("Some error", error.message);
  }
};

getQuotes();

// tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
};

// when twitter button is clicked, tweet the quote
twitterBtn.addEventListener("click", tweetQuote);

// when next btn is clicked, generate new quotes
nextBtn.addEventListener("click", newQuote);
