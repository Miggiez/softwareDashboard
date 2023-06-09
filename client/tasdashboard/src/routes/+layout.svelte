<script>
  import { onMount } from 'svelte';
  import NavbarManagement from '$lib/NavbarManagement.svelte'
  import NavbarSalesOffice from '$lib/NavbarSalesOffice.svelte'
  import NavbarOperation from '$lib/NavbarOperation.svelte'
  import NavbarGuest from '$lib/NavbarGuest.svelte';

  let role
  let name

  onMount(async() => {
    if(localStorage.getItem('token') !== null){
      await getProfile()
    }
  })

  const getProfile = async() => {
    const res = await fetch('http://localhost:5000/user/profile', {
      method: "GET",
      headers: {
        "Content-Type": "application/user",
        "x-auth-token": localStorage.getItem('token')
      }
    })

    const data = await res.json();
    const user = data.data
    role = user[0].role
    name = user[0].firstname
    
  }
</script>

{#if role === "admin"}
  <NavbarManagement {name}/>
{:else if role === "operator"}
  <NavbarOperation {name}/>
{:else if role === "sales officer"}
  <NavbarSalesOffice {name}/>
{:else}
  <NavbarGuest {name}/>
{/if}

<slot/>