// Import stylesheets
import './style.css';

//
const quoteText = document.querySelector('.quote') as HTMLElement;
const quoteBtn = document.querySelector('button') as HTMLButtonElement;
const authorName = document.querySelector('.name') as HTMLElement;
const speechBtn = document.querySelector('.speech') as HTMLElement;
const copyBtn = document.querySelector('.copy') as HTMLElement;
const twitterBtn = document.querySelector('.twitter') as HTMLElement;
const synth = window.speechSynthesis;

function randomQuote() {
  quoteBtn.classList.add('loading');
  quoteBtn.innerText = 'Loading Quote...';
  fetch('https://api.quotable.io/random')
    .then((response) => response.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      quoteBtn.classList.remove('loading');
      quoteBtn.innerText = 'New Quote';
    });
}

speechBtn.addEventListener('click', () => {
  if (!quoteBtn.classList.contains('loading')) {
    let utterance = new SpeechSynthesisUtterance(
      `${quoteText.innerText} by ${authorName.innerText}`
    );
    synth.speak(utterance);
    setInterval(() => {
      !synth.speaking
        ? speechBtn.classList.remove('active')
        : speechBtn.classList.add('active');
    }, 10);
  }
});

copyBtn.addEventListener('click', () => {
  const quoteContent = quoteText.innerText;

  // Create a temporary textarea element
  const textarea = document.createElement('textarea');
  textarea.value = quoteContent;

  // Append the textarea to the document body
  document.body.appendChild(textarea);

  // Copy the text from the textarea
  textarea.select();
  document.execCommand('copy');

  // Remove the textarea from the document body
  document.body.removeChild(textarea);

  // Update the button text and style
  copyBtn.innerHTML = '<i class="fas fa-check"></i>';
  setTimeout(() => {
    copyBtn.innerHTML = '<i class="far fa-copy"></i>';
  }, 2000);
});

twitterBtn.addEventListener('click', () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, '_blank');
});

quoteBtn.addEventListener('click', randomQuote);
