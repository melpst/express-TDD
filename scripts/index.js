window.onload = async ()=>{
    const userInfo = {
        username: 'sg',
        text: 'fuuuuuuuuuuuuuuuuuuuuuuuuuuu'
    }
    // fetch('/user', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     body: userInfo
    // })
    // .then((res) => {
    //     console.log(res.status)
    //     document.getElementById('title').innerHTML = res.body
    // })

    const res = await fetch('/user')
    const data = await res.json()
    document.getElementById('title').innerHTML = JSON.stringify(data)
    
}