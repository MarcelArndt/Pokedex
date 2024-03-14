function createChart(){
const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HP', 'Attack', 'Defence', 'Special-Attack', 'Special-Defense', 'Speed'],
      datasets: [{
        label: 'Stats',
        data: [39, 52, 43, 60, 50, 65],
        backgroundColor: ['rgba(82, 136, 163, 0.5)','rgba(82, 136, 163, 0.5)','rgba(82, 136, 163, 0.5)','rgba(82, 136, 163, 0.5)','rgba(82, 136, 163, 0.5)','rgba(82, 136, 163, 0.5)'],
        borderWidth: 1
      }]
    },
    options: {
      legend: {display: false},
      labels: {enabled: false},
      tooltips: {enabled: false},
      plugins: {filler: {propagate: false}},
      interaction: {intersect: false},
      title: {display: false}

    }
  });
}