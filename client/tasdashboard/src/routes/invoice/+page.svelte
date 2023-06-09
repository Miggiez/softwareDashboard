<script>
	import { authenticate } from "$lib/auth"
	import { onMount } from "svelte"

  let invoice = []
  let search = ""
  let fillingtime = 0
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "sales officer" || role === "admin"){
      await getInvoice(localStorage.getItem('token'))
    } else {
      window.location.href="/"
    }
    
  })
  
  const getInvoice = async(token) => {
    const res = await fetch(`http://localhost:5000/salesoffice/invoice?search=${search}`, {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
    const data  = await res.json()
    invoice = data.data
  }  
</script>
<div class="d-flex flex-column align-items-center">
  <h2>Paid Sale Invoice</h2>
    <div style="margin-bottom: 20px">
      <form class="d-flex" on:submit={async() => await getInvoice(localStorage.getItem('token'))}>
        <input class="form-control me-2" type="search" placeholder="PO Number" aria-label="Search" bind:value={search}/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
    {#each invoice as {ponumber,paymentnumber,invoiceid,taxpayerid,customerid,date,gastype,qty,dayprice,amount,vehiclenumber,customer, companyname, address, tax, totalamount}}
      <div class="card" style="width:1000px; margin:20px; padding: 20px">
        <div class="row">
          <h5 class="col">Invoice Number: {invoiceid}</h5>
          <h6 class="col"></h6>
        </div>
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
          <h5 class="col">Filling Time</h5>
          <h5 class="col">Price/Liter</h5>
          <h5 class="col">Qty (Liter)</h5>
          <h5 class="col">Amount</h5>
        </div>
        <div class="row">
          <h5 class="col">{gastype}</h5>
          <h5 class="col">{
            (fillingtime = qty/200).toFixed(2)
          } mins</h5>
          <h5 class="col">{dayprice.toFixed(2)}</h5>
          <h5 class="col">{qty.toFixed(2)}</h5>
          <h5 class="col">{amount.toFixed(2)}</h5>
        </div>
      </div>
    {/each}
</div>

