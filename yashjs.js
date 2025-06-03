<script>
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Insert your OpenWeatherMap API key here

  const form = document.getElementById('weather-form');
  const cityInput = document.getElementById('city-input');
  const weatherResult = document.getElementById('weather-result');
  const errorMessage = document.getElementById('error-message');

  // Animate weather info fade-in after content set
  function animateWeatherInfo() {
    weatherResult.style.opacity = 0;
    setTimeout(() => {
      weatherResult.style.transition = 'opacity 0.8s ease';
      weatherResult.style.opacity = 1;
      // Animate icon
      const icon = weatherResult.querySelector('.weather-icon');
      if (icon) {
        icon.style.opacity = 0;
        icon.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        icon.style.transform = 'translateY(-20px)';
        setTimeout(() => {
          icon.style.opacity = 1;
          icon.style.transform = 'translateY(0)';
        }, 100);
      }
    }, 50);
  }

  const fadeOut = (element) => {
    return new Promise(resolve => {
      element.style.transition = 'opacity 0.5s ease';
      element.style.opacity = 0;
      setTimeout(() => resolve(), 500);
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    errorMessage.style.opacity = 0;
    await fadeOut(weatherResult);
    weatherResult.innerHTML = '';
    if (city === '') {
      errorMessage.textContent = 'Please enter a city name.';
      errorMessage.style.opacity = 1;
      return;
    }
    const apiKey = 'f2c86bbc49c9c709940ec7335408344a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      displayWeather(data);
    } catch (err) {
      errorMessage.textContent = 'Error: ' + err.message;
      errorMessage.style.opacity = 1;
    }
  });

  function displayWeather(data) {
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const html = `
      <img class="weather-icon" src="${iconUrl}" alt="${data.weather[0].description}" />
      <div class="location">${data.name}, ${data.sys.country}</div>
      <div class="temp">${Math.round(data.main.temp)}&deg;C</div>
      <div class="desc">${capitalizeFirstLetter(data.weather[0].description)}</div>
      <div class="details">
        Humidity: ${data.main.humidity}%<br />
        Wind: ${Math.round(data.wind.speed)} m/s
      </div>
    `;
    weatherResult.innerHTML = html;
    animateWeatherInfo();
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
</script>
