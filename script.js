/*document.addEventListener('DOMContentLoaded', function () {
    let table1 = document.getElementById('table1');
    let labels = [];
    let data = [];

    // Parcourez les lignes du tableau (en commençant par la troisième ligne)
    for (let i = 2; i < table1.rows.length; i++) {
        let cells = table1.rows[i].cells;
        labels.push(cells[1].textContent);
        data.push(parseFloat(cells[2].textContent.replace(',', '.')));
    }

    let config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nombre (en milliers)',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'x', // Spécifiez l'axe des étiquettes
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };

    let canvas = document.createElement('canvas');
    canvas.width = 300; // Ajustez la largeur selon vos besoins
    canvas.height = 300; // Ajustez la hauteur selon vos besoins
    let ctx = canvas.getContext('2d');

    let parentElement = table1.parentNode;

    // Insérez le canvas avant la table
    parentElement.insertBefore(canvas, table1);

    // Créez le graphique dans le contexte du canvas
    new Chart(ctx, config);
});*/


/*document.addEventListener('DOMContentLoaded', function () {
    let table1 = document.getElementById('table1');
    let labels = [];
    let data = [];

    // Parcourez toutes les lignes du tableau (en commençant par la première ligne)
    for (let i = 1; i < table1.rows.length; i++) {
        let cells = table1.rows[i].cells;
        labels.push(cells[1].textContent);
        data.push(parseFloat(cells[2].textContent.replace(',', '.')));
    }

    let config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Country',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'x', // Spécifiez l'axe des étiquettes
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    };

    let canvas = document.createElement('canvas');
    canvas.width = 1500; // Ajustez la largeur selon vos besoins
    canvas.height = 600; // Ajustez la hauteur selon vos besoins
    let ctx = canvas.getContext('2d');

    let parentElement = table1.parentNode;

    // Insérez le canvas avant la table
    parentElement.insertBefore(canvas, table1);

    // Créez le graphique dans le contexte du canvas
    new Chart(ctx, config);
});*/







let table1 = document.getElementById('table1');
let data = [];

// Obtenez les années à partir de la première ligne (en-têtes) du tableau
let years = Array.from(table1.rows[1].cells).slice(2).map(cell => cell.textContent.trim());

// Parcourez les lignes du tableau (à partir de la deuxième ligne)
for (let i = 2; i < table1.rows.length; i++) {
    let cells = table1.rows[i].cells;
    let crimeData = Array.from(cells).slice(2).map(cell => parseInt(cell.textContent.replace(',', ',').trim())); // Obtenez les données sur les crimes pour chaque année
    let country = cells[1].textContent.trim(); // Obtenez le nom du pays en enlevant les annotations entre parenthèses


    // Ajoutez les données du pays dans le format requis pour le graphique
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

// Générez un objet de couleurs pour chaque label
let labelColors = generateLabelColors(uniqueLabels);

let config = {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label : "Country",
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

// Insérez le canvas avant la table
parentElement.insertBefore(canvas1, table1);

// Créez le graphique dans le contexte du canvas
new Chart(ctx1, config);







let table = document.getElementById('table2');
// Préparez les données pour Chart.js
let countries = [];
let data2007_09 = [];
let data2010_12 = [];

// Parcourez les lignes du tableau (à partir de la deuxième ligne)
for (let i = 1; i < table.rows.length; i++) {
    let cells = table.rows[i].cells;
    countries.push(cells[1].textContent);
    data2007_09.push(parseInt(cells[2].textContent));
    data2010_12.push(parseInt(cells[3].textContent));
}

// Créez le graphique à l'aide de Chart.js
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

}});












       /* // Créez un élément canvas avec JavaScript
        let canvas3 = document.createElement('canvas');
        canvas3.id = 'realtime-chart';
        canvas3.width = 800;
        canvas3.height = 400;

        // Ajoutez le canvas au conteneur
        document.getElementById('chart-container').appendChild(canvas3);

        // Créez un tableau pour stocker les données
        let data3 = [];

        // Créez un graphique vide
        let ctx = document.getElementById('realtime-chart').getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data3: {
                labels: [],
                datasets: [{
                    label: 'Données en temps réel',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data3: data3,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                    },
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });

        // Fonction pour récupérer les données via AJAX
        function fetchData() {
            fetch('https://canvasjs.com/services/data3/datapoints.php')
                .then(response => response.json())
                .then(newData => {
                    data3.push(newData);
                    // Limitez la longueur du tableau des données à 20 pour afficher les dernières données
                    if (data3.length > 20) {
                        data3.shift();
                    }
                    chart.update(); // Mettez à jour le graphique
                });
        }

        // Appelez fetchData() toutes les secondes
        setInterval(fetchData, 1000);
    




/* Récupérez le tableau HTML
let table2 = document.getElementById('table2');
let countries = [];
let data2007 = [];
let data2010 = [];

// Parcourez les lignes du tableau (à partir de la deuxième ligne)
for (let i = 1; i < table2.rows.length; i++) {
    let cells = table2.rows[i].cells;
    countries.push(cells[1].textContent); // Nom du pays
    data2007.push(parseFloat(cells[2].textContent)); // Données de 2007-09
    data2010.push(parseFloat(cells[3].textContent)); // Données de 2010-12
}

// Créez un objet de configuration pour le graphique
let myChart = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: countries,
        datasets: [
            {
                label: '2007-09',
                data: data2007,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: '2010-12',
                data: data2010,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Créez un canvas pour afficher le graphique
let canvas2 = document.createElement('canvas');
canvas2.width = 800; // Ajustez la largeur selon vos besoins
canvas2.height = 500; // Ajustez la hauteur selon vos besoins
let ctx2 = canvas2.getContext('2d');

// Insérez le canvas avant le tableau
let parentElement2 = table2.parentNode;
parentElement2.insertBefore(canvas2, table2);

// Créez le graphique dans le contexte du canvas
new Chart(ctx2, myChart);
*/








// Créez un canvas et un graphique une seule fois
let canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 800;
let ctx = canvas.getContext('2d');

// Récupérez le parent de h1 (le titre principal)
let parentElement3 = document.querySelector('h1').parentNode;

// Insérez le canvas avant le titre principal
parentElement3.insertBefore(canvas, document.querySelector('h1'));

let chart; // Déclarez la variable du graphique à l'extérieur de la fonction

function fetchDataAndRenderChart() {
   console.log('Fetching data...'); // Add this line
    // Fetch data from the URL using AJAX
    fetch('https://canvasjs.com/services/data/datapoints.php')
        .then(response => response.json())
        .then(data => {
         console.log('Data fetched:', data); // Add this line
            // Extract x and y values from the fetched data
            const xValues = data.map(point => point[0]);
            const yValues = data.map(point => point[1]);

            // Mettez à jour les données du graphique existant
            if (chart) {
                chart.data.labels = xValues;
                chart.data.datasets[0].data = yValues;
                chart.update(); // Mettez à jour le graphique
            } else {// Créez le graphique à l'aide de Chart.js si le graphique n'existe pas encore
                chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: xValues,
                        datasets: [{
                            label: 'Data Points',
                            data: yValues,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom'
                            }
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data and render chart every second
setInterval(fetchDataAndRenderChart, 1000);





