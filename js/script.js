var app = new Framework7({
	root: '#app',
	name: 'My App',
	panel: {
		swipe: 'left',
	}
});

let map;

const blueIcon = L.icon({
	iconUrl: 'leaflet/images/marker-icon-blue-10w.svg',
	iconSize: [25, 41],
	iconAnchor: [13, 41],
	popupAnchor: [0, -34],
	shadowUrl: 'leaflet/images/marker-shadow.png',
	shadowSize: [41, 41],
	shadowAnchor: [13, 41]
});
const redIcon = L.icon({
	iconUrl: 'leaflet/images/marker-icon-red-10w.svg',
	iconSize: [25, 41],
	iconAnchor: [13, 41],
	popupAnchor: [0, -34],
	shadowUrl: 'leaflet/images/marker-shadow.png',
	shadowSize: [41, 41],
	shadowAnchor: [13, 41]
});
const greyIcon = L.icon({
	iconUrl: 'leaflet/images/marker-icon-grey-10w.svg',
	iconSize: [25, 41],
	iconAnchor: [13, 41],
	popupAnchor: [0, -34],
	shadowUrl: 'leaflet/images/marker-shadow.png',
	shadowSize: [41, 41],
	shadowAnchor: [13, 41]
});

const sights = [
	{
		id: 1,
		x: 0,
		y: 0,
		showOnMap: false,
		infoURL: 'Cortex',
		title: 'Cortex'
	},
	{
		id: 2,
		x: 2928,
		y: 2536,
		showOnMap: true,
		infoURL: 'Motel One',
		title: 'Hotel Motel One Leipzig-Nikolaikirche'
	},       
	{
		id: 4,
		x: 1926,
		y: 2449,
		showOnMap: true,
		infoURL: 'Market Square',
		title: 'Рыночная площадь'
	},     
	{
		id: 5,
		x: 0,
		y: 0,
		showOnMap: false,
		infoURL: 'Monument to the Battle of the Nations',
		title: 'Памятник Битве народов'
	},
	{
		id: 6,
		x: 1256,
		y: 1837,
		showOnMap: true,
		infoURL: 'Thomaskirche',
		title: 'Церковь св. Фомы'
	},
	{
		id: 7,
		x: 3163,
		y: 2354,
		showOnMap: true,
		infoURL: 'Nikolaikirche',
		title: 'Церковь св. Николая'
	},
	{
		id: 8,
		x: 3297,
		y: 1128,
		showOnMap: true,
		infoURL: 'Panorama Tower',
		title: 'Panorama Tower'
	},
	{
		id: 9,
		x: 2139,
		y: 1938,
		showOnMap: true,
		infoURL: 'Auerbach\'s Keller',
		title: 'Ресторан "Погреб Ауэрбаха"'
	},
	{
		id: 10,
		x: 0,
		y: 0,
		showOnMap: false,
		infoURL: 'Leipzig Zoo',
		title: 'Лейпцигский зоопарк'
	},
	{
		id: 11,
		x: 2139,
		y: 1837,
		showOnMap: true,
		infoURL: 'Madlerpassage',
		title: 'Пассаж Медлера'
	},
	{
		id: 12,
		x: 0,
		y: 0,
		showOnMap: false,
		infoURL: 'Panometer Leipzig',
		title: 'Лейпцигский панометр'
	},
	{
		id: 13,
		x: 1337,
		y: 2720,
		showOnMap: true,
		infoURL: 'Zum Arabischen Coffe Baum',
		title: 'Кафе «Цум арабишен кофе баум»'
	},
	{
		id: 14,
		x: 0,
		y: 0,
		showOnMap: false,
		infoURL: 'Museums',
		title: 'Музеи'
	},
	{
		id: 15,
		x: 2077,
		y: 3301,
		showOnMap: true,
		infoURL: 'Tourist-Information',
		title: 'Туристический информационный центр'
	},
	{
		id: 16,
		x: 0,
		y: 0,
		showOnMap: false,
		infoURL: 'Presents',
		title: 'Сувениры'
	}
];

