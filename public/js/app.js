console.log('Client side JS is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weather_data = document.querySelector('#weather-data')
const weather_error = document.querySelector('#weather-error')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value

    weather_data.textContent = 'Loading...'
    weather_error.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                weather_error.textContent = data.error
                weather_data.textContent = ''
            }else{
                weather_data.textContent = data.foreCastData.weather_descriptions 
                 console.log(data.foreCastData)
                 console.log(data.address)
            }
        })
    })
})