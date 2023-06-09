export async function authenticate(token){
  if(token !== null) {
    const res = await fetch('http://localhost:5000/user/profile', {
      method: "GET",
      headers: {
        "x-auth-token": token
      }
    })

    const data = await res.json()
    const data2 = data.data
    const role = data2[0].role
    return role
  } else {
    window.location.href = "/"
    return {message: "You are not authenticated"}
  }
  
}

export default {
  authenticate
}
