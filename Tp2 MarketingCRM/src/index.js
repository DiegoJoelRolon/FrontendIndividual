document.addEventListener('DOMContentLoaded', async() => {
  await fetch("https://localhost:7030/api/v1/Project")
      .then(response => response.json())
      .then(data => {
          const cardContainer = document.getElementById('cardContainer');
          data.slice(0, 5).forEach(post => { // Mostrar solo los primeros 5 posts
              const card = document.createElement('div');
              card.classList.add('card');
              card.setAttribute('data-id', post.id);
              card.innerHTML = `
                <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" >
                    <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white align"
                    >
                        ${post.name}
                        
                    </h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.start}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.end}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.client.name}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.client.email}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.client.company}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.client.phone}
                        
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${post.client.address}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        CampaignType: ${post.campaignType.name}
                    </p>
                </div>
                  
              `;
              card.addEventListener('click', () => {
                  window.location.href = `projectDetail.html?id=${post.id}`;
              });
              cardContainer.appendChild(card);
          });
      })
      .catch(error => console.error('Error al obtener los datos:', error));
});

