async function insertClient(clientdata) {

    let cd = JSON.stringify(clientdata);
    console.log(cd);
    const response = await fetch(`https://localhost:7030/api/v1/Client`, 
        {
            
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: "no-cors",
            body: cd
        });

}





  const Client ={
    Post : insertClient
  }

  
  export default Client;