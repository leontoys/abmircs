let player = {
    name: "Leo",
    chips: 200
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

//this will be called from start game and new card
function getRandomCard() {
    //math random gets a number between 0 and 1 - decimals
    //multiply that with 13 to get a number between 1 and 13 to represent playing cards
    //floor it to get the lowest number and add +1 to avoid zero
    //so we have a random number between 1 and 11 - for black jack 
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

//this will be called at the click of start game
function startGame() {
    //initially we are all live
    isAlive = true
    //get a random number by calling the function 
    let firstCard = getRandomCard()
    //next random number
    let secondCard = getRandomCard()
    //fill the array
    cards = [firstCard, secondCard]
    //add up the numbers in the card
    sum = firstCard + secondCard
    //load the game 
    renderGame()
}

//this function will be called from start game and new game
function renderGame() {
    //fill the cards element
    cardsEl.textContent = "Cards: "
    //keep adding the cards with a space in between
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    //add up the cards
    sumEl.textContent = "Sum: " + sum
    //and then check what message we should show
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        //if the sum is greater than 21, we're dead 
        message = "You're out of the game!"
        isAlive = false
    }
    //show the message
    messageEl.textContent = message
}

//this will be called when we click on new card 
function newCard() {
    //as long as we are alive and haven't got black jack, contiue play
    if (isAlive === true && hasBlackJack === false) {
        //get a random card
        let card = getRandomCard()
        //add up the cards
        sum += card
        //push the new card to the card array
        cards.push(card)
        //load game
        renderGame()        
    }
}
