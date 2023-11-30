import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Grid, Typography, Card, CardContent, Button, Box } from '@mui/material';
import Canvas from './canvas';
import TextField from '@mui/material/TextField';

function App() {

  const baseURL = 'http://eniproject.local'
  const [temperature, setTemperature] = useState()
  const [flowRate1, setFlowRate1] = useState()
  const [flowRate2, setFlowRate2] = useState()
  const [flowVolume1, setFlowVolume1] = useState()
  const [flowVolume2, setFlowVolume2] = useState()
  const [waterLevel, setWaterLevel] = useState()
  const [threshhold, setThreshhold] = useState()
  const [pump, setPump] = useState(false)
  const [tds, setTds] = useState()
  const [leakage, setLeakage] = useState()

  useEffect(() => {

    fetchTemperature()
    fetchFlow()
    fetchLevel()
    fetchTDS()

  const temperatureInterval = setInterval(fetchTemperature, 10000)
  const flowInterval = setInterval(fetchFlow, 5000)
  const levelInterval = setInterval(fetchLevel, 1000)
  const tdsInterval = setInterval(fetchTDS, 10000)
  
  return () => {
    clearInterval(temperatureInterval)
    clearInterval(flowInterval)
    clearInterval(levelInterval)
    clearInterval(tdsInterval)
    }
  }, [])

  const fetchTemperature = async () => {
    const data = await axios.get(`${baseURL}/api/temp`);
    console.log(`Temperature is ${data.data}`)
    setTemperature(data.data)

    // const min = 100
    // const max = 400
    // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    // console.log(randomNumber);
    // setTemperature(randomNumber)
  }

  const fetchFlow = async () => {
    const data = await axios.get(`${baseURL}/api/flow`)
    console.log(`Flow data: ${data.data}`)
    setFlowRate1(data.data.flowRate1)
    setFlowRate2(data.data.flowRate2)
    setFlowVolume1(data.data.flowVolume1)
    setFlowVolume2(data.data.flowVolume2)

    setLeakage(flowVolume2 - flowVolume1)
  }

  const fetchLevel = async () => {
    const data = await axios.get(`${baseURL}/api/level`)
    console.log(`Distance is: ${data.data}`)
    setWaterLevel(data.data)

    // const min = 10
    // const max = 15
    // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    // setWaterLevel(randomNumber)
    // console.log(`water level ${waterLevel} and threshhold is ${threshhold}`);
    if (waterLevel < threshhold) {
      console.log("Pump is on")
      setPump(true)
    }
    else {
      console.log("Pump is off")
      setPump(false)
    }
  }

  const fetchTDS = async () => {
    const data = await axios.get(`${baseURL}/api/tds`)
    console.log(`TDS value is: ${data.data}`)
    setTds(data.data)
  }

  
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Typography variant="h5" sx={{textAlign:"center", marginTop:'100px'}}>SMART WATER TANK</Typography>
          <div style={{marginTop:'10%', marginLeft:'20%'}}>
            <Canvas distance={waterLevel * 19} threshhold={threshhold*19} />
          </div>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h5"sx={{ marginTop: '100px', textAlign:"center" }}>CONTROLS</Typography>
          <Card sx={{ bgcolor: `#d3d3d3`, borderRadius: "0.5rem", marginTop:"2.5rem" }}>
            <CardContent>
                <Typography  variant='h6'>
                    Set Threshhold water level
              </Typography>
              <div style={{background:'violet', width:'80px', height:"30px", fontSize:"1.3rem", textAlign:'center'}}>
                <TextField
                  variant="standard"
                  inputProps={{ min: 0, style: { textAlign: 'center' } }}
                  onChange={(e) => setThreshhold(e.target.value)}
                ></TextField>
                </div>
            </CardContent>
          </Card>
          <Box sx={{marginTop:"1rem" }}>
            <Button sx={{bgcolor: pump? 'green' : 'red', border:'1px solid black', width:'180px', height:'50px'}}>
              <Typography variant='h4' sx={{color:'white'}}>
                PUMP
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid item xs={3}>
          <Typography variant="h5"sx={{ marginTop: '100px', textAlign:"center" }}>DETAILS</Typography>
          <Card sx={{ bgcolor: `#f5f5f5`, borderRadius: "0.5rem", marginTop:"11%" }}>
            <CardContent>
                <Typography  variant='h6'>
                    TEMPERATURE
              </Typography>
              <div style={{background:'orange', width:'80px', height:"30px", borderRadius:"8px", fontSize:"1.3rem", textAlign:'center'}}>
                  {temperature}
                </div>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: `#f5f5f5`, borderRadius: "0.5rem", marginTop:"1rem" }}>
            <CardContent>
                <Typography  variant='h6'>
                    TDS VALUE
              </Typography>
                <div style={{background:'orange', width:'80px', borderRadius:"8px", height:"30px", fontSize:"1.3rem", textAlign:'center'}}>
                  {tds}
                </div>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: `#f5f5f5`, borderRadius: "0.5rem", marginTop:"1rem" }}>
            <CardContent>
                <Typography  variant='h6'>
                    FLOW RATE
              </Typography>
              <Box display="flex" gap="160px">
                <Typography>
                  Sensor 1
                </Typography>
                <Typography>
                  Sensor 2
                </Typography>
              </Box>
              <Box display="flex" gap="130px">
                <div style={{background:'orange', width:'100px', borderRadius:"8px", height:"30px", fontSize:"1.3rem", textAlign:'center'}}>
                    {flowRate1}
                </div> 
                <div style={{background:'orange', width:'100px', borderRadius:"8px", height:"30px", fontSize:"1.3rem", textAlign:'center'}}>
                    {flowRate2}
                </div>
              </Box>

              <Box>
                <Typography variant='h6'>LEAKAGE </Typography>
                <div style={{background:'violet', width:'100px', borderRadius:"8px", height:"30px", fontSize:"1.3rem", textAlign:'center'}}>
                    {leakage}
                </div>
              </Box>
            
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