const additionalSights = [
	{
		x: 2269,
		y: 3435,
		title: 'Музей изобразительных искусств'
	},
	{
		x: 1132,
		y: 1561,
		title: 'Музей Баха'
	},
	{
		x: 594,
		y: 4432,
		title: 'Музей естественной истории'
	},
	{
		x: 3137,
		y: 2551,
		title: 'Музей древностей в Лейпцигском университете'
	},
	{
		x: 4078,
		y: 2400,
		title: 'Лейпцигская опера'
	},
	{
		x: 3800,
		y: 1128,
		title: 'Гевандхаус'
	},
	{
		x: 3297,
		y: 1532,
		title: 'Университет им. Карла Маркса'
	},
	{
		x: 3393,
		y: 1837,
		title: 'Starbucks'
	},
	{
		x: 3991,
		y: 4316,
		title: 'Starbucks'
	},
];

//#region Map
function initMap() {
	var bounds = [[0,0], [4612,4512]];
	map = L.map('map', {
		crs: L.CRS.Simple,
		minZoom: -3,
		maxZoom: 1,
		maxBounds: bounds
	});
	var image = L.imageOverlay('images/sights/Map.svg', bounds).addTo(map);
	map.fitBounds(bounds);

	sights.forEach(sight => {
		if (sight.showOnMap) {
			let marker = L.marker([sight.y, sight.x], { icon: blueIcon }).addTo(map);
			marker.bindPopup(`
                ${sight.title}<br/>
                <a href="#" style="text-decoration: underline;" onclick="map.closePopup(); hideMap(); showSightPage(${sight.id});">Подробнее</a>
            `);
			sight.marker = marker;
		}
	});
	additionalSights.forEach(sight => {
		let marker = L.marker([sight.y, sight.x], { icon: greyIcon }).addTo(map);
		marker.bindPopup(sight.title);
		sight.marker = marker;
	});
}

const mapWrapper = document.getElementById('map-wrapper');

function showMap(showCurrentSight = false) {
	mapWrapper.classList.add('visible-map');

	if (showCurrentSight && currentSight) {
		map.setView([currentSight.y, currentSight.x], -2, { animate: true, duration: 0.5 });
		let sightMarker = currentSight.marker;
		sightMarker.setIcon(redIcon);
	}
	//history.pushState({}, 'Map', '?Map');
}

function hideMap() {
	mapWrapper.classList.remove('visible-map');

	if (currentSight) {
		let sightMarker = currentSight.marker;
		sightMarker.setIcon(blueIcon);
	}
}
//#endregion Map

let currentSight;
let pagesCache = {};
let popupElement = document.getElementById('sightInfo');
let popupContentElement = document.querySelector('#sightInfo .content-container');

function showSightPage(sightId) {
	let sight = sights.find(sight => sight.id == sightId);
	let url = sight.infoURL;
	if (!currentSight || url != currentSight.infoURL) {        
		currentSight = sight;

		let page;
		if (pagesCache[url]) {
			page = pagesCache[url];

			popupContentElement.innerHTML = page;	
			if (sight.showOnMap) {
				let placeLocation = popupContentElement.querySelector('.place-location');
				placeLocation.addEventListener('click', () => showMap(true));
			}
		} else {
			fetchPage = loadPage(url);
			fetchPage.then(page => {
				pagesCache[url] = page;

				popupContentElement.innerHTML = page;
				if (sight.showOnMap) {
					let placeLocation = popupContentElement.querySelector('.place-location');
					placeLocation.addEventListener('click', () => showMap(true));
				}				
			});
		}
	}

	app.popup.open(popupElement, true);    
}

function loadPage(href) {
	let url = `pages/${href}.html`;

	return fetch(url).then(function(response) {
		return response.text();
	}).then(function(page) {
		return page;
	});
}

