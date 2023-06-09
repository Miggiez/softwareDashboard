<script>
	import { onMount } from "svelte"
  import AvgWait from "$lib/AvgWait.svelte";
  import SchedUtil from "$lib/SchedUtil.svelte";
	import { authenticate } from "$lib/auth"

  let search = "Week1"
  let drops = {
    amountdiesel: 0,
    amountgas95: 0,
    notruckin: 0,
    notruckout: 0,
    avgwaittimeib:0,
    avgwaittimeob:0,
    avgwaittimediesel:0,
    avgwaittimegas95:0,
    avgwaittimeso:0,
    avgservicetimeso:0,
    avgservicetimeib:0,
    avgservicetimeob:0,
    avgservicetimediesel:0,
    avgservicetimegas95:0,
    utilso:0,
    utilib:0,
    utilob:0,
    utildies:0,
    utilgas95:0,
    avgwip:0,
    avgcycletime:0
  }

  let chartData = {}
  let chartData2 = {}
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    console.log(role)
    if(role === "admin"){
      await getWeeklyMonthly(localStorage.getItem('token'))
    } else {
      window.location.href="/"
    }
  })
  
  const getWeeklyMonthly = async(token) => {
    
    const res = await fetch(`http://localhost:5000/operation/weekly?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
    const data  = await res.json()
    const data2 = data.data
    drops.amountdiesel = data2[0].amountdiesel
    drops.amountgas95 = data2[0].amountgas95
    drops.avgcycletime = data2[0].avgcycletime
    drops.avgservicetimediesel = data2[0].avgservicetimediesel
    drops.avgservicetimegas95 = data2[0].avgservicetimegas95
    drops.avgservicetimeib = data2[0].avgservicetimeib
    drops.avgservicetimeob = data2[0].avgservicetimeob
    drops.avgservicetimeso = data2[0].avgservicetimeso
    drops.avgwaittimeso = data2[0].avgwaittimeso
    drops.avgwaittimediesel = data2[0].avgwaittimediesel
    drops.avgwaittimegas95 = data2[0].avgwaittimegas95
    drops.avgwaittimeib = data2[0].avgwaittimeib
    drops.avgwaittimeob = data2[0].avgwaittimeob
    drops.utilso = data2[0].utilso
    drops.utilib = data2[0].utilib
    drops.utilob = data2[0].utilob
    drops.utildies = data2[0].utildies
    drops.utilgas95 = data2[0].utilgas95
    drops.avgwip = data2[0].avgwip
    drops.notruckin = data2[0].notruckin
    drops.notruckout = data2[0].notruckout
    chartData = [
      drops.avgwaittimeso,
      drops.avgwaittimeib,
      drops.avgwaittimediesel,
      drops.avgwaittimegas95,
      drops.avgwaittimeob
    ]
    chartData2 = [
      drops.utilso,
      drops.utilib,
      drops.utildies,
      drops.utilgas95,
      drops.utilob,
    ]
  }


</script>

<style>
  .textamount {
    text-align: center;
  }
  .boxstyle {
    border: solid 1px black;
  }
  
  .contbox {
    display: grid;
    height: 100vh;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr 0.4fr 0.4fr 0.4fr;
    grid-template-areas:
      "search amds amgas95 avgdiesc avgwip"
      ". trin . trout  ."
      "avgwait avgwait . schedutil schedutil"
      "avgwait avgwait . schedutil schedutil";
    column-gap: 1rem;
  }

  #amds {
    grid-area: amds;
  }
  #amgas95 {
    grid-area: amgas95;
  }
  #avgdiesc {
    grid-area: avgdiesc;
  }
  #avggas95c {
    grid-area: avggas95c;
  }
  #search {
    grid-area: search;
  }
  #avgwait {
    grid-area: avgwait;
  }
  #trin {
    grid-area: trin;
  }
  #trout {
    grid-area: trout;
  }
  #avgwip {
    grid-area: avgwip;
  }
  #schedutil {
    grid-area: schedutil;
  }
</style>

<div class="d-flex flex-column align-items-center">
  <h2 style="margin: 40px">Management Dashboard</h2>
  <div class="container">
    <div class="contbox">
      <div id="search">
        <form class="input-group mb-3" on:submit={async() => await getWeeklyMonthly(localStorage.getItem('token'))}>
          <input type="text" class="form-control" aria-label="Text input with dropdown button" bind:value={search} disabled/>
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item" on:click={() => search = "Week1"}>Week 1</button></li>
            <li><button class="dropdown-item" on:click={() => search = "Week2"}>Week 2</button></li>
            <li><button class="dropdown-item" on:click={() => search = "Week3"}>Week 3</button></li>
            <li><button class="dropdown-item" on:click={() => search = "Week4"}>Week 4</button></li>
            <li><button class="dropdown-item" on:click={() => search = "Week5"}>Week 5</button></li>  
            <li><button class="dropdown-item" on:click={() => search = "Month"}>Month</button></li>  
       
          </ul>
        </form>
      </div>
      
      <div id="amds">
        <div class="card" style="padding: 10px">
          <h6>Amount Filled Diesel</h6>
          <h4 class="textamount">{drops.amountdiesel.toFixed(2)} liters</h4>
        </div>
        
      </div>
      <div  id="amgas95">
        <div class="card" style="padding: 10px">
          <h6>Amount Filled Gasohol95</h6>
          <h4 class="textamount">{drops.amountgas95.toFixed(2)} liters</h4>
        </div>
        
      </div>
      <div  id="avgdiesc">
        <div class="card" style="padding: 10px">
          <h6>Avg. Diesel Cycle Time</h6>
          <h4 class="textamount">{drops.avgcycletime.toFixed(2)} mins</h4>
        </div>
        
      </div>
      <div id="avgwait">
        <div class="card">
          <AvgWait {chartData}/>
        </div>

      </div>
      <div id="trin">
        <div class="card" style="padding: 10px">
          <h6>Truck In</h6>
          <h4 class="textamount">{drops.notruckin}</h4>
        </div>
        
      </div>
      <div id="trout">
        <div class="card" style="padding: 10px">
          <h6>Truck Out</h6>
          <h4 class="textamount">{drops.notruckout}</h4>
        </div>
        
      </div>
      <div id="avgwip">
        <div class="card" style="padding: 10px">
          <h6>Avg. WIP</h6>
          <h4 class="textamount">{drops.avgwip}</h4>
        </div>
        
      </div>
      <div id="schedutil">
        <div class="card">
          <SchedUtil {chartData2}/>
        </div>
         
        
      </div>
    </div>
  </div>
</div>

