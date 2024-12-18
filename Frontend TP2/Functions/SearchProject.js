import Project from "../src/ProjectApi.js";
import Client from "../src/ClientApi.js";
import  CampaignType from "../src/CampaignTypeApi.js"

document.getElementById('Navbar').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const name = document.getElementById('navName').value;
  const campaign = document.getElementById('campaign').value;
  const client = document.getElementById('client').value;

  console.log(client);


  let url = new URL('index.html', window.location.origin);
  const params = new URLSearchParams();
  
  if (name) params.append('name', name);
  if (campaign) params.append('campaign', campaign);
  if (client) params.append('client', client);
  

  url.search = params.toString();
  

  window.location.href = url;
});


async function populateCampaignDropdown() {
  const campaignSelect = document.getElementById("campaign");
    const campaigns = await CampaignType.Get();

    campaignSelect.innerHTML = '<option value="">Select Campaign</option>';


    campaigns.forEach(campaign => {

      const option = document.createElement("option");
      option.value = campaign.id; 
      option.textContent = campaign.name;
      campaignSelect.appendChild(option);
    });

}


document.addEventListener("DOMContentLoaded", populateCampaignDropdown);


document.getElementById('Navbar').addEventListener('submit', async function(event) {
  event.preventDefault();
  const name = document.getElementById('navName').value;
  const campaign = document.getElementById('campaign').value;
  const client = document.getElementById('client').value;

  console.log(client, campaign); 

  let url = new URL('index.html', window.location.origin);
  const params = new URLSearchParams();
  
  if (name) params.append('name', name);
  if (campaign) params.append('campaign', campaign);
  if (client) params.append('client', client);
  

  url.search = params.toString();
  

  window.location.href = url;
});


async function populateClientDropdown() {
  const clientSelect = document.getElementById("client");
  
  try {
    const clients = await Client.Get();
    console.log(clients)
    clientSelect.innerHTML = '<option value="">Select Client</option>';
    clients.forEach(client => {
      const option = document.createElement("option");
      option.value = client.id; 
      option.textContent = client.name;
      clientSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
  }
}


document.addEventListener("DOMContentLoaded", populateClientDropdown);


