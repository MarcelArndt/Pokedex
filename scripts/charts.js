function createChart(id){
  try{const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['HP', 'Att.', 'Def.', 'Spc.Att.', 'Spc.Def.', 'Spe.'],
      datasets: [{
        label: 'Stats',
        data: loadedPokeArray[id]["stats"],
        backgroundColor: ['rgba(82, 136, 163, 0.7)','rgba(82, 136, 163, 0.7)','rgba(82, 136, 163, 0.7)','rgba(82, 136, 163, 0.7)','rgba(82, 136, 163, 0.7)','rgba(82, 136, 163, 0.7)'],
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
  });}catch{};
}