const speakers = [
	{
		id: 0,
		firstName: 'Dr. Juergen',
		lastName: 'Koellner',
		position: 'Director Software Development',
		imageUrl: 'images/speakers/Juergen Koellner_O.png'
	},
	{
		id: 1,
		firstName: 'Steffen',
		lastName: 'Thiele',
		position: 'Software Developer',
		imageUrl: 'images/speakers/Steffen Thiele_O.png'
	},
	{
		id: 2,
		firstName: 'Uwe',
		lastName: 'Seifert',
		position: 'C# Developer',
		imageUrl: 'images/speakers/Uwe Seifert_O.png'
	},
	{
		id: 3,
		firstName: 'Andrey',
		lastName: 'Ugarov',
		position: 'Front-end Developer',
		imageUrl: 'images/speakers/Andrey Ugarov_O.png'
	},
	{
		id: 4,
		firstName: 'Vladimir',
		lastName: 'Kulish',
		position: 'C# Developer',
		imageUrl: 'images/speakers/Volodymyr Kulish_O.png'
	},
	{
		id: 5,
		firstName: 'Pavel',
		lastName: 'Dubina',
		position: 'C# Developer',
		imageUrl: ''
	},
	{
		id: 6,
		firstName: 'Dmitry',
		lastName: 'Stepanenko',
		position: 'C# Developer',
		imageUrl: 'images/speakers/Dmitry Stepanenko_O.png'
	},
	{
		id: 7,
		firstName: 'Sergey',
		lastName: 'Starkov',
		position: 'C# Developer',
		imageUrl: 'images/speakers/Sergey Starkov_O.png'
	},
	{
		id: 8,
		firstName: 'Vladislav',
		lastName: 'Shkliar',
		position: 'C# Developer',
		imageUrl: 'images/speakers/Vladislav Shkljar_O.png'
	},
	{
		id: 9,
		firstName: 'A',
		lastName: 'Gu',
		position: '-',
		imageUrl: 'images/speakers/A Gu_O.png'
	},
	{
		id: 10,
		firstName: 'All',
		lastName: '',
		position: '',
		imageUrl: 'images/speakers/All_O.png'
	},
	{
		id: 11,
		firstName: 'test',
		lastName: '',
		position: '',
		imageUrl: 'images/icons/ic_directions_bike.svg'
	}
];
const agenda = [
	{
		title: 'CPET/Spiro/BMR and MSS Architecture I',
		dayNr: 1,
		items: [
			{
				type: 'lecture',
				time: '09:00',
				duration: 15,
				speakerId: 0,
				topic: 'Overview of the objectives of the symposium'
			},
			{
				type: 'lecture',
				time: '09:15',
				duration: 30,
				speakerId: 0,
				topic: 'Repetition: Basic principles of our development process'
			},
			{
				type: 'lecture',
				time: '09:45',
				duration: 45,
				speakerId: 0,
				topic: 'Weak points of MSS, potential improvements, expectations to MSS 6.0'
			},
			{
				type: 'break',
				time: '10:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'lecture',
				time: '10:45',
				duration: 45,
				speakerId: 1,
				topic: 'Aspects of multi-platform development'
			},
			{
				type: 'lecture',
				time: '11:30',
				duration: 15,
				speakerId: 0,
				topic: 'Repetition: What means “Software Architecture”'
			},
			{
				type: 'lecture',
				time: '11:45',
				duration: 45,
				speakerId: 2,
				topic: 'Repetition: Basic principles of the MSS-Architecture'
			},
			{
				type: 'lunch',
				time: '12:30',
				duration: 60,
				topic: 'Lunch'
			},
			{
				type: 'lecture',
				time: '13:30',
				duration: 60,
				speakerId: 6,
				topic: 'Repetition: General Architecture of MSS (current state)'
			},
			{
				type: 'lecture',
				time: '14:30',
				duration: 60,
				speakerId: 2,
				topic: 'Spirometry in MSS – From Requirements to Architecture (What we have and how should it be)'
			},
			{
				type: 'break',
				time: '15:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'lecture',
				time: '15:45',
				duration: 75,
				speakerId: 1,
				topic: 'Repetition: Architecture of the work with devices'
			}
		]
	},
	{
		title: 'CPET/Spiro/BMR and MSS Architecture II',
		dayNr: 2,
		items: [
			{
				type: 'lecture',
				time: '09:00',
				duration: 60,
				speakerId: 2,
				topic: 'Architecture for the work with variables'
			},
			{
				type: 'lecture',
				time: '10:00',
				duration: 30,
				speakerId: 0,
				topic: 'Domain-Driven Development – Determine the AT and RCP I'
			},
			{
				type: 'break',
				time: '10:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'lecture',
				time: '10:45',
				duration: 30,
				speakerId: 0,
				topic: 'Domain-Driven Development – Determine the AT and RCP II'
			},
			{
				type: 'lecture',
				time: '11:15',
				duration: 30,
				speakerId: 2,
				topic: 'Domain-Driven Development – Determine V’O2max and Maximum Lipid Metabolism'
			},
			{
				type: 'lecture',
				time: '11:45',
				duration: 45,
				speakerId: 0,
				topic: 'Domain-Driven Development – Determine exercise intensity zone and create exercise schedules'
			},
			{
				type: 'lunch',
				time: '12:30',
				duration: 60,
				topic: 'Lunch'
			},
			{
				type: 'lecture',
				time: '13:30',
				duration: 45,
				speakerId: 6,
				topic: 'Domain-Driven Development – Determine BMR'
			},
			{
				type: 'reserve',
				time: '14:15',
				duration: 45,
				speakerId: 10,
				topic: 'Reserve time for discussions or additional topics'
			},
			{
				type: 'break',
				time: '15:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'lecture',
				time: '15:15',
				duration: 60,
				speakerId: 1,
				topic: 'Some information about the organisation of a LAN and what follows for the development of MSS'
			},
			{
				type: 'lecture',
				time: '16:15',
				duration: 45,
				speakerId: 0,
				topic: 'Overview to open topics for further development of MSS 5.x'
			}
		]
	},
	{
		title: 'Specific questions of software development',
		dayNr: 3,
		items: [
			{
				type: 'lecture',
				time: '09:00',
				duration: 45,
				speakerId: 8,
				topic: 'From the algorithm to the code – Example EOV'
			},
			{
				type: 'lecture',
				time: '09:45',
				duration: 45,
				speakerId: 7,
				topic: 'Steps to make a new Report'
			},
			{
				type: 'break',
				time: '10:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'lecture',
				time: '10:45',
				duration: 45,
				speakerId: 3,
				topic: 'Steps to make a new DO'
			},
			{
				type: 'lecture',
				time: '11:30',
				duration: 60,
				speakerId: 1,
				topic: 'Specific questions of correct software development and coding I'
			},
			{
				type: 'lunch',
				time: '12:30',
				duration: 60,
				topic: 'Lunch'
			},
			{
				type: 'lecture',
				time: '13:30',
				duration: 90,
				speakerId: 1,
				topic: 'Specific questions of correct software development and coding II'
			}
		]
	},
	{
		title: 'Work with TFS and practical tests I',
		dayNr: 4,
		items: [
			{
				type: 'reserve',
				time: '09:00',
				duration: 90,
				speakerId: 10,
				topic: 'Reserve time for discussion or additional topics'
			},
			{
				type: 'break',
				time: '10:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'test',
				time: '10:45',
				duration: 105,
				speakerId: 11,
				topic: 'Practical CPET – Tests on bicycle ergometer or treadmill of SST, DS, VSk operated by UwS, JK, AU'
			},
			{
				type: 'lunch',
				time: '12:30',
				duration: 60,
				topic: 'Lunch'
			},
			{
				type: 'lecture',
				time: '13:30',
				duration: 90,
				speakerId: 10,
				topic: 'Analysis of performed tests (guided by UwS)'
			},
			{
				type: 'lecture',
				time: '15:00',
				duration: 120,
				speakerId: 4,
				topic: 'Demo of Aljurs new HIS and interesting insights'
			}
		]
	},
	{
		title: 'Miscellaneous and practical tests II',
		dayNr: 5,
		items: [
			{
				type: 'lecture',
				time: '09:00',
				duration: 90,
				speakerId: 4,
				topic: 'Organisation of automated testing'
			},
			{
				type: 'break',
				time: '10:30',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'test',
				time: '10:45',
				duration: 105,
				speakerId: 11,
				topic: 'Practical CPET – Tests on bicycle ergometer or treadmill of AU, VK, PD operated by DS, SST, VSk'
			},
			{
				type: 'lunch',
				time: '12:30',
				duration: 60,
				topic: 'Lunch'
			},
			{
				type: 'lecture',
				time: '13:30',
				duration: 90,
				speakerId: 10,
				topic: 'Analysis of performed tests (guided by DS)'
			},
			{
				type: 'break',
				time: '15:00',
				duration: 15,
				topic: 'Break'
			},
			{
				type: 'lecture',
				time: '15:15',
				duration: 45,
				speakerId: 9,
				topic: 'Information about future development of devices in СORTEX'
			},
			{
				type: 'lecture',
				time: '16:00',
				duration: 60,
				speakerId: 0,
				topic: 'Summary of the symposium and outlook to the period until end of 2018'
			}
		]
	}
];

