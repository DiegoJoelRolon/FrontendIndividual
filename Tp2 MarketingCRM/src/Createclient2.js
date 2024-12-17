document.getElementById('formdata').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    // Obtener datos del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };

    // Realizar el POST request
    fetch('https://localhost:7030/api/v1/Client', {
        method: 'POST',
        headers: 
        {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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