document.addEventListener('DOMContentLoaded', ()=>{
    const button = document.getElementById('search')
    let longitude
    let latitude

    const renderDaysWeather = function(day){
        const dayOfMonth = day.date.toString().slice(6)
        const month = day.date.toString().slice(3, 5)
        const div = document.createElement('div')
        div.className = 'weather-card'
        const date = document.createElement('p')
        date.className = 'date'
        const weather = document.createElement('p')
        weather.className = 'weather'
        const temp = document.createElement('ul')
        temp.className = 'temp'
        const maxTemp = document.createElement('li')
        maxTemp.innerText = day.temp2m.max
        console.log(maxTemp)
        const minTemp = document.createElement('li')
    }

   
    const fetchWeather = function() {
        fetch(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)
        .then(res => res.json())
        .then(data => {
            const weekForecast = data.dataseries
            console.log(weekForecast)
            weekForecast.forEach(day => renderDaysWeather(day))
        })
        
    }
    
    const fetchCoordinates = function(e){
        e.preventDefault()
        const country = document.querySelector('#country').value
        const zip = document.querySelector('#zip').value
        fetch(`https://api.zippopotam.us/${country}/${zip}`)
        .then(res => res.json())
        .then(data => {
            longitude = data.places[0].longitude
            latitude = data.places[0].latitude
        })
        fetchWeather()
    }




    button.addEventListener('click', fetchCoordinates)

})