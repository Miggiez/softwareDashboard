<script>
  export let name
</script>


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Management Dashboard</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link " href="/management" tabindex="-1">Management</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Financial Report
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="/generaljournal">General Journal</a></li>
            <li><a class="dropdown-item" href="/generalledger">General Ledger</a></li>
            <li><a class="dropdown-item" href="/incomestatement">Income Statement</a></li>
            <li><a class="dropdown-item" href="/inventory">Inventory</a></li>
            <li><a class="dropdown-item" href="/invoice">Invoice</a></li>
            <li><a class="dropdown-item" href="/purchaseorder">Purchase Order</a></li>
          </ul>
        </li>
        <li class="nav-item">
        
        <li class="nav-item">
          <a class="nav-link " href="/operation" tabindex="-1">Operation</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/createuser" tabindex="-1">Create User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/tracking" tabindex="-1">Truck Tracking</a>
        </li>
      </ul>
      <span>
        <a class="nav-link" style="color: black" href="/profile">
          {name}
        </a>
      </span>
      
    </div>
  </div>
</nav>