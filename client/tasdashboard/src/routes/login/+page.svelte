<script>
	import { onMount } from "svelte"

  let user = {
    email: "",
    password: ""
  }
  onMount(() => {
    if(localStorage.getItem('token') !== null){
      window.location.href="/"
    }
  })

  const loginHandler = async() => {
    const res = await fetch(`http://localhost:5000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: user.email, password: user.password})
    })
    const data = await res.json()
    console.log(data)
    if(res.ok){
      localStorage.setItem("token", data.token)
      window.location.href = '/';
    } else {
      console.log("Bad Response")
    }
  }
</script>


<div class="d-flex flex-column align-items-center">
  <h2>Login</h2>
  <div style="margin-bottom: 20px">
    <form class="mt-2" on:submit={loginHandler}>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="Email" aria-label="Search" bind:value={user.email}/>
      <input class="form-control me-2" style="margin-bottom: 20px;" type="search" placeholder="Password" aria-label="Search" bind:value={user.password}/>
      <button class="btn btn-outline-success" type="submit">Login</button>
    </form>
  </div>
</div>

