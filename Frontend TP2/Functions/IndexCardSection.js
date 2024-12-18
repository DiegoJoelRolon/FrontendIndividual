import Project from "../src/ProjectApi.js";

let currentPage = 1;
const projectsPerPage = 8;

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const campaign = params.get('campaign') || '';
    const client = params.get('client') || '';
    

    await fillIndexCardSection(name, campaign, client);
    await updatePaginationButtons(name, campaign, client); 
});

async function fillIndexCardSection(name, campaign, client) {
    const offset = (currentPage - 1) * projectsPerPage;
    const projectData = await Project.Get({
        name: name,
        campaign: campaign,
        client: client,
        offset: offset,
        size: projectsPerPage
    });

    if (projectData && Array.isArray(projectData)) {
        const indexCardSection = document.getElementById('indexCardSection');
        indexCardSection.innerHTML = ''; 

        projectData.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.id = 'projectCard'; 

            const link = document.createElement('a');
            link.href = 'addInterandTasks.html';
            link.classList.add('block');
            link.addEventListener('click', () => {
                localStorage.setItem('projectDetails', JSON.stringify({ data: project }));
            });

            const projectTitle = document.createElement('h3');
            projectTitle.classList.add('text-xl');
            projectTitle.textContent = project.name;

            const projectClient = document.createElement('p');
            projectClient.textContent = `Client: ${project.client.name}`;
            const projectCampaign = document.createElement('p');
            projectCampaign.textContent = `Campaign: ${project.campaignType.name}`;
            const projectDates = document.createElement('p');
            projectDates.textContent = `Start: ${new Date(project.start).toLocaleDateString()} - End: ${new Date(project.end).toLocaleDateString()}`;
            const projectEmail = document.createElement('p');
            projectEmail.textContent = `Email: ${project.client.email}`;
            const projectCompany = document.createElement('p');
            projectCompany.textContent = `Company: ${project.client.company}`;
            const projectPhone = document.createElement('p');
            projectPhone.textContent = `Phone: ${project.client.phone}`;
            const projectAddress = document.createElement('p');
            projectAddress.textContent = `Address: ${project.client.address}`;

            projectCard.appendChild(projectTitle);
            projectCard.appendChild(projectClient);
            projectCard.appendChild(projectCampaign);
            projectCard.appendChild(projectDates);
            projectCard.appendChild(projectEmail);
            projectCard.appendChild(projectCompany);
            projectCard.appendChild(projectPhone);
            projectCard.appendChild(projectAddress);

            link.appendChild(projectCard);
            indexCardSection.appendChild(link);
        });
    } else {
        console.error('No se pudieron obtener proyectos o no son un arreglo.');
    }
}

async function updatePaginationButtons(name, campaign, client) {
    const projectData = await Project.Get({
        name: name,
        campaign: campaign,
        client: client,
        offset: 0,
        size: 10000 
    });

    const totalProjects = projectData.length; 

    const prevButton = document.getElementById('prevPageBtn');
    const nextButton = document.getElementById('nextPageBtn');


    if (currentPage === 1) {
        prevButton.disabled = true;
        prevButton.classList.add('opacity-50', 'cursor-not-allowed');  
    } else {
        prevButton.disabled = false;
        prevButton.classList.remove('opacity-50', 'cursor-not-allowed');  
    }

    if (currentPage * projectsPerPage >= totalProjects) {
        nextButton.disabled = true;
        nextButton.classList.add('opacity-50', 'cursor-not-allowed');  
    } else {
        nextButton.disabled = false;
        nextButton.classList.remove('opacity-50', 'cursor-not-allowed');  
    }
}

document.getElementById('nextPageBtn').addEventListener('click', async () => {
    currentPage++;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const campaign = params.get('campaign') || '';
    const client = params.get('client') || '';
    await fillIndexCardSection(name, campaign, client);
    await updatePaginationButtons(name, campaign, client); 
});

document.getElementById('prevPageBtn').addEventListener('click', async () => {
    currentPage--;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const campaign = params.get('campaign') || '';
    const client = params.get('client') || '';
    await fillIndexCardSection(name, campaign, client); 
    await updatePaginationButtons(name, campaign, client); 
});

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const campaign = params.get('campaign') || '';
    const client = params.get('client') || '';
    await fillIndexCardSection(name, campaign, client); 
    await updatePaginationButtons(name, campaign, client); 
});
