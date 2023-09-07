console.log("Let's get this party started!");

const key = '3s5vopc6AOdaxFtOwymEFI66QuKmgaFc';

let lastSearch = "";
let lastIndex = 0;
async function getGifForSearch(s) {
    if (s == "") {
        return("");
    }
    // if enter same search term, want a new image, not same as before
    // keep track & use offset to get a new gif
    let offset = 0;
    if (s == lastSearch) {
        offset = lastIndex+1;
        lastIndex++;
    } else {
        lastSearch = s;
        lastIndex = 1;
        offset = 1;
    }
    // console.log('search for', s, 'index', offset);
    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {params: {api_key: key, q: s, limit: 1, offset}});
    if (res.data.data.length > 0) {
        url = res.data.data[0].images.original.url;
        return(url);
    } else return("");
}

function addGifToPage(url) {
    const myImg = document.createElement('IMG');
    myImg.src = url;
    document.querySelector('body').appendChild(myImg);
}

const form = document.querySelector('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    url = await getGifForSearch(document.querySelector('#search-string').value);
    // console.log(url);
    if (url != "") {
        addGifToPage(url);
    }
});

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', function (e) {
    e.preventDefault();
    imgs = document.querySelectorAll('img');
    [...imgs].forEach(function (img) {
        img.remove();
    });
    // console.log('clear');
});


