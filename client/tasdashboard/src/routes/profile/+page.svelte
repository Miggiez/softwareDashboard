<script>
	import { onMount } from "svelte"

  // let data = []
  // onMount(async() => {
  //   data = await getGeneralJournal()
  // })
  let profile = {
    userid: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    address: "",
    phone: "",
    gender: ""
  }

  onMount(async() => {
    if(localStorage.getItem('token') !== null){
      await getProfile()
    } else {
      window.location.href = "/"
    }
  })
  
  const getProfile = async() => {
    const res = await fetch(`http://localhost:5000/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem('token')
      }
      
    })

    const data = await res.json()
    const data2 = data.data
    const user = data2[0]
    profile.firstname = user.firstname
    profile.lastname = user.lastname
    profile.email = user.email
    profile.userid = user.userid
    profile.role = user.role
    profile.address = user.address
    profile.phone = user.phonenumber
  }

  const logoutHandler = () => {
    localStorage.removeItem('token')
    window.location.href = '/';
  }
</script>

<style>
  .contbox {
    display: grid;
    grid-template-columns: 0.1fr 1fr 1fr;
    grid-template-rows: 0.3fr 0.3fr 0.3fr 0.3fr 0.3fr;
    grid-template-areas:
      "pic role ."
      ". name ."
      ". phone ."
      ". address logout";
    column-gap: 4rem;
    row-gap: 3rem;
  }

  #pic {
    grid-area: pic
  }
  #role {
    grid-area: role
  }
  #name {
    grid-area: name
  }
  #phone {
    grid-area: phone
  }
  #address {
    grid-area: address
  }
  #logout {
    grid-area: logout
  }

</style>

<div class="d-flex flex-column align-items-center">
  <h2 style="margin-bottom: 50px">Profile</h2>
  <div class="card">
    <div class="contbox">
      <div id="pic">
        
      </div>
      <div id="role" style="margin-top: 20px">
        <h2>{profile.role}</h2>
        
      </div>
      <div id="name">
        <h3>{profile.firstname} {profile.lastname}</h3>
        <h5>{profile.email}</h5>
      </div>
  
      <div id= "phone">
        <h5>Phone Number:</h5>
        <h3>{profile.phone}</h3>
      </div>
      <div id="address"> 
        <h5>Address:</h5>
        <h3>{profile.address}</h3>
      </div>
      <div id="logout">
        <button class="btn btn-outline-danger" on:click = {logoutHandler}>Logout</button>
      </div>
    </div>
  </div>
  
 
</div>

