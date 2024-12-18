import Client from '../src/ClientApi.js';
import CampaignType from '../src/CampaignTypeApi.js';
import Project from '../src/ProjectApi.js';

document.addEventListener('DOMContentLoaded', async function() {
    try {
        const clients = await Client.Get();
        const clientSelect = document.getElementById('clientId');
        if (clients && Array.isArray(clients)) {
            clients.forEach(client => {
                const option = document.createElement('option');
                option.value = client.id;
                option.textContent = client.name;
                clientSelect.appendChild(option);
            });
        }

        const campaigns = await CampaignType.Get();
        const campaignSelect = document.getElementById('campaignId');
        if (campaigns && Array.isArray(campaigns)) {
            campaigns.forEach(campaign => {
                const option = document.createElement('option');
                option.value = campaign.id;
                option.textContent = campaign.name;
                campaignSelect.appendChild(option);
            });
        }

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
});

document.getElementById('projectFormdata').addEventListener('submit', async function(event) {
    event.preventDefault();

    const projectFormdata = {
        name: document.getElementById('name').value,
        start: document.getElementById('inicio').value,
        end: document.getElementById('fin').value,
        client: parseInt(document.getElementById('clientId').value),
        campaignType: parseInt(document.getElementById('campaignId').value)
    };

    try {

        const project = await Project.Post(projectFormdata);


        localStorage.setItem('projectDetails', JSON.stringify(project));
        window.location.href = 'addInterandTasks.html'; 
    } catch (error) {

        console.error('Error:', error.message);
        alert(`Error creating project: ${error.message}`);
    }
});
