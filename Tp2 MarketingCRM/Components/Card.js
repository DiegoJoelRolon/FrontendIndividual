export default function card(cardData) {
  return `

            
            <div
              href="#"
              class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <div>
                    <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white align"
                    >
                        ${cardData.name}
                        
                    </h5>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.start}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.end}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.client.name}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.client.email}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.client.company}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.client.phone}
                        
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        ${cardData.client.address}
                    </p>
                    <p class="font-normal text-gray-700 dark:text-gray-400">
                        CampaignType: ${cardData.campaignType.name}
                    </p>
                </div>
                
            </div>

    
    `;
}
