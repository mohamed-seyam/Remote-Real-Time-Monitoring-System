
let mychart;
let state = 0 ;
let counter = 0;


function draw(temp_value,hum_value,time, chart){
 myChart = new Chart(chart, {
    type: 'line',
    data: {
      labels: time,
      datasets: [
        {
          label: 'Sensor 1 Temperature',
          data: temp_value,
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderWidth: 1
        },
        {
          label: 'Sensor 2 Humidity',
          data: hum_value,
          fill: false,
          borderColor: 'rgba(99, 132, 255, 1)',
          backgroundColor: 'rgba(99, 132, 255, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {}
  });
}


window.addEventListener('load', setup);

async function setup() {
 
  var ctx = document.getElementById('myChart').getContext('2d');
  // const readings = await getData();
  draw(null,null,null , ctx);
  }


const api_url = "https://mighty-headland-68010.herokuapp.com/getsensors";
// 
async function getData() {
  const response = await fetch(api_url);
  const data = await response.json();
  const temp_value = [];
  const hum_value = [];
  const time = [];            

  for(var i = 0 ; i<10 ; i++){

  // var jsonData = JSON.parse(data);
  temp_value.push( data.temp_value );
  hum_value.push(data.hum_value);
  time.push((data.InDtTm).substr(11,12)); 
}
  
  temp_value.reverse() 
  hum_value.reverse()
  time.reverse()
  return { temp_value , hum_value, time };
}

  // ################################################################################
const addreadings_url = 'https://mighty-headland-68010.herokuapp.com/getdata';




async function addData() {
    const response =  await fetch(addreadings_url);
    const json =  await response.json();
    console.log(json);
    // var d = new Date()
    // var time = d.toLocaleTimeString()
    console.log(json.InDtTm.substr(11,12))
    console.log(json.temp_value);
    console.log(json.hum_value);
    if(myChart.data.labels == json.InDtTm.substr(11,12)){
      console.log("data same !")
    }
  else{

   if(counter < 10){ 
    myChart.data.labels.push(json.InDtTm.substr(11,12));   
    myChart.data.datasets[0].data.push(json.temp_value); 
    myChart.data.datasets[1].data.push(json.hum_value); 
    myChart.update();
    counter +=1
                }

    else{
        myChart.data.labels.push(json.InDtTm.substr(11,12));   
        myChart.data.datasets[0].data.push(json.temp_value); 
        myChart.data.datasets[1].data.push(json.hum_value); 
        myChart.update();
        myChart.data.labels.shift()
        myChart.data.datasets[0].data.shift()
        myChart.data.datasets[1].data.shift()
        myChart.update();
        console.log('new data added to chart')
    }

  }

    // if(myChart.data.labels[9] == json.InDtTm.substr(11,12)){
    //   console.log("data same !")
       
    // }
    // else{
    // myChart.data.labels.push(json.InDtTm.substr(11,12));   
    // myChart.data.datasets[0].data.push(json.temp_value); 
    // myChart.data.datasets[1].data.push(json.hum_value); 

    // myChart.data.labels.shift()
    // myChart.data.datasets[0].data.shift()
    // myChart.data.datasets[1].data.shift()
    // myChart.update();
    // console.log('new data added to chart')

  }
  


function mode(action)
  {

  window.refreshIntervalId;
  console.log(action);

  if(action == 'play') 
  {  
    
    while(state < 1){

      refreshIntervalId = setInterval(addData, 500);
      state = 1;
    }

  }
                                


  if(action == 'pause') 
  {
      clearInterval(refreshIntervalId);  
      state = 0   
  }

  }


