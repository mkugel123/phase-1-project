document.addEventListener('DOMContentLoaded', ()=>{
    const button = document.getElementById('search')
    let forecast = document.querySelector('#weather-forecast')
    console.log(forecast)
    let longitude
    let latitude
    //weatherImg is used as icon and changes depending on weather
    //value of each day object
    let weatherImg

    const celciusToFarenheit = function(num){
        return num * 1.8 + 32
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
    
    const renderDaysWeather = function(day){
        const dayOfMonth = day.date.toString().slice(6)
        const month = day.date.toString().slice(4, 6)
        const minTemp = Math.round(celciusToFarenheit(day.temp2m.min)) 
        const maxTemp = Math.round(celciusToFarenheit(day.temp2m.max))
        const div = document.createElement('div')
        div.className = 'weather-card'
        const date = document.createElement('p')
        date.className = 'date'
        date.innerText = `${month}/${dayOfMonth}`
        const weatherIcon = document.createElement('img')
        weatherIcon.className = 'weather-icon'
        weatherIcon.src = weatherImg
        const high = document.createElement('p')
        high.innerText = `High: ${maxTemp}`   
        const low = document.createElement('p')
        low.innerText = `Low: ${minTemp}`
  
        div.appendChild(date)
        div.appendChild(weatherIcon)    
        div.appendChild(low)
        div.appendChild(high)

        forecast.appendChild(div)
        
       
        console.log(div)
    }

   
    const fetchWeather = function() {
        fetch(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&unit=imperial&output=json`)
        .then(res => res.json())
        .then(data => {
            weekForecast = data.dataseries
            weekForecast.forEach(day =>{
                console.log(day)
                determineIcon(day)
                renderDaysWeather(day)
            } )
        })  
    }
    
    const fetchCoordinates = function(e){
        removeAllChildren(forecast)
        e.preventDefault()
        const country = document.querySelector('#country').value
        const zip = document.querySelector('#zip').value
        fetch(`https://api.zippopotam.us/${country}/${zip}`)
        .then(res => res.json())
        .then(data => {
            longitude = data.places[0].longitude
            latitude = data.places[0].latitude
            console.log(longitude)
            console.log(latitude)
        })
        fetchWeather()
    }




    button.addEventListener('click', fetchCoordinates)

})