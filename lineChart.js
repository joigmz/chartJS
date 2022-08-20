const ctx = document.getElementById('myChart').getContext("2d");

//Gradient fill
let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, "rgba(58,123,213,1)");
gradient.addColorStop(1, "rgba(0,210,255,0.3)");

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

const data = {
    labels: labels,
    datasets: [{
        label: 'Inversión',
        data: [0, 10*1000000, 5*1000000, 2*1000000, 20*1000000, 30*1000000, 45*1000000],
        fill: true,
        backgroundColor: gradient,
        borderColor: gradient,
        pointBackgroundColor: 'rgb(189,195,199)',
    },
    {
        label: 'FinPlan',
        data: [0, 10*1000000, 5.2*1000000, 8*1000000, 26*1000000, 34*1000000, 48*1000000],
        borderColor: 'rgb(58,123,213)',
    }]
};


const config = {
    type: 'line',
    data: data,
    options: {
        radius:0,
        hitRadius:20,
        hoverRadius:8,
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
            mode: 'index',
            axis: 'y'
        }
    }
    };

const myChart = new Chart(ctx, config);