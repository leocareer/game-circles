const startBtn = document.querySelector(`#start`)
const screens = document.querySelectorAll(`.screen`)
const timeList = document.querySelector(`#time-list`)
const timeEl = document.querySelector(`#time`)
const board = document.querySelector(`#board`)
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault() //отменили поведение по умолчанию
    screens[0].classList.add('up') //перелистывание
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) { 
        time = parseInt(event.target.getAttribute('data-time')) //взяли строчку с кнопки, сделали инт, положили тому кто будет показывать время
        screens[1].classList.add('up') //перенесли сюда чтобы лишний раз не добавлялся класс
        startGame() //когда жмём на кнопку что происходит появляется время и начинается игра
    }
}) //event.target это тот по которому кликнули. если у элемента содержится класс time-btn,

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time) 
} 
//будет выполнять через заданный промежуток времени другую функцию
//вставляем в html строчку в которую вставляем время которое получили с кнопки
//screens[1].classList.add('up') //изменяем экран //перенесли наверх

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) { 
        current = `0${current}`
        }  
        setTime(current)
    }
} //задний ход времени

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    // timeEl.parentNode.remove() убираем заголовой сверху
    timeEl.parentNode.classList.add('hide') //так лучше
    board.innerHTML = `<h1>score: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div') //создаём див под кружок
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    
    circle.classList.add('circle') //добавили класс на этот элемент
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}