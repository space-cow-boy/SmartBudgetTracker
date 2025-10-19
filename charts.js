let chart;

function updateChart(data) {
  const categories = {};
  data.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });

  const ctx = document.getElementById("expenseChart").getContext("2d");
  if (chart) chart.destroy(); // prevent multiple charts

  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8"]
      }]
    }
  });
}
