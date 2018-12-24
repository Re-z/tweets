let tweetForm = document.querySelector('#tweetForm');
let tweetsList = document.querySelector('#tweetsList');
let tweets = [];  



//handling adding of a new item
tweetForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    let tweetContent = document.querySelector('#tweetContent').value;

    //clear the textarea
    this.reset();

    //add new tweet to the tweets array and push it to LS
    tweets.push(tweetContent);
    localStorage.setItem('tweets', JSON.stringify(tweets));


    //add new tweet to the DOM
    let newItem = document.createElement('li');
    newItem.classList.add('list-group-item');
    newItem.textContent = tweetContent;
    tweetsList.appendChild(newItem)
})





