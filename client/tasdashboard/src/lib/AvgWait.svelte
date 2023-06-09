<canvas id="avgwaittime"></canvas>

<script>
  import {Chart} from 'chart.js/auto'
	import { afterUpdate } from 'svelte'
  export let chartData
  let chart = null
  const createChart = () => {
    if(chart !== null){
      chart.destroy()
    }
    chart = new Chart(document.getElementById('avgwaittime'), {
      type: 'bar', 
      data: {
        labels: ['Sales Office', 'Inbound Weight', 'Diesel Bay', 'Gasohol95 Bay', 'Outbound Bay'],
        datasets: [{
          label: "Avg. Wait Time",
          data: chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderWidth: 1
        }]

      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }
  afterUpdate(createChart)
 
</script>