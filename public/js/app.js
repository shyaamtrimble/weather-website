console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msgOne')
const messageTwo = document.querySelector('#msgTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch( '/weather?address=' + encodeURIComponent(location) ).then((response) => {
    response.json().then((data) => {
        
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''
        if(data.error) {
            
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.Location
            messageTwo.textContent = data.forecast
        }
    })
})
})