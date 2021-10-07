// selecting element 
const addQuestion = document.getElementById('show-btn')
const questionsList = document.getElementById('questions-list')
const closeBtn = document.querySelector('.close-btn')
const feedback = document.querySelector('.feedback')
const questionForm = document.getElementById('question-form')
const questionInput = document.getElementById('question-input')
const answerInput = document.getElementById('answer-input')
const questionCard = document.querySelector('.question-card')
let items = []
let num 


if (JSON.parse(localStorage.getItem('items'))) {
    items = JSON.parse(localStorage.getItem('items'))
    const idNum = items.map(item => {
        return item.id
    })
    num = (Math.max(...idNum)) + 1
    console.log(num)
} else {
    num = 1
}

addQuestion.addEventListener('click', event => {
    // show question card 
    questionCard.classList.add('showItem')
})

closeBtn.addEventListener('click', () => {
    questionCard.classList.remove('showItem')
    questionInput.value = ''
    answerInput.value = ''
})

questionForm.addEventListener('submit', event => {
    // event.preventDefault()
    if (questionInput.value === '' || answerInput.value === '') {
        feedback.classList.add('showItem', 'alert-danger')
        setTimeout(() => feedback.classList.remove('showItem'), 3000)
    } else {
        // updating items 
        if (JSON.parse(localStorage.getItem('items'))) {
            items = JSON.parse(localStorage.getItem('items'))
        }

        let item = {}
        item.id = num++
        item.question = questionInput.value
        item.answer = answerInput.value
        items.push(item)

        createElements(items)

        // save to locakStorage
        saveToLocalStorage(items)

        // clear input field 
        questionInput.value = ''
        answerInput.value = ''
    }
})

function createElements(items) {
    let mapElements = items.map(item => {
        const {id, question, answer} = item
        return `<div class="col-md-4">
                  <div class="card card-body flashcard my-3">
                    <h4 class="text-capitalize">${question}</h4>
                    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
                    <h5 class="answer mb-3">${answer}</h5>
                    <div class="flashcard-btn d-flex justify-content-between">
                      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id=${id}>edit</a>
                      <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id=${id}>delete</a>
                    </div>
                  </div>
                </div>`
    }).join('')
    questionsList.innerHTML = mapElements

    // answer show or remove
    questionsList.querySelectorAll('.show-answer').forEach(show => {
        show.addEventListener('click', event => event.target.nextElementSibling.classList.toggle('showItem'))
    })
    // edit button 
    const edit = document.querySelectorAll('.edit-flashcard')
    editFlashcard(edit)
    // delete button 
    const delete_ = document.querySelectorAll('.delete-flashcard')
    deleteFlashcard(delete_)
}

// save to locakStorage
function saveToLocalStorage(items) {
    localStorage.setItem('items', JSON.stringify(items))
}

// loading element
window.addEventListener('DOMContentLoaded', () => {
    let getItems = JSON.parse(localStorage.getItem('items'))
    createElements(getItems)
})

// edit flashcard
function editFlashcard(editBtns) {
    editBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            const question = event.target.parentElement.parentElement.firstElementChild
            questionInput.value = question.innerText
            // show question card 
            questionCard.classList.add('showItem')
            filter_remove(event)
        })
    })
}

// delete flashcard
function deleteFlashcard(deleteBtns) {
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', event => {
            filter_remove(event)
        })
    })
}

// filtering array and remove element
function filter_remove(event) {
    items = items.filter(item => {
        return !(item.id == event.target.dataset.id)
    })
    saveToLocalStorage(items)

    const parent = event.target.parentElement.parentElement.parentElement
    parent.remove()
}