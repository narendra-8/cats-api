 const catEndpoint = 'https://api.thecatapi.com/v1/images/search';
const wordsEndpoint = 'https://random-word-api.herokuapp.com/word?number=5'

function checkStatus(res) {
  if (!res.ok) Promise.reject(new Error(res.statusText));
  return Promise.resolve(res.json());
}

const renderImage = (imgUrl) => {
  const wrapper = document.getElementById('image-wrapper');
  const img = document.createElement('img');
  img.src = imgUrl;
  wrapper.append(img);
}

const renderText = (words) => {
  const wrapper = document.getElementById('text-wrapper');
  let text = '';
  words.forEach(word => text += `${word} `);
  wrapper.append(text);
}

async function renderCard() {
  try {
    const catApiRes = await fetch(catEndpoint);
    const catApiData = await checkStatus(catApiRes);
    const wordsApiRes = await fetch(wordsEndpoint);
    const wordsApiData = await checkStatus(wordsApiRes);
    
    // Waits for all the above promises to settle, then runs the rest 
    const catImgUrl = catApiData[0].url;
    renderImage(catImgUrl);
    renderText(wordsApiData);
    
  } catch(error) {
    console.log('Error:', error)
  }
}

renderCard();