function fillAgenda() {
	agenda.forEach((day, index) => {
		let tabElement = document.getElementById(`tab-1${index + 1}`);
		if (tabElement) {
			dayAgendaElement = document.createElement('div');
			dayAgendaElement.classList.add('agenda');
			dayAgendaElement.innerHTML = `
			<div class="agenda-header">
				<div class="agenda-header-day">ДЕНЬ ${day.dayNr}</div>
				<div class="agenda-header-title">${day.title}</div>
			</div>`;
			day.items.forEach(item => {
				let reportElement = document.createElement('div');
				switch(item.type) {
					case 'lecture':
					case 'reserve':
						reportElement.classList.add('report');
						let speaker = speakers[item.speakerId];
						reportElement.innerHTML = `
							<div class="report-time">${item.time}</div>
							<div style="flex-grow: 1;">
								<div class="report-topic">
									${item.topic}
								</div>
								<div class="report-duration">
									${item.duration}мин
								</div>
							</div>
							<image class="report-speaker ${item.type}" src="${speaker.imageUrl}">
							`;
						break;
					case 'test':
						reportElement.classList.add('report');
						reportElement.innerHTML = `
							<div class="report-time">${item.time}</div>
							<div style="flex-grow: 1;">
								<div class="report-topic">
									${item.topic}
								</div>
								<div class="report-duration">
									${item.duration}мин
								</div>
							</div>
							<div class="report-speaker test">
								<image class="test-icon" src="images/icons/ic_directions_run.svg">
								<image class="test-icon" src="images/icons/ic_directions_bike.svg">
							</div>
							`;
						break;
					case 'break':
						reportElement.classList.add('report');
						reportElement.classList.add('report-break');
						reportElement.innerHTML = `
							<div class="report-time">${item.time}</div>
							<img class="report-icon" src="images/icons/ic_local_cafe.svg"/>
							<div class="report-topic">Перерыв</div>`;
						break;
					case 'lunch':
						reportElement.classList.add('report');
						reportElement.classList.add('report-break');
						reportElement.innerHTML = `
							<div class="report-time">${item.time}</div>
							<img class="report-icon" src="images/icons/ic_restaurant.svg"/>
							<div class="report-topic">Обед</div>`;
						break;
				};
				dayAgendaElement.appendChild(reportElement);
			});
			tabElement.innerHTML = '';
			tabElement.appendChild(dayAgendaElement);
		}
	});
}

