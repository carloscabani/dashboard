import Indicator from './components/Indicator';
import './App.css';
import Grid from '@mui/material/Grid'; // Usando Grid estable
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';
import { useEffect, useState } from 'react';

interface Row {
  rangeHours: string;
  windDirection: string;
}

function App() {
  let [rowsTable, setRowsTable] = useState<Row[]>([]);
  let [indicators, setIndicators] = useState<JSX.Element[]>([]);

  useEffect(() => {
    (async () => {
      let savedTextXML = localStorage.getItem("openWeatherMap");
      let expiringTime = localStorage.getItem("expiringTime");
      let nowTime = (new Date()).getTime();

      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        let API_KEY = "45acbdaa593a8373cdd5487ab62c7881";
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
        savedTextXML = await response.text();
        let hours = 1;
        let delay = hours * 3600000;
        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", (nowTime + delay).toString());
      }

      const parser = new DOMParser();
      if (savedTextXML) {
        const xml = parser.parseFromString(savedTextXML, "application/xml");
        let dataToIndicators: Array<[string, string, string]> = [];

        let location = xml.getElementsByTagName("location")[1];
        
		let geobaseid = location.getAttribute("geobaseid") || "N/A";
        dataToIndicators.push(["Location", "geobaseid", geobaseid]);

        let latitude = location.getAttribute("latitude") || "N/A";
        dataToIndicators.push(["Location", "Latitude", latitude]);

        let longitude = location.getAttribute("longitude") || "N/A";
        dataToIndicators.push(["Location", "Longitude", longitude]);


        let indicatorsElements = dataToIndicators.map(
          (element) => <Indicator title={element[0]} subtitle={element[1]} value={element[2]} />
        );

        setIndicators(indicatorsElements);

        let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
          let rangeHours = '';
          const from = timeElement.getAttribute("from");
          const to = timeElement.getAttribute("to");
          if (from && to) {
            rangeHours = from.split("T")[1] + " - " + to.split("T")[1];
          }

          let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");

          return { rangeHours: rangeHours, windDirection: windDirection };
        });

        arrayObjects = arrayObjects.slice(0, 8);
        setRowsTable(arrayObjects);
      }
    })();
  }, []);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Indicator title='Precipitación' subtitle='Probabilidad' value="0.13" />
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Indicator title='Country' subtitle='name' value="ECU" />
      </Grid>

      <Grid item xs={6} lg={2}>
        {indicators[0]}
      </Grid>

      <Grid item xs={6} lg={2}>
        {indicators[1]}
      </Grid>

      <Grid item xs={6} lg={2}>
        {indicators[2]}
      </Grid>

      <Grid item container xs={12} justifyContent="space-between">
        <Grid item xs={6} sm={4} md={3} lg={2}>
          <Summary />
        </Grid>

        <Grid item xs={12} md={6} lg={14}>
          <BasicTable rows={rowsTable} />
        </Grid>
      </Grid>

      <Grid item xs={12} lg={2}>
        <ControlPanel />
      </Grid>
      <Grid item xs={12} lg={10}>
        <WeatherChart />
      </Grid>
    </Grid>
  );
}

export default App;

