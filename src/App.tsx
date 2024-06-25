import Indicator from './components/Indicator';
import './App.css'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Summary from './components/Summary';
import BasicTable from './components/BasicTable';
import WeatherChart from './components/WeatherChart';
import ControlPanel from './components/ControlPanel';

function App() {

{/* JSX */}

  return (
	<Grid container spacing={2}>
	<Grid xs={12} sm={6} md={4} lg={2}>
		  <Indicator title='Precipitación' subtitle='Probabilidad' value={0.13} />
	  </Grid>
	  
	  <Grid xs={6} sm={4} md={3} lg={2}>
			<Summary></Summary>
		</Grid>
		<Grid xs={12} md={6} lg={14} >
 	       <BasicTable />
 	    </Grid>
		 <Grid xs={12} lg={2}>
             <ControlPanel />
         </Grid>
         <Grid xs={12} lg={10}>
             <WeatherChart></WeatherChart>
         </Grid>
	</Grid>
  )
}

export default App


