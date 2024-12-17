document.getElementById('projectFormdata').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener datos del formulario
    const projectFormdata = {
        name: document.getElementById('name').value,
        start: "2024-10-12T19:22:05.085Z",
        end: "2024-11-12T19:22:05.085Z",
        client: parseInt(document.getElementById('clientId').value),
        campaignType: parseInt( document.getElementById('campaignId').value)

    };

    console.log(projectFormdata);

        // Realizar el POST request
    fetch('https://localhost:7030/api/v1/Project', {
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectFormdata)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
        console.log('Éxito:', data);
        // Aquí puedes agregar lógica para manejar la respuesta del servidor
    })
    .catch((error) => {
        console.error('Error:', error);
    });

});    