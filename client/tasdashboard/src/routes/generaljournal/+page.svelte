<script>
	import { onMount } from "svelte"
  import { authenticate } from '$lib/auth.js'
	import { unescapeLeadingUnderscores } from "typescript"

  // let data = []
  // onMount(async() => {
  //   data = await getGeneralJournal()
  // })
  let search = ""
  let journal = []

  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "sales officer" || role === "admin"){
      await getGeneralJournal(localStorage.getItem('token'))
    }  else {
      window.location.href = '/';
    }
  })

  const getGeneralJournal = async(token) => {
    let res;
    if(search.length > 0){
      res = await fetch(`http://localhost:5000/salesoffice/generaljournal?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      })
    } else {
      res = await fetch(`http://localhost:5000/salesoffice/generaljournal`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token
        }
      })
    }
    const data  = await res.json()
    journal = data.data
  }
</script>


<div class="d-flex flex-column align-items-center">
  <h2>General Journal</h2>
  <div style="margin-bottom: 20px">
    <form class="d-flex" on:submit={async() => getGeneralJournal(localStorage.getItem('token'))}>
      <input class="form-control me-2" type="search" placeholder="MM/DD/YY" aria-label="Search" bind:value={search}/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>

  {#each journal as {expnamedebit, expnamecredit, credit, debit, date, refponumber}}
    <div class="card" style="width:800px; margin-bottom:20px; padding: 20px">
      <h4>Date: {date}</h4>
      <h4>PO Number: {refponumber}</h4>
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Explanation</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{expnamedebit}</td>
              <td>{debit}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>{expnamecredit}</td>
              <td></td>
              <td>{credit}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  {:else}
    <p>Loading..</p>
  {/each}
 
</div>

