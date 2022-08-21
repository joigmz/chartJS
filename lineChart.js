const ctx = document.getElementById('myChart').getContext("2d");

//Tooltipline block
const tooltipline = {
    id: 'tooltipline',
    beforeDraw: chart => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
            const ctx = chart.ctx;
            ctx.save();
            const activePoint = chart.tooltip._active[0];

            ctx.beginPath();
            ctx.moveTo(activePoint.element.x, chart.chartArea.top);
            ctx.lineTo(activePoint.element.x, chart.chartArea.bottom);
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.stroke();
            ctx.restore();

        }
    }
};

//Gradient fill
let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, "rgba(58,123,213,1)");
gradient.addColorStop(1, "rgba(0,210,255,0.3)");

//number of simulations
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

const n = getRandomInt(1,1000)
console.log(n);

const daysOfYear =  [];
var d = new Date(2022, 0, 1);
for (let i = 0; i < n; i++) {
    daysOfYear.push(new Date(d));
    d.setDate(d.getDate() + 1)
}

const data1 = [];
const data2 = [];
let prev = 100;
let prev2 = 200;
for (let i = 0; i < n; i++) {
  prev += 5 - Math.random() * 10;
  data1.push({x: i, y: prev});
  prev2 += 5 - Math.random() * 10;
  data2.push({x: i, y: prev2});
}


const data = {
    labels: daysOfYear.map(t => t.toLocaleString([], {year: 'numeric', day: 'numeric', month: 'numeric'})),
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
                        return '$'+value+'m';
                    },
                    font: {
                        family: "'Poppins', sans-serif",
                        weight:200
                    }
                },
                grid: {
                    display:false
                }  
            },
            x:{
                ticks:{
                    maxRotation:0,
                    font: {
                        family: "'Poppins', sans-serif",
                        weight:200
                    }
                },
                grid: {
                    display:false
                } 
            }
        },
        plugins:{
            legend: {
              display: false
            },
            tooltip:{
                backgroundColor: 'rgb(255,255,255,0.9)',
                titleColor: 'black',
                bodyColor: 'black',
                borderColor: 'rgb(58,123,213,0.1)',
                borderWidth:1,
                bodyFont: {
                    family: "'Poppins', sans-serif",
                    weight:200
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
            axis: 'x'
        }
    },
    plugins: [tooltipline]
    };

const myChart = new Chart(ctx, config);