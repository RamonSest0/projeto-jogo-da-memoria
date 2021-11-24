let game = {

    techs: ['bootstrap', 'css', 'electron', 'firebase', 'html', 'javascript', 'jquery', 'mongo', 'node', 'react'],

    cards: null,

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0]

        if (card.flipped || this.lockMode) {
            return false
        }

        if (this.firstCard == null) {
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }
        else {
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }

    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCard: function () {
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unFlipCards: function () {
        this.firstCard.flipped = false
        this.secondCard.flipped = false

        this.clearCard()
    },

    checkGameOver: function () {
       return this.cards.filter(card => !card.flipped).length == 0
    },

    // creation of cards - start
    createCardsFromTechs: function () {
        this.cards = []

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        })
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    },

    createPairFromTech: function (tech) {
        return [{
            id: this.createIdFromTech(tech),
            icon: tech,
            fliped: false,
        }, {
            id: this.createIdFromTech(tech),
            icon: tech,
            fliped: false,
        }]
    },

    createIdFromTech: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },
    // creation of cards - end

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length
        let randomIndex = 0

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    },

}