import Client from '../src/ClientApi.js';

document.getElementById('clientForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const clientData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
    };

    try {
        console.log(clientData);
        const response = await Client.Post(clientData);


        const { id, name, email, company, phone, address } = response;

        showSuccessModal({ id, name, email, company, phone, address });
    } catch (error) {
        console.error('Error:', error.message);
        alert(`Error creating project: ${error.message}`);
    }
});

function showSuccessModal(clientInfo) {

    const clientInfoContainer = document.getElementById('clientInfo');
    clientInfoContainer.innerHTML = `
        <p><strong>Name:</strong> ${clientInfo.name}</p>
        <p><strong>Email:</strong> ${clientInfo.email}</p>
        <p><strong>Company:</strong> ${clientInfo.company}</p>
        <p><strong>Phone:</strong> ${clientInfo.phone}</p>
        <p><strong>Address:</strong> ${clientInfo.address}</p>
    `;


    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');

   
    document.getElementById('okButton').addEventListener('click', () => {
        location.reload(); 
    });
}