let currentDayTemp = document.getElementById('current-day-temp');
let currentDayDate = document.getElementById('current-day-date');
let currentDayWeather = document.getElementById('current-day-weather');
// let currentDayMaxTemp = document.getElementById('current-day-max-temp');
// let currentDayMinTemp = document.getElementById('current-day-min-temp');
let forecastItems = document.getElementById('forecast-items');

let currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?id=2879139&units=metric&lang=ru&appid=0edeaf78778fd22815dc54272fe84dce';
let fiveDaysForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily?id=2879139&units=metric&lang=ru&appid=0edeaf78778fd22815dc54272fe84dce';

function getDateString(dateTime) {
	let dd = dateTime.getDate();
	if (dd < 10) dd = "0" + dd;
	let mm = dateTime.getMonth();
	if (mm < 10) mm = "0" + mm;
	return dd + "." + mm;
 }

function getDayString(dayNr) {
	switch (dayNr) {
		case 0:
			return 'Вс';
		case 1:
			return 'Пн';
		case 2:
			return 'Вт';
		case 3:
			return 'Ср';
		case 4:
			return 'Чт';
		case 5:
			return 'Пт';
		case 6:
			return 'Сб';
	}
}

function updateForecast() {
	loadCurrentWeather();
	loadFiveDaysForecast();
}

