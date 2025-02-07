//WMO Weather interpretation codes
const wmoCodes = [
  { code: [0], text: '☀️' },
  { code: [1, 2, 3], text: '🌤️' },
  { code: [45, 48], text: '🌫️' },
  { code: [51, 53, 55], text: '🌦️' },
  { code: [56, 57], text: '🌧️' },
  { code: [61, 63, 65], text: '🌧️' },
  { code: [66, 67], text: '🌧️' },
  { code: [71, 73, 75], text: '❄️' },
  { code: [77], text: '🌨️' },
  { code: [80, 81, 82], text: '🌧️' },
  { code: [85, 86], text: '🌨️' },
  { code: [95], text: '⛈️' },
  { code: [96, 99], text: '⛈️' },
];

const codes = Array(100).fill('Unknown');

wmoCodes.forEach(({ code: wmoCode, text }) => {
  wmoCode.forEach((c) => {
    codes[c] = text;
  });
});

// {
//   "daily_units": {
//     "time": "iso8601",
//     "weather_code": "wmo code",
//     "temperature_2m_max": "°F",
//     "temperature_2m_min": "°F",
//     "precipitation_probability_max": "%"
//   },
//   "daily": {
//     "time": [
//       "2025-02-07",
//       "2025-02-08",
//       "2025-02-09",
//       "2025-02-10",
//       "2025-02-11",
//       "2025-02-12",
//       "2025-02-13"
//     ],
//     "weather_code": [3, 3, 1, 3, 3, 45, 73],
//     "temperature_2m_max": [57.1, 42.2, 38.6, 38.8, 38.2, 32.1, 38.1],
//     "temperature_2m_min": [33.3, 29.3, 23, 29.7, 32.1, 26.7, 29.4],
//     "precipitation_probability_max": [56, 7, 1, 2, 9, 17, 70]
//   }
// }

async function getForecast() {
  try {
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=40.2338&longitude=-111.6585&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver';
    const response = await fetch(weatherUrl);
    const json = await response.json();
    const weather = json.daily;

    const x = weather.weather_code.map((code, index) => {
      const dateObj = new Date(weather.time[index]);
      const date = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
      const description = codes[code] || 'unknown';
      const tempMax = Math.round(weather.temperature_2m_max[index]);
      const tempMin = Math.round(weather.temperature_2m_min[index]);
      const rain = weather.precipitation_probability_max[index];
      return { date, description, tempMax, tempMin, rain };
    });
    return x;
  } catch (e) {
    return [];
  }
}

export default { getForecast };
