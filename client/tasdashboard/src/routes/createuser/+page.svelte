<script>
	import { authenticate } from "$lib/auth"
	import { onMount } from "svelte"

  let user = {
    userid: "", 
    firstname: "", 
    lastname: "",
    email:"",
    password: "",
    role: "", 
    address: "",
    phonenumber: ""
  }
  let repassword = ""
  let message = ""
  onMount(async() => {
    const role = await authenticate(localStorage.getItem('token'))
    if(role !== "admin"){
      message = "You are not authenticated"
      window.location.href = "/"
    }
  })

  const createUserHandler= async() => {
    if(user.password == repassword){
      const res = await fetch(`http://localhost:5000/user/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()
      message = data.error
      user = {
        userid: "", 
        firstname: "", 
        lastname: "",
        email:"",
        password: "",
        role: "", 
        address: "",
        phonenumber: ""
      }
      repassword = ""
    } else {
      message = "Your password and re-password does not match" 
    }
    
  }
</script>


<div class="d-flex flex-column align-items-center">
  <h2>Register Employee</h2>
  <div style="margin-bottom: 20px">
    <form class="mt-2" on:submit={createUserHandler}>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="First Name" aria-label="Search" bind:value={user.firstname}/>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="Last Name" aria-label="Search" bind:value={user.lastname}/>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="Email" aria-label="Search" bind:value={user.email}/>

      <div class="d-flex" style="margin-bottom: 20px">
        <input type="text" class="form-control" placeholder="Role" aria-label="Text input with dropdown button" bind:value={user.role} disabled/>
        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><button type="button" class="dropdown-item" on:click={() => user.role = "admin"}>admin</button></li>
          <li><button type="button" class="dropdown-item" on:click={() => user.role = "sales officer"}>sales officer </button></li>
          <li><button type="button" class="dropdown-item" on:click={() => user.role = "operator"}>operator</button></li>
        </ul>
      </div>
      
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="Address" aria-label="Search" bind:value={user.address}/>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="Phone Number" aria-label="Search" bind:value={user.phonenumber}/>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="password" placeholder="Password" aria-label="Search" bind:value={user.password}/>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="password" placeholder="Re-Password" aria-label="Search" bind:value={repassword}/>
      <button class="btn btn-outline-success" type="submit">Register</button>
    </form>
  </div>
</div>

