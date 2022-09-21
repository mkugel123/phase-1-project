document.addEventListener('DOMContentLoaded', ()=>{
    const button = document.getElementById('search')
    
    let longitude
    let latitude
    //weatherImg is used as icon and changes depending on weather
    //value of each day object
    let weatherImg

    const celciusToFarenheit = function(num){
        return num * 1.8 + 32
    }

    
    const determineIcon = function(day) {
        const daysWeather = day.weather
        if (daysWeather === 'cloudy'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'clear'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'pcloudy'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'mcloudy'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'humid'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'lightrain'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'oshower'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'ishower'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'lightsnow'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'rain'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'snow'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'rainsnow'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'ts'){
            weatherImg = 'src/cloudy.jpg'
        } else if (daysWeather === 'tsrain'){
            weatherImg = 'src/cloudy.jpg'
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
        weatherIcon.className = 'weatherIcon'
        weatherIcon.src = weatherImg
        const temp = document.createElement('ul')
        temp.className = 'temp'
        const high = document.createElement('li')
        high.innerText = `High: ${maxTemp}`   
        const low = document.createElement('li')
        low.innerText = `Low: ${minTemp}`
        temp.appendChild(low)
        temp.appendChild(high)
        div.appendChild(date)
        div.appendChild(weatherIcon)
        div.appendChild(temp)
        
       
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