document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    try {
        const response = await fetch(`https://localhost:7030/api/v1/Project/${id}`);
        const data = await response.json();
        console.log(data); // Para verificar la estructura de los datos

        const detalleDiv = document.getElementById('projectDetail');
        detalleDiv.innerHTML = `
            <div class="h-full flex flex-col min-h-screen">
                <section class="w-full h-full grid grid-cols-1">
                    <div class="cardContainer block max-w max-h">
                        <a href="#" class="grid justify-items-center max-w p-6 m-2 bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                ${data.data.name}
                            </h5>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.start}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.end}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.client.name}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.client.email}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.client.phone}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.client.company}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.client.address}
                            </h3>
                            <h3 class="font-normal text-gray-700 dark:text-gray-400">
                                ${data.data.campaignType.name}
                            </h3>
                        </a>
                    </div>
                    <div class="flex justify-center">
                        <button id="addInteractionBtn" class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Agregar Interaction</button>
                        <button id="addTaskBtn" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">Agregar Tarea</button>
                    </div>
                    
                </section>
            </div>

            <!-- Modal -->
            <div id="interactionModal" class="modal hidden">
                <div class="modal-content ">
                    <span class="close-btn">&times;</span>
                    <h2>Agregar Interaction</h2>
                    <form class="inline-grid" id="interactionForm">
                    
                        <label for="notes">Notas:</label>

                        <textarea id="notes" name="notes" rows="4" cols="50" required></textarea>
                        <div  class="my-5">
                            <label for="date">Fecha:</label>
                            <input type="datetime-local" id="date" required>
                        </div>

                        <div class="my-5">
                            <label for="interactionType">Tipo de Interacción:</label>
                                <select id="interactionType" required>
                                    <option value="1">Tipo 1</option>
                                    <option value="2">Tipo 2</option>
                                    <option value="3">Tipo 3</option>
                                    <option value="4">Tipo 4</option>
                                </select>
                        </div>
                        
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">Agregar</button>
                    </form>
                </div>
            </div>

            <!-- Modal -->
            <div id="taskModal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-btn-task">&times;</span>
                    <h2>Agregar Tarea</h2>
                    <form class="inline-grid"id="taskForm">
                        <div class="my-5">
                            <label for="name">Nombre:</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="my-5">
                            <label for="date">Fecha:</label>
                            <input type="datetime-local" id="duedate" required>
                        </div>
                        <div class="my-5">
                            <label for="taskStatus">Tipo de status:</label>
                            <select id="status" required>
                                <option value="1">Tipo 1</option>
                                <option value="2">Tipo 2</option>
                                <option value="3">Tipo 3</option>
                                <option value="4">Tipo 4</option>
                                <option value="5">Tipo 5</option>
                            </select>
                        </div>
                        <div class="my-5">
                            <label for="user">Usuario:</label>
                            <select id="user" required>
                            
                            </select>
                        
                        </div>

                        
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">Agregar</button>
                    </form>
                </div>
            </div>
        `;
        
        // Cargar usuarios y llenar el select
        const userResponse = await fetch('https://localhost:7030/api/v1/Client'); 
        const users = await userResponse.json();

        const userSelect = document.getElementById('user');
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id; // Asumiendo que el objeto usuario tiene una propiedad "id"
            option.textContent = user.name; // Asumiendo que el objeto usuario tiene una propiedad "name"
            userSelect.appendChild(option);
        });

        // MODAL Interaction
        document.getElementById('addInteractionBtn').addEventListener('click', () => {
            document.getElementById('interactionModal').classList.remove('hidden');
        });

        // Cerrar el modal
        document.querySelector('.close-btn').addEventListener('click', () => {
            document.getElementById('interactionModal').classList.add('hidden');
        });

        // Manejar el envío del formulario
        document.getElementById('interactionForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const interactionData = {
                notes: document.getElementById('notes').value,
                date: new Date(document.getElementById('date').value).toISOString(),
                interactionType: parseInt(document.getElementById('interactionType').value)
            };
            console.log(interactionData);
            try {
                const addResponse = await fetch(`https://localhost:7030/api/v1/Project/${id}/Interactions`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(interactionData)
                });

                if (addResponse.ok) {
                    const result = await addResponse.json();
                    console.log('Interaction añadida:', result);
                    alert('Interaction añadida con éxito');
                    document.getElementById('interactionModal').classList.add('hidden'); // Cerrar el modal
                } else {
                    throw new Error('Error al agregar la interaction');
                }
            } catch (error) {
                console.error('Error al agregar la interaction:', error);
                alert('Error al agregar la interaction');
            }
        });

        // MODAL Task
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            document.getElementById('taskModal').classList.remove('hidden');
        });

        // Cerrar el modal
        document.querySelector('.close-btn-task').addEventListener('click', () => {
            document.getElementById('taskModal').classList.add('hidden');
        });

        // Manejar el envío del formulario
        document.getElementById('taskForm').addEventListener('submit', async (event) => {
            event.preventDefault();

            const taskData = {
                name: document.getElementById('name').value,
                dueDate: new Date(document.getElementById('duedate').value).toISOString(),
                status: parseInt(document.getElementById('status').value),
                user: parseInt(document.getElementById('user').value)
            };
            console.log(taskData);
            try {
                const addResponse = await fetch(`https://localhost:7030/api/v1/Project/${id}/tasks`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(taskData)
                });

                if (addResponse.ok) {
                    const result = await addResponse.json();
                    console.log('Tarea añadida:', result);
                    alert('Tarea añadida con éxito');
                    document.getElementById('taskModal').classList.add('hidden'); // Cerrar el modal
                } else {
                    throw new Error('Error al agregar la tarea');
                }
            } catch (error) {
                console.error('Error al agregar la tarea:', error);
                alert('Error al agregar la tarea');
            }
        });

    } catch (error) {
        console.error('Error al obtener los detalles:', error);
    }
});
