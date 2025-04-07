import React from 'react';
import weatherService from '../service/weatherService';
import './weather.css';

export function Weather() {
  const [weather, setWeather] = React.useState(<div>... loading</div>);

  React.useEffect(() => {
    setWeather(getWeather());
  }, []);

  async function getWeather() {
    const weatherData = await weatherService.getForecast();
    if (!weatherData || weatherData.length === 0) {
      return <div>... not available</div>;
    }
    return (
      <div className='weather'>
        <table>
          <tbody>
            {weatherData.map((day) => {
              const { date, description, tempMax, tempMin, rain } = day;
              return (
                <tr key={date}>
                  <td>{date}</td>
                  <td>{description}</td>
                  <td>
                    {tempMax}/{tempMin}°F
                  </td>
                  <td> 💧{rain}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <main className='container-fluid view-play'>
      <h3>Calming weather</h3>
      {weather}
    </main>
  );
}
