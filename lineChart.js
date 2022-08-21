const ctx = document.getElementById('myChart').getContext("2d");

//Prediction
const prediction = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;

//Gradient fill
let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, "rgba(58,123,213,1)");
gradient.addColorStop(1, "rgba(0,210,255,0.3)");

const actions = [
    {
        name: 'Mode: nearest, axis: x',
        handler(chart) {
          chart.options.interaction.axis = 'x';
          chart.options.interaction.mode = 'nearest';
          chart.update();
        }
      }]

const data1 = [];
const data2 = [];
let prev = 100;
let prev2 = 200;
for (let i = 0; i < 600; i++) {
  prev += 5 - Math.random() * 10;
  data1.push({x: i, y: prev});
  prev2 += 5 - Math.random() * 10;
  data2.push({x: i, y: prev2});
}


const data = {
    labels: data1,
    datasets: [{
        label: 'Inversión',
        data: data1,
        fill: true,
        backgroundColor: gradient,
        borderColor: gradient,
        borderWidth: 1,
        pointBackgroundColor: gradient
    },
    {
        label: 'FinPlan',
        data: data2,
        fill:false,
        borderColor: 'rgb(58,123,213)',
        borderWidth: 1,
        pointBackgroundColor: 'rgb(58,123,213)',
        segment: {
            borderColor: ctx => prediction(ctx, 'rgb(0,0,0,0.2)'),
            borderDash: ctx => prediction(ctx, [6, 6]),
          }
    }]
};


const config = {
    type: 'line',
    data: data,
    options: {
        radius:0,
        hoverRadius:5,
        responsive: true,
        scales : {
            y:{
                ticks:{
                    callback: function (value){
                        return '$'+value/1000000+'m';
                    }
                },
                grid: {
                    display:false
                }  
            },
            x:{
                grid: {
                    display:false
                } 
            }
        },
        plugins: {
            legend: {
              display: false
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
            axis: 'x'
        }
    }
    };

const myChart = new Chart(ctx, config);