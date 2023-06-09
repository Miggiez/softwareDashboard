<script>
	import { onMount } from "svelte"
  import AvgWait from "$lib/AvgWait.svelte";
  import SchedUtil from "$lib/SchedUtil.svelte";
	import { authenticate } from "$lib/auth"

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
    utilso:0,
    utilib:0,
    utilob:0,
    utildies:0,
    utilgas95:0,
    avgservicetimeso:0,
    avgservicetimeib:0,
    avgservicetimeob:0,
    avgservicetimediesel:0,
    avgservicetimegas95:0,
    totalwip:0,
    faildiesel: 0,
    failgas95: 0,
    avgcycletime:0
  } 
  let search = "2022-03-01"
  let chartData = {}
  let chartData2 = {}
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "admin" || role === "operator"){
      await getDailyKpi(localStorage.getItem('token'))
    } else {
      window.location.href="/"
    }
    
  })
  
  const getDailyKpi = async(token) => {
    const res = await fetch(`http://localhost:5000/operation/daily?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token
      }
    })
    const data  = await res.json()
    const data2 = data.data
    drops = data2
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
    drops.totalwip = data2[0].total
    drops.notruckin = data2[0].notruckin
    drops.notruckout = data2[0].notruckout
    drops.faildiesel = data2[0].faildiesel
    drops.failgas95 = data2[0].failgas95
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
      drops.utilob,
      drops.utildies,
      drops.utilgas95
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 0.4fr 0.4fr 0.4fr 0.4fr;
    grid-template-areas:
      ". search search ."
      "amds amgas95 avgcycletime ."
      "trin trout faildiesel failgas95"
      "avgwait avgwait schedutil schedutil";

    column-gap: 4rem;
  }

  #amds {
    grid-area: amds;
  }
  #amgas95 {
    grid-area: amgas95;
  }
  #avgcycletime {
    grid-area: avgcycletime;
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
  #totalwip {
    grid-area: totalwip;
  }
  #faildiesel {
    grid-area: faildiesel;
  }
  #failgas95 {
    grid-area: failgas95;
  }
  #schedutil {
    grid-area: schedutil;
  }

  .dropdown-menu {
    max-height: 280px;
    overflow-y: auto;
  }
</style>

<div class="d-flex flex-column align-items-center">
  <h2 style="margin: 40px">Operation Dashboard</h2>
  <div class="container">
    <div class="contbox">
      <div id="search">
        <form class="input-group mb-3" on:submit={async() => await getDailyKpi(localStorage.getItem('token'))}>
          <input type="text" class="form-control" aria-label="Text input with dropdown button" bind:value={search} disabled/>
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul class="dropdown-menu dropdown-menu-end" >
            <li><button class="dropdown-item" on:click={() => search = "2022-03-01"}>2022-03-01</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-02"}>2022-03-02</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-03"}>2022-03-03</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-04"}>2022-03-04</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-05"}>2022-03-05</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-06"}>2022-03-06</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-07"}>2022-03-07</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-08"}>2022-03-08</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-09"}>2022-03-09</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-10"}>2022-03-10</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-11"}>2022-03-11</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-12"}>2022-03-12</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-13"}>2022-03-13</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-14"}>2022-03-14</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-15"}>2022-03-15</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-16"}>2022-03-16</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-17"}>2022-03-17</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-18"}>2022-03-18</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-19"}>2022-03-19</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-20"}>2022-03-20</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-21"}>2022-03-21</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-22"}>2022-03-22</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-23"}>2022-03-23</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-24"}>2022-03-24</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-25"}>2022-03-25</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-26"}>2022-03-26</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-27"}>2022-03-27</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-28"}>2022-03-28</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-29"}>2022-03-29</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-30"}>2022-03-30</button></li>
            <li><button class="dropdown-item" on:click={() => search = "2022-03-31"}>2022-03-31</button></li>   
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
      <div  id="avgcycletime">
        <div class="card" style="padding: 10px">
          <h6>Avg. Cycle Time</h6>
          <h4 class="textamount">{drops.avgcycletime.toFixed(2)} mins</h4>
        </div>
        
      </div>
      <div id="avgwait">
        <div class="card" style="padding: 10px">
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
      <div id="faildiesel">
        <div class="card" style="padding: 10px">
          <h6>Fail Diesel</h6>
          <h4 class="textamount">{drops.faildiesel}</h4>
        </div>
        
      </div>
      <div id="failgas95">
        <div class="card" style="padding: 10px">
          <h6>Fail Gasohol95</h6>
          <h4 class="textamount">{drops.failgas95}</h4>
        </div>
        
      </div>
      <div id="trin">
        <div class="card" style="padding: 10px">
          <h6>NO. of Truck In</h6>
          <h4 class="textamount">{drops.notruckin}</h4>
        </div>
        
      </div>
      <div id="trout">
        <div class="card" style="padding: 10px">
          <h6>NO. of Truck Out</h6>
          <h4 class="textamount">{drops.notruckout}</h4>
        </div>
        
      </div>
      <div id="schedutil">
        <div class="card" style="padding: 10px">
          <SchedUtil {chartData2}/>
        </div>
      
      </div>
    </div>
  </div>
</div>

