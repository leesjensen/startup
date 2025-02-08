import React from 'react';
import weatherService from '../weatherService';
import './weather.css';

export function Weather() {
  const [weather, setWeather] = React.useState(<div>...loading</div>);

  React.useEffect(() => {
    setWeather(getWeather());
  }, []);

  async function getWeather() {
    const weatherData = await weatherService.getForecast();
    return (
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
    );
  }

  return <div className='weather'>{weather}</div>;
}
