// selecting element 
const addQuestion = document.getElementById('show-btn')
const questionsList = document.getElementById('questions-list')
let items = []

addQuestion.addEventListener('click', event => {
    // question card 
    const questionCard = document.querySelector('.question-card')
    questionCard.classList.add('showItem')
    
    const closeBtn = document.querySelector('.close-btn')
    const feedback = document.querySelector('.feedback')
    const questionForm = document.getElementById('question-form')
    const questionInput = document.getElementById('question-input')
    const answerInput = document.getElementById('answer-input')

    // close question card 
    closeBtn.addEventListener('click', () => {
        questionCard.classList.remove('showItem')
        questionInput.value = ''
        answerInput.value = ''
    })

    questionForm.addEventListener('submit', event => {
        event.preventDefault()
        if (questionInput.value === '' || answerInput.value === '') {
            feedback.classList.add('showItem', 'alert-danger')
            setTimeout(() => feedback.classList.remove('showItem'), 3000)
        } else {
            let item = {}
            item.id = items.length + 1
            item.question = questionInput.value
            item.answer = answerInput.value
            items.push(item)
            createElements(items)

            // clear input field 
            questionInput.value = ''
            answerInput.value = ''
        }
    })
})

function createElements(items) {
    let mapElements = items.map(item => {
        const {question, answer} = item
        return `<div class="col-md-4">
                  <div class="card card-body flashcard my-3">
                    <h4 class="text-capitalize">${question}</h4>
                    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
                    <h5 class="answer mb-3">${answer}</h5>
                    <div class="flashcard-btn d-flex justify-content-between">
                      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id>edit</a>
                      <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
                    </div>
                  </div>
                </div>`
    }).join('')
    questionsList.innerHTML = mapElements

    // answer show or remove
    questionsList.querySelector('.show-answer').addEventListener('click', () => {
        questionsList.querySelector('.answer').classList.toggle('showItem')
    })
}