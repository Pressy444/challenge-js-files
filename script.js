
let table1 = document.getElementById('table1');
let data = [];


let years = Array.from(table1.rows[1].cells).slice(2).map(cell => cell.textContent.trim());


for (let i = 2; i < table1.rows.length; i++) {
    let cells = table1.rows[i].cells;
    let crimeData = Array.from(cells).slice(2).map(cell => parseInt(cell.textContent.replace(',', ',').trim())); 
    let country = cells[1].textContent.trim(); 


    
    crimeData.forEach((crimeCount, index) => {
        let dataPoint = {
            Country: country,
            Year: years[index],
            Crimes: crimeCount
        };
        data.push(dataPoint);
    });
}

let labels = data.map(item => item.Country + ' - ' + item.Year);
let crimeCounts = data.map(item => item.Crimes);
let uniqueLabels = Array.from(new Set(data.map(item => item.Country + ' - ' + item.Year)));


let labelColors = generateLabelColors(uniqueLabels);

let config = {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "Country",
            data: crimeCounts,
            backgroundColor: uniqueLabels.map(label => labelColors[label]),
            borderColor: uniqueLabels.map(label => labelColors[label]),
            borderWidth: 2,
        }]
    },
    options: {
        indexAxis: 'x',
        scales: {
            x: {
                beginAtZero: true,
            }
        },

    }
};



function generateLabelColors(labels) {
    let colors = {};
    let availableColors = ['#FF5733', '#FFC300', '#C70039', '#900C3F', '#581845', '#2E86C1', '#17A589', '#229954', '#D4AC0D', '#BA4A00']; // Liste de couleurs disponibles

    labels.forEach((label, index) => {
        colors[label] = availableColors[index % availableColors.length]; // Assignez une couleur à chaque label
    });

    return colors;
}
let canvas1 = document.createElement('canvas');
canvas1.width = 800;
canvas1.height = 800;
let ctx1 = canvas1.getContext('2d');

let parentElement = table1.parentNode;


parentElement.insertBefore(canvas1, table1);


new Chart(ctx1, config);







let table = document.getElementById('table2');

let countries = [];
let data2007_09 = [];
let data2010_12 = [];


for (let i = 1; i < table.rows.length; i++) {
    let cells = table.rows[i].cells;
    countries.push(cells[1].textContent);
    data2007_09.push(parseInt(cells[2].textContent));
    data2010_12.push(parseInt(cells[3].textContent));
}


let canvas2 = document.createElement('canvas');
canvas2.width = 800;
canvas2.height = 800;
let ctx2 = canvas2.getContext('2d');
let parentElement2 = table2.parentNode;
parentElement2.insertBefore(canvas2, table2);

let myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: countries,
        datasets: [{
            label: '2007-09',
            data: data2007_09,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: '2010-12',
            data: data2010_12,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }

    }
});














function createChart() {
    var dataPoints = [];

    // Create a div for the chart
    var chartContainer = document.createElement("div");
    chartContainer.id = "chartContainer";
    chartContainer.style.height = "300px";
    chartContainer.style.width = "100%";
    document.body.appendChild(chartContainer);
    let parentElement3 = document.querySelector('h1').parentNode;
    parentElement3.insertBefore(chartContainer, document.querySelector('h1'));

    var chart = new CanvasJS.Chart("chartContainer", {

        data: [{
            type: "line",
            dataPoints: dataPoints,
        }]
    });

    // Initial data retrieval
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function (data) {
        $.each(data, function (key, value) {
            dataPoints.push({ x: value[0], y: parseInt(value[1]) });
        });

        chart.render();
        updateChart();
    });

    // Function to update the chart every second
    function updateChart() {
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function (data) {
            $.each(data, function (key, value) {
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
            });
            chart.render();
            setTimeout(function () { updateChart() }, 1000);
        });
    }
}

// Call the function to create the chart and container
createChart();




