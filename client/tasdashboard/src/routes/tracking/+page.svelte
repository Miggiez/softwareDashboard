<script>
	import { onMount } from "svelte"
  import { authenticate } from '$lib/auth.js'

  let search = ""
  let date = "2022-03-01"
  let track = {
    sales:[],
    type:[],
    wbout:[],
    win:[]
  }

  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "admin"){
      await getTracking(localStorage.getItem('token'))
    }  else {
      window.location.href = '/';
    }
  })

  const getTracking = async(token) => {
    const res = await fetch(`http://localhost:5000/operation/tracking?search=${search}&date=${date}`, {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })

    const data = await res.json()
    const data2 = data.data
    track = {
      sales: data2.sales,
      type: data2.type,
      wbout: data2.wbout,
      win: data2.wbin
    }

    console.log(track)
  }
</script>


<div class="d-flex flex-column align-items-center">
  <h2>Truck Tracking</h2>
  <div style="margin-bottom: 20px">
    <form class="d-flex" on:submit={async() => await getTracking(localStorage.getItem('token'))}>
      <input class="form-control me-2" type="search" placeholder="Vehichle Number" aria-label="Search" bind:value={search}/>
      <input class="form-control me-2" type="date" placeholder="YY/MM/DD" aria-label="Search" bind:value={date} min="2022-03-01" max="2022-03-31"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>

  
  <div class="card" style="width:1000px; margin-bottom:20px; padding: 20px">
    <h4>Date: {date} </h4>
    <h4>Vehicle Numbers: {search} </h4>
    <div>
      <h6>Sales:</h6>
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">PO Number</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Service Time</th>
            </tr>
          </thead>
          <tbody>
            {#each track.sales as {ponumber, arrivaltime, starttime, endtime, departuretime, servicetime}}
            <tr>
              <td>{ponumber}</td>
              <td>{arrivaltime}</td>
              <td>{starttime}</td>
              <td>{endtime}</td>
              <td>{departuretime}</td>
              <td>{servicetime.toFixed(2)}</td>
            </tr>
            {:else}
              <p>Loading...</p>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h6>Bay:</h6>
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">PO Number</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Service Time</th>
              <th scope="col">Bay Type</th>
            </tr>
          </thead>
          <tbody>
            {#each track.type as {ponumber, arrivaltime, starttime, endtime, departuretime, servicetime, baytype}}
            <tr>
              <td>{ponumber}</td>
              <td>{arrivaltime}</td>
              <td>{starttime}</td>
              <td>{endtime}</td>
              <td>{departuretime}</td>
              <td>{servicetime.toFixed(2)}</td>
              <td>{baytype}</td>
            </tr>
            {:else}
              <p>Loading...</p>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h6>Weight Bound In:</h6>
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">PO Number</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Service Time</th>
            </tr>
          </thead>
          <tbody>
            {#each track.win as {ponumber, arrivaltime, starttime, endtime, departuretime, servicetime}}
            <tr>
              <td>{ponumber}</td>
              <td>{arrivaltime}</td>
              <td>{starttime}</td>
              <td>{endtime}</td>
              <td>{departuretime}</td>
              <td>{servicetime.toFixed(2)}</td>
            </tr>
            {:else}
              <p>Loading...</p>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div>
      <h6>Weight Bound Out:</h6>
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">PO Number</th>
              <th scope="col">Arrival Time</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Departure Time</th>
              <th scope="col">Service Time</th>
            </tr>
          </thead>
          <tbody>
            {#each track.wbout as {ponumber, arrivaltime, starttime, endtime, departuretime, servicetime}}
            <tr>
              <td>{ponumber}</td>
              <td>{arrivaltime}</td>
              <td>{starttime}</td>
              <td>{endtime}</td>
              <td>{departuretime}</td>
              <td>{servicetime.toFixed(2)}</td>
            </tr>
            {:else}
              <p>Loading...</p>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
   
  </div>

 
</div>

