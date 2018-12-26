let tweetForm = document.querySelector('#tweetForm');
let tweetsList = document.querySelector('#tweetsList');

// getting local storage content. If its empty - do nothing
let tweets = [];
if (localStorage.getItem('tweets')) {
    tweets = JSON.parse(localStorage.getItem('tweets'));
}

//create tweet
function createTweetElement(tweetText) {
    let liTemplate = `
    <li class="list-group-item tweets__item">
        ${tweetText}
        <i class="tweets__close"></i>
    </li>`

    tweetsList.insertAdjacentHTML('afterbegin',liTemplate)
}


// print tweets from LC
function printTweetsFromLS() {
    if (localStorage.getItem('tweets')) {
        tweets.forEach(function (el) {
            createTweetElement(el)
        })
    }
};
printTweetsFromLS();


function clearLocalStorage() {
    let trigger = document.querySelector('#localStorageCleaner');
    trigger.addEventListener('click', function(){
        localStorage.clear();
    }) 
}
clearLocalStorage();


function deleteTweet() {
    // use delegation because elements are creating dynamicly
    tweetsList.addEventListener('click', function(evt){
        //check if we click on close btn
        if(evt.target.classList.contains('tweets__close')) {
            // get parent element (li)
            let currentTweet = evt.target.parentElement;
            //get parent`s text and remove all whitespace in order to make compare in future
            let currentTweetText = currentTweet.textContent.trim();
            //if dom element we clicked matches the array item (it matches), delete it from array and push changes to LS
            tweets.forEach(function(el, index){
                if(el == currentTweetText) {
                    tweets.splice(index, 1);
                    localStorage.setItem('tweets', JSON.stringify(tweets));
                }
            })
            // delete element from dom
            currentTweet.remove();
        }
    })
}
deleteTweet();

//handling adding of a new item
tweetForm.addEventListener('submit', function (evt) {
    //disallow default behavior
    evt.preventDefault();
    let tweetContent = document.querySelector('#tweetContent').value;

    // check if value in textarea isnt empty
    if (tweetContent) {
        //clear the textarea
        this.reset();

        //add new tweet to the tweets array and push it to LS
        tweets.push(tweetContent);

        localStorage.setItem('tweets', JSON.stringify(tweets));

        // //add new tweet to the DOM
        createTweetElement(tweetContent);
    }
})