function loadCurrentWeather() {
	fetch(currentWeatherUrl).then(function(response) {
		return response.json();
	}).then(function(data) {
		localStorage.setItem('simp2018-currentWeather', JSON.stringify(data));
		updateCurrentWeather(data);
	}).catch(function(e) {
		console.log('Failed to load current weather');
	});
}

function loadFiveDaysForecast() {
	fetch(fiveDaysForecastUrl).then(function(response) {
		return response.json();
	}).then(function(data) {
		localStorage.setItem('simp2018-fiveDaysForecast', JSON.stringify(data));
		updateFiveDaysForecast(data);
	}).catch(function(e) {
		console.log('Failed to load five days forecast');
	});
}

function updateCurrentWeather(data) {
	//console.log(data);
	currentDayTemp.textContent = Math.round(data.main.temp) + '°';
	let date = new Date(data.dt*1000);
	currentDayDate.textContent = `${getDateString(date)}, ${getDayString(date.getDay())}`;
	let description = data.weather[0].description;
	currentDayWeather.textContent = description[0].toUpperCase() + description.slice(1);

	// currentDayMaxTemp.textContent = '-°';
	// currentDayMinTemp.textContent = '-°';
}

function updateFiveDaysForecast(data) {
	forecastItems.innerHTML = '';

	let date, item;	
	for (let n = 0; n < 5; n++) {
		item = data.list[n];
		date = new Date(item.dt*1000);
		day = date.getDay();

		let wrapper = document.createElement('div');
		wrapper.classList.add('forecast-item-wrapper');
		wrapper.classList.add('popup-open');
		wrapper.dataset.popup = "#dayForecast";			
		wrapper.innerHTML = `
			<div class="forecast-item">
				<div class="forecast-item-day">${getDayString(day)}</div>
				<div class="forecast-item-date">${getDateString(date)}</div>
				<div class="forecast-item-weather">${item.weather[0].description}</div>
				<span class="forecast-item-max-temp">${Math.round(item.temp.max)}°</span>
				<span class="forecast-item-min-temp">${Math.round(item.temp.night)}°</span>
			</div>		
		`;
		forecastItems.appendChild(wrapper);			
	}
}

window.onload = function() {
	fillAgenda();

	let sightsElement = document.getElementById('sights');
	if (sightsElement) {
		sightsElement.addEventListener('click', (event) => {
			let sightId = event.target.dataset.sightId;
			if (sightId)
				showSightPage(sightId);
		});
	}   

	let currentWeather = localStorage.getItem('simp2018-currentWeather');
	if (currentWeather)
		updateCurrentWeather(JSON.parse(currentWeather));

	let fiveDaysForecast = localStorage.getItem('simp2018-fiveDaysForecast');
	if (currentWeather)	
		updateFiveDaysForecast(JSON.parse(fiveDaysForecast));

	let centerMap = document.getElementById('cityCenterMap');
	centerMap.addEventListener('click', () => showMap(false));
	initMap();
};
