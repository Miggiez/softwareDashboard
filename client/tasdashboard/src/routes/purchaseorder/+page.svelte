<script>
	import { authenticate } from "$lib/auth"
	import { onMount } from "svelte"

  let po = []
  let search = ""
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    await getPurchaseOrder(localStorage.getItem('token'))
  })
  
  const getPurchaseOrder = async(token) => {
    const res = await fetch(`http://localhost:5000/salesoffice/purchaseorder?search=${search}`, {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
    const data  = await res.json()
    po = data.data
    console.log(po)
  }  
</script>
<div class="d-flex flex-column align-items-center">
  <h2>Purchase Order</h2>
    <div style="margin-bottom: 20px">
      <form class="d-flex" on:submit={ async() => await getPurchaseOrder(localStorage.getItem('token'))}>
        <input class="form-control me-2" type="search" placeholder="PO Number" aria-label="Search" bind:value={search}/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    {#each po as {ponumber,paymentnumber,invoiceno,taxpayerid,customerid,date,gastype,qty,dayprice,amount,vehiclenumber,customer, companyname, address}}
      <div class="card" style="width:1000px; margin:20px; padding: 20px">
        <div class="row">
          <h5 class="col">PO Number: {ponumber}</h5>
          <h5 class="col">Customer ID: {customerid}</h5>
        </div>
        <div class="row">
          <h5 class="col">Payment Number: {paymentnumber}</h5>
          <h5 class="col">Customer: {customer} </h5>
        </div>
        <div class="row">
          <h5 class="col">Date: {new Date(date).toDateString()}</h5>
          <h5 class="col">Company Name: {companyname}</h5>
        </div>
        <div class="row">
          <h5 class="col">Address: {address}}</h5>
          <h5 class="col">Tax Payer ID: {taxpayerid}</h5>
        </div>

        <br/>
        <br/>
        <div class="row">
          <h5 class="col">Item</h5>
          <h5 class="col">Price/Liter</h5>
          <h5 class="col">Qty (Liter)</h5>
          <h5 class="col">Amount</h5>
        </div>
        <div class="row">
          <h5 class="col">{gastype}</h5>
          <h5 class="col">{dayprice.toFixed(2)}</h5>
          <h5 class="col">{qty.toFixed(2)}</h5>
          <h5 class="col">{amount.toFixed(2)}</h5>
        </div>
      </div>
    {/each}
</div>

