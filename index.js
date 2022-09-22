document.addEventListener('DOMContentLoaded', ()=>{
    const button = document.getElementById('search')
    const forecast = document.querySelector('#weather-forecast')
    const unit = document.getElementById('unit').value
    let longitude
    let latitude
    //weatherImg is used as icon and changes depending on weather
    //value of each day object
    let weatherImg

    // button.addEventListener('click', fetchCoordinates)

    const celciusToFarenheit = function(num){
        if(unit === 'celcius'){
            return num
        } else{
        return num * 1.8 + 32
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
        const h2 = document.createElement('h2');
        h2.innerText = `${city}, ${state}`
        forecast.appendChild(h2)
    }
    
    const renderDaysWeather = function(day){
        const year = day.date.toString().slice(0, 4)
        const dayOfMonth = day.date.toString().slice(6)
        const month = day.date.toString().slice(4, 6)
        const date = new Date(`${year}-${month}-${dayOfMonth}`).toString().split(' ').slice(0, 3).join(' ');
        const minTemp = Math.round(celciusToFarenheit(day.temp2m.min)) 
        const maxTemp = Math.round(celciusToFarenheit(day.temp2m.max))
        const div = document.createElement('div')
        div.className = 'weather-card'
        const dateP = document.createElement('p')
        dateP.className = 'date'
        dateP.innerText = date
        const weatherIcon = document.createElement('img')
        weatherIcon.className = 'weather-icon'
        weatherIcon.src = weatherImg
        const high = document.createElement('p')
        high.className = 'temp'
        high.innerText = `High: ${maxTemp}`   
        const low = document.createElement('p')
        low.className = 'temp'
        low.innerText = `Low: ${minTemp}`
  
        div.appendChild(dateP)
        div.appendChild(weatherIcon)    
        div.appendChild(low)
        div.appendChild(high)

        forecast.appendChild(div)
        
    }

   
    const fetchWeather = function() {
        fetch(`http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&unit=imperial&output=json`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const weekForecast = data.dataseries
            weekForecast.forEach(day =>{
                determineIcon(day)
                renderDaysWeather(day)
            } )
        })  
    }
    
    const fetchCoordinates = function(e){
        removeAllChildren(forecast)
        e.preventDefault()
        const zip = document.querySelector('#zip').value
        if (zip === ""){
            alert('Please enter valid country and zip')
        }
            fetch(`https://api.zippopotam.us/us/${zip}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                longitude = data.places[0].longitude
                latitude = data.places[0].latitude
                addPlaceName(data.places[0]['place name'], data.places[0]['state abbreviation'])
                fetchWeather()
            })
        
    }




    button.addEventListener('click', fetchCoordinates)

})