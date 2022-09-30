document.addEventListener('DOMContentLoaded', ()=>{
    const button = document.getElementById('search')
    const searchDiv = document.querySelector('.search-div')
    const forecast = document.querySelector('.weather-forecast')
    const location = document.querySelector('.location')
    const unit = document.querySelector('#units')

    let longitude
    let latitude
    let dark = false


    let weatherImg


    const celciusOrFarenheit = function(num){
        if (unit.value === 'fahrenheit'){
            return num * 1.8 + 32
        } else if (unit.value === 'celcius'){
            return num
        }
    }

    const removeAllChildren = function(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    
    
    const determineIcon = function(day) {
        const daysWeather = day.weather
        if (daysWeather === 'cloudy'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'clear'){
            weatherImg = 'src/clear.png'
        } else if (daysWeather === 'pcloudy'){
            weatherImg = 'src/partly-cloudy.png'
        } else if (daysWeather === 'mcloudy'){
            weatherImg = 'src/mostly-cloudy.png'
        } else if (daysWeather === 'humid'){
            weatherImg = 'src/humid.jpg'
        } else if (daysWeather === 'lightrain'){
            weatherImg = 'src/light-rain.png'
        } else if (daysWeather === 'oshower'){
            weatherImg = 'src/ishower.jpg'
        } else if (daysWeather === 'ishower'){
            weatherImg = 'src/oshower.png'
        } else if (daysWeather === 'lightsnow'){
            weatherImg = 'src/light-snow.png'
        } else if (daysWeather === 'rain'){
            weatherImg = 'src/rain.jpg'
        } else if (daysWeather === 'snow'){
            weatherImg = 'src/snowing.png'
        } else if (daysWeather === 'rainsnow'){
            weatherImg = 'src/rain-snow.png'
        } else if (daysWeather === 'ts'){
            weatherImg = 'src/thunderstorm.png'
        } else if (daysWeather === 'tsrain'){
            weatherImg = 'src/thunderstorm-rain.png'
        }
        
    }

    const addPlaceName = function(city, state){
        removeAllChildren(location)
        const h2 = document.createElement('h2');
        h2.id = 'city'
        h2.innerText = `${city}, ${state}`
        location.appendChild(h2)
    }
    
    const renderDaysWeather = function(day){
        const year = day.date.toString().slice(0, 4)
        const dayOfMonth = day.date.toString().slice(6)
        const month = day.date.toString().slice(4, 6)
        const date = new Date(`${month}-${dayOfMonth}-${year}`).toDateString().split(' ').slice(0, 3).join(' ')
        const minTemp = Math.round(celciusOrFarenheit(day.temp2m.min)) 
        const maxTemp = Math.round(celciusOrFarenheit(day.temp2m.max))
        const div = document.createElement('div')
        div.className = 'weather-card'
        if(dark === true){
            div.classList.add('dark')
        }
        const dateP = document.createElement('p')
        dateP.className = 'date'
        dateP.innerText = date
        const weatherIcon = document.createElement('img')
        weatherIcon.className = 'weather-icon'
        weatherIcon.src = weatherImg
        const high = document.createElement('p')
        high.className = 'temp'
        high.innerText = `High: ${maxTemp}°`   
        const low = document.createElement('p')
        low.className = 'temp'
        low.innerText = `Low: ${minTemp}°`
  
        div.appendChild(dateP)
        div.appendChild(weatherIcon)    
        div.appendChild(low)
        div.appendChild(high)

        forecast.appendChild(div)
        
    }

   
    const fetchWeather = function() {
        unit.addEventListener('change', fetchCoordinates)
        fetch(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&unit=imperial&output=json`)
        .then(res => res.json())
        .then(data => {
            removeAllChildren(forecast)
            console.log(data)
            const weekForecast = data.dataseries
            weekForecast.forEach(day =>{
                determineIcon(day)
                renderDaysWeather(day)
            } )
        })  
    }
    
    const fetchCoordinates = function(e){
        removeAllChildren(location)
        removeAllChildren(forecast)
        e.preventDefault()
        const zip = document.querySelector('#zip').value
            fetch(`https://api.zippopotam.us/us/${zip}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                longitude = data.places[0].longitude
                latitude = data.places[0].latitude
                addPlaceName(data.places[0]['place name'], data.places[0]['state abbreviation'])
                fetchWeather()
            })
            .catch(()=>{
                alert('error')
                removeAllChildren(forecast)
                return false
            })
        const img = document.createElement('img')
        img.src = 'src/gears.gif'
        forecast.append(img)
    }

    const toggleDarkMode = function(){
        const weatherCards = document.querySelectorAll('.weather-card')
        if(dark === true){
            document.body.classList.add('dark')
            searchDiv.classList.add('dark')
            location.classList.add('dark')
            forecast.classList.add('dark')
            weatherCards.forEach((card) => {
                card.classList.add('dark')
            })

        } else if(dark === false){
            document.body.classList.remove('dark')
            searchDiv.classList.remove('dark')
            location.classList.remove('dark')
            forecast.classList.remove('dark')
            weatherCards.forEach((card) => {
                card.classList.remove('dark')
            })
        }
    }

    button.addEventListener('click', fetchCoordinates)
    
    document.addEventListener('keydown', (e) => {
        if(e.key === 'D'){
            dark = !dark
            toggleDarkMode()
        }
    })

})