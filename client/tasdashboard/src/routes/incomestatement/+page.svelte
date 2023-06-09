<script>
	import { authenticate } from "$lib/auth"
	import { onMount } from "svelte"

  let income = []
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role === "sales officer" || role === "admin"){
      await getIncomeStatement(localStorage.getItem('token'))
    } else {
      window.location.href="/"
    }
  })
  
  const getIncomeStatement = async(token) => {
    const res = await fetch(`http://localhost:5000/salesoffice/incomestatement`, {
      method: "GET", 
      headers: {
        "x-auth-token": token
      }
    })
    const data  = await res.json()
    income = data.data
  }  

</script>
<div class="d-flex flex-column align-items-center">
  <h2>Income Statement</h2>
    <div class="card" style="width:800px; margin:20px; padding: 20px">
      <h4>Sale</h4>
    {#each income as {gasoholsale, deiselsale, gasoholcogs, deiselcogs, sofstaff, gatctrl, utilityexpense, depriciation, netincome, grossprofit, totalsale, totalcogs}}
      <div class="row">
        <h6 class="col" style="text-indent: 20px">GASOHOL95</h6>
        <h6 class="col" style="text-indent: 100px">{gasoholsale}</h6>
      </div>
      <div class="row">
        <h6 class="col" style="text-indent: 20px">DIESEL</h6>
        <h6 class="col" style="text-indent: 100px">{deiselsale}</h6>
      </div>
      
      <div class="d-flex justify-content-between">
        <h6><b>Total Sale</b></h6>
        <h6><b>{totalsale}</b></h6>
      </div>
      
      <br/>
      
      <h4>Less Cost of Goods Sold:</h4>
      <div class="row">
        <h6 class="col" style="text-indent: 20px">GASOHOL95</h6>
        <h6 class="col" style="text-indent: 100px">{gasoholcogs}</h6>
      </div>
      <div class="row">
        <h6 class="col" style="text-indent: 20px">DIESEL</h6>
        <h6 class="col" style="text-indent: 100px">{deiselcogs}</h6>
      </div>
      <div class="d-flex justify-content-between">
        <h6><b>Total COGS</b></h6>
        <h6><b>{totalcogs}</b></h6>
      </div>
      
      <br/>
      <div class="d-flex justify-content-between">
        <h6><b>Grpss Profit</b></h6>
        <h6><b>{grossprofit}</b></h6>
      </div>
      <br/>

      <h4>Less: Selling and Administration Expenses </h4>
      <div class="row">
        <h6 class="col" style="text-indent: 20px">Sale Office Staff</h6>
        <h6 class="col" style="text-indent: 100px">{sofstaff}</h6>
      </div>

      <div class="row">
        <h6 class="col" style="text-indent: 20px">Gate Controller</h6>
        <h6 class="col" style="text-indent: 100px">{gatctrl}</h6>
      </div>
      <div class="d-flex justify-content-between">
        <h6 >Utility Expense</h6>
        <h6>{utilityexpense}</h6>
      </div>
      <div class="d-flex justify-content-between">
        <h6>Depreciation</h6>
        <h6>{depriciation}</h6>
      </div>
      <br/>
      <div class="d-flex justify-content-between">
        <h4><b>Net Income</b></h4>
        <h6><u><b>{netincome}</b></u></h6>
      </div>
    {/each}
    </div>
 
</div>

