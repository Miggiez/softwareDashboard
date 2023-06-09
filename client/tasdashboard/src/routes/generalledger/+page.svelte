<script>
	import { authenticate } from "$lib/auth"
	import { onMount } from "svelte"

  let search = "Account Recievable"
  let ledger = []

  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "sales officer" || role === "admin"){
      await getGeneralLedger(localStorage.getItem('token'))
    } else {
      window.location.href = "/"
    }
  })
  
  const getGeneralLedger = async(token) => {
    if(search.length > 0){
      const res = await fetch(`http://localhost:5000/salesoffice/generalledger?search=${search}`, {
        method: "GET",
        headers: {
          "x-auth-token": token
        }
      })
      const data  = await res.json()
      ledger = data.data
    }
  }

  
</script>
<div class="d-flex flex-column align-items-center">
  <h2>General Ledger</h2>
  <div style="margin-bottom: 20px">
    <form class="input-group mb-3" on:submit={async() => await getGeneralLedger(localStorage.getItem('token'))}>
      <input type="text" class="form-control" aria-label="Text input with dropdown button" bind:value={search} disabled/>
      <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" on:click={() => search = "Account Recievable"}>Accounts Receivable</button></li>
        <li><button class="dropdown-item" on:click={() => search = "Accounts Payable"}>Accounts Payable</button></li>
        <li><button class="dropdown-item" on:click={() => search = "Inventory DIESEL"}>Inventory DIESEL</button></li>
        <li><button class="dropdown-item" on:click={() => search = "Inventory GASOHOL95"}>Inventory GASOHOL95</button></li>
        <li><button class="dropdown-item" on:click={() => search = "Cash"}>Cash</button></li>
      </ul>
    </form>
  </div>

  
    <div class="card" style="width:800px; margin-bottom:20px">
      <div class="table-responsive-sm">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Explanation</th>
              <th scope="col">Debit</th>
              <th scope="col">Credit</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
          {#each ledger as {expname, credit, debit, date, balance}}
            <tr>
              <td>{date}</td>
              <td>{expname}</td>
              <td>{debit}</td>
              <td>{credit}</td>
              <td>{balance}</td>
              <td></td>
            </tr>
          {/each}
         
          </tbody>
        </table>
      </div>
      
    </div>
 
</div>

