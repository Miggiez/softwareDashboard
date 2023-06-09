<script>
	import { authenticate } from "$lib/auth"
	import { onMount } from "svelte"

  let stockname = ""
  let beginningStock = 0
  let purchased = 0
  let sold = 0
  let ending = 0
  let stockname2 = ""
  let beginningStock2 = 0
  let purchased2 = 0
  let sold2 = 0
  let ending2 = 0
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "sales officer" || role === "admin"){
      await getIncomeStatement(localStorage.getItem('token'))
    } else {
      window.location.href="/"
    }
    
  })
  
  const getIncomeStatement = async(token) => {
    const res = await fetch(`http://localhost:5000/salesoffice/inventory`, {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })
    const data  = await res.json()
    stockname = data.data[0].stockname
    beginningStock = data.data[0].beginningstock
    purchased = data.data[0].purchased
    sold = data.data[0].sold
    ending = data.data[0].ending
    stockname2 = data.data[1].stockname
    beginningStock2 = data.data[1].beginningstock
    purchased2 = data.data[1].purchased
    sold2 = data.data[1].sold
    ending2 = data.data[1].ending
  }  
</script>
<div class="d-flex flex-column align-items-center">
  <h2>Inventory Stock Card</h2>
    <div class="card" style="width:800px; margin:20px; padding: 20px">
      <div class="row"> 
        <h4 class="col">Petrol Type</h4>
        <h4 class="col">{stockname} </h4>
        <h4 class="col">{stockname2} </h4>
      </div>
      <div class="row">
        <h6 class="col">Beginning Stock</h6>
        <h6 class="col">{beginningStock} Liters</h6>
        <h6 class="col">{beginningStock2} Liters</h6>
      </div>
      <div class="row">
        <h6 class="col">Purchased</h6>
        <h6 class="col">{purchased} Liters</h6>
        <h6 class="col">{purchased2} Liters</h6>
      </div>
      <div class="row">
        <h6 class="col">Sold</h6>
        <h6 class="col">{sold} Liters</h6>
        <h6 class="col">{sold2} Liters</h6>
      </div>
      <div class="row">
        <h6 class="col">Ending Stock</h6>
        <h6 class="col">{ending} Liters</h6>
        <h6 class="col">{ending2} Liters</h6>
      </div>
      
    </div>
</div>

