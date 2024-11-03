const weatherData = [
  { city: 'New York', temperature: 16, humidity: 70, windSpeed: 7 },
  { city: 'London', temperature: 12, humidity: 80, windSpeed: 5 },
  { city: 'Tokyo', temperature: 22, humidity: 60, windSpeed: 4 },
  { city: 'Sydney', temperature: 25, humidity: 50, windSpeed: 6 },
  { city: 'Paris', temperature: 15, humidity: 65, windSpeed: 5 },
  { city: 'Berlin', temperature: 14, humidity: 60, windSpeed: 6 },
  { city: 'Moscow', temperature: 5, humidity: 75, windSpeed: 10 },
  { city: 'Toronto', temperature: 17, humidity: 55, windSpeed: 8 },
  { city: 'Rio de Janeiro', temperature: 26, humidity: 85, windSpeed: 7 },
  { city: 'Beijing', temperature: 20, humidity: 40, windSpeed: 3 },
  { city: 'Mumbai', temperature: 30, humidity: 70, windSpeed: 5 },
  { city: 'Los Angeles', temperature: 19, humidity: 65, windSpeed: 4 },
  { city: 'Cape Town', temperature: 18, humidity: 60, windSpeed: 6 },
  { city: 'Rome', temperature: 21, humidity: 55, windSpeed: 3 },
  { city: 'Bangkok', temperature: 33, humidity: 75, windSpeed: 2 },
  { city: 'Istanbul', temperature: 20, humidity: 60, windSpeed: 4 },
  { city: 'Lagos', temperature: 29, humidity: 80, windSpeed: 3 },
  { city: 'Buenos Aires', temperature: 23, humidity: 70, windSpeed: 5 },
  { city: 'Chicago', temperature: 10, humidity: 65, windSpeed: 7 },
  { city: 'Shanghai', temperature: 19, humidity: 80, windSpeed: 6 },
];


function fetchWeather(city) {
  let citySearched=weatherData.find((item)=>item.city.toLowerCase()==city.toLowerCase());
  displayCurrentWeather(citySearched);
  return citySearched;
  // displayCurrentWeather(citySearched);
}

function displayCurrentWeather(data) {
  let current=document.getElementById('current');
  let temp=document.getElementById('temp');
  let humidity=document.getElementById('humidity');
  let windSpeed=document.getElementById('windSpeed');
  current.innerHTML='Current Weather for '+data.city;
  temp.innerHTML='Temperature : '+data.temperature+'°C';
  humidity.innerHTML='Humidity : '+data.humidity+'%';
  windSpeed.innerHTML='Wind Speed : '+data.windSpeed+'m/s';
}

function fetchForecast(city) {

  let citySearched=weatherData.find((item)=>item.city.toLowerCase()==city.toLowerCase());
  let cnt=document.getElementById('fiveCnt');
  cnt.innerHTML='';

  let header=document.createElement('h1');
  let text=document.createTextNode(`5-Day forecast for ${citySearched.city}`);
  header.appendChild(text);
  cnt.appendChild(header);

  let data=[];

  for(let i=1;i<6;i++){
    let obj ={'day':i,'temperature':citySearched.temperature+i};
    data.push(obj);
  }

  displayForecast(data);
  return data;
}

// fetchForecast('Tokyo');

function displayForecast(data) {
  let cnt=document.getElementById('fiveCnt');

  data.map((item)=>{
    let para=document.createElement('p');
    let text=document.createTextNode(`Day ${item.day} : Temeprature : ${item.temperature}°C`);
    para.appendChild(text);
    cnt.appendChild(para);
  })
}

function searchWeather() {
  let city=document.getElementById('cityName').value;
  let citySearched=weatherData.find((item)=>item.city.toLowerCase()==city.toLowerCase())
  if(citySearched){
    fetchWeather(city);
    fetchForecast(city);
    saveRecentSearch(city);
  }else{
    window.alert('City Undefined');
  }
}

// Exercise 03: Save recent searches to local storage
function saveRecentSearch(city) {
  let citySearched=weatherData.find((item)=>item.city.toLowerCase()==city.toLowerCase());
  localStorage.setItem(citySearched.city, JSON.stringify(citySearched));
}
function displayRecentSearches() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    let para=document.createElement('p');
    let text=document.createTextNode(key);
    para.appendChild(text);
    para.classList.add('recentPara');
    para.addEventListener('click', () => {
      fetchWeather(para.innerHTML);
      fetchForecast(para.innerHTML);
    });
    let recentSearches=document.getElementById('recentSearches');
    recentSearches.appendChild(para);
  }
}

displayRecentSearches();


