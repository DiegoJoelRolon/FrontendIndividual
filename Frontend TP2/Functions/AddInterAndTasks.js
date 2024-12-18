import Project from "../src/ProjectApi.js";
import Users from "../src/UserApi.js";

const data = JSON.parse(localStorage.getItem('projectDetails'));

const addInteractionBtn = document.getElementById('addInteractionBtn');
const addTaskBtn = document.getElementById('addTaskBtn');
const modalForm = document.getElementById('modalForm');
const closeModalBtn = document.getElementById('closeModalBtn');
const submitModalBtn = document.getElementById('submitModalBtn');
const formModal = document.getElementById('formModal');
const modalTitle = document.getElementById('modalTitle');


const projectDetailsBtn = document.getElementById("projectDetailsBtn");
const projectModal = document.getElementById("projectModal");
const closeProjectModalBtn = document.getElementById("closeProjectModalBtn");
const projectModalContent = document.getElementById("projectModalContent");


projectDetailsBtn.addEventListener("click", () => {
  if (data) {
    projectModalContent.innerHTML = `
      <h2 class="text-xl font-semibold text-gray-800 mb-4">${data.data.name}</h2>
      <p class="text-gray-700"><strong>Name:</strong> ${data.data.client.name}</p>
      <p class="text-gray-700"><strong>Campaign Type:</strong> ${data.data.campaignType.name}</p>
      <p class="text-gray-700"><strong>Start:</strong> ${new Date(data.data.start).toLocaleDateString()}</p>
      <p class="text-gray-700"><strong>End:</strong> ${new Date(data.data.end).toLocaleDateString()}</p>
    `;
    projectModal.classList.remove("hidden");
  } else {
    alert("No project details found");
  }
});


closeProjectModalBtn.addEventListener("click", () => {
  projectModal.classList.add("hidden");
});

addInteractionBtn.addEventListener('click', () => {
  modalTitle.textContent = 'Add Interaction';
  formModal.innerHTML = `
    <label for="notes" class="block text-sm text-gray-600">Notes:</label>
    <textarea id="notes" class="w-full p-2 border border-gray-300 rounded-md" rows="4" required></textarea>

    <label for="interactionDate" class="block text-sm text-gray-600 mt-2">Date:</label>
    <input type="date" id="interactionDate" class="w-full p-2 border border-gray-300 rounded-md" required />

    <label for="interactionType" class="block text-sm text-gray-600 mt-2">Interaction Type:</label>
    <select id="interactionType" class="w-full p-2 border border-gray-300 rounded-md" required>
      <option value="1">Initial Meeting</option>
      <option value="2">Phone Call</option>
      <option value="3">Email</option>
      <option value="4">Presentation of Results</option>
    </select>
  `;
  modalForm.classList.remove('hidden');
});

addTaskBtn.addEventListener('click', async () => {
  modalTitle.textContent = 'Add Task';

  const users = await Users.Get();
  const userOptions = users.map(user => `<option value="${user.id}">${user.name}</option>`).join('');

  formModal.innerHTML = `
    <label for="taskName" class="block">Task Name:</label>
    <input type="text" id="taskName" class="w-full p-2 border border-gray-300 rounded-md" required />

    <label for="dueDate" class="block mt-2">Due Date:</label>
    <input type="date" id="dueDate" class="w-full p-2 border border-gray-300 rounded-md" required />

    <label for="taskStatus" class="block mt-2">Status:</label>
    <select id="taskStatus" class="w-full p-2 border border-gray-300 rounded-md" required>
      <option value="1">Pending</option>
      <option value="2">In Progress</option>
      <option value="3">Blocked</option>
      <option value="4">Completed</option>
      <option value="5">Cancelled</option>
    </select>

    <label for="user" class="block text-sm text-gray-600 mt-2">Assign to User:</label>
    <select id="user" class="w-full p-2 border border-gray-300 rounded-md" required>
      <option value="">Select User</option>
      ${userOptions}
    </select>
  `;
  
  modalForm.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modalForm.classList.add('hidden');
});

submitModalBtn.addEventListener('click', async (event) => {
  event.preventDefault();


  const requiredFields = formModal.querySelectorAll("[required]");
  let allValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add("border-red-500");
      allValid = false;
    } else {
      field.classList.remove("border-red-500");
    }
  });

  if (!allValid) {
    alert('Please fill all required fields.');
    return; 
  }

  const projectId = data.data.id;
  const taskId = submitModalBtn.dataset.taskId;
  console.log(taskId)

  if (modalTitle.textContent === 'Add Interaction') {
    const interactionData = {
      notes: document.getElementById('notes').value,
      date: new Date(document.getElementById('interactionDate').value).toISOString(),
      interactionType: parseInt(document.getElementById('interactionType').value),
    };

    await Project.PatchInteraction(projectId, interactionData);
    renderInteractions();
  } else if (modalTitle.textContent === 'Add Task' || modalTitle.textContent === 'Edit Task') {
    const taskData = {
      name: document.getElementById('taskName').value,
      dueDate: new Date(document.getElementById('dueDate').value).toISOString(),
      status: parseInt(document.getElementById('taskStatus').value),
      user: parseInt(document.getElementById('user').value),
    };

    if (taskId) {
      await Project.Put(taskId, taskData); 
    } else {
      await Project.PatchTask(projectId, taskData); 
    }

    renderTasks();
  }

  modalForm.classList.add('hidden');
  delete submitModalBtn.dataset.taskId;
});

const renderInteractions = async () => {
  const interactionsList = document.getElementById('interactionsList');
  interactionsList.innerHTML = '';

  const project = await Project.GetById(data.data.id);
  project.interactions.forEach(interaction => {
    const interactionElement = document.createElement('div');
    interactionElement.id="interactionCard"
    interactionElement.innerHTML = `
      <p><strong>Notes:</strong> ${interaction.notes}</p>
      <p><strong>Date:</strong> ${new Date(interaction.date).toLocaleDateString()}</p>
      <p><strong>Type:</strong> ${interaction.interactionType.name}</p>
    `;
    interactionsList.appendChild(interactionElement);
  });
};

const renderTasks = async (sortBy = 'dueDate') => {
  const tasksList = document.getElementById('tasksList');
  tasksList.innerHTML = '';


  const project = await Project.GetById(data.data.id);


  const sortedTasks = [...project.tasks].sort((a, b) => {
    if (sortBy === 'dueDate') {

      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'status') {

      return a.status.name.localeCompare(b.status.name);
    }
  });


  sortedTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.id="taskCard"
    taskElement.setAttribute('data-task-id', task.id);
    taskElement.innerHTML = `
      <p><strong>Name:</strong> ${task.name}</p>
      <p><strong>Due Date:</strong> ${new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Status:</strong> ${task.status.name}</p>
      <p><strong>User:</strong> ${task.userAssigned.name}</p>
    `;

    taskElement.addEventListener('click', () => openEditTaskModal(task));

    tasksList.appendChild(taskElement);
  });
};

const setupSorting = () => {
  const sortTasksSelect = document.getElementById('sortTasks');


  sortTasksSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    renderTasks(selectedOption);
  });
};

const openEditTaskModal = async (task) => {
  const users = await Users.Get();
  const userOptions = users.map(user => `<option value="${user.id}" ${user.id === task.userAssigned.id ? 'selected' : ''}>${user.name}</option>`).join('');

  modalTitle.textContent = 'Edit Task';
  submitModalBtn.dataset.taskId = task.id;

  formModal.innerHTML = `
    <label for="taskName" class="block">Task Name:</label>
    <input type="text" id="taskName" class="w-full p-2 border border-gray-300 rounded-md" value="${task.name}" required />

    <label for="dueDate" class="block text-sm text-gray-600 mt-2">Due Date:</label>
    <input type="date" id="dueDate" class="w-full p-2 border border-gray-300 rounded-md" value="${new Date(task.dueDate).toISOString().split('T')[0]}" required />

    <label for="taskStatus" class="block text-sm text-gray-600 mt-2">Status:</label>
    <select id="taskStatus" class="w-full p-2 border border-gray-300 rounded-md" required>
      <option value="1" ${task.status.id === 1 ? 'selected' : ''}>Pending</option>
      <option value="2" ${task.status.id === 2 ? 'selected' : ''}>In Progress</option>
      <option value="3" ${task.status.id === 3 ? 'selected' : ''}>Blocked</option>
      <option value="4" ${task.status.id === 4 ? 'selected' : ''}>Completed</option>
      <option value="5" ${task.status.id === 5 ? 'selected' : ''}>Cancelled</option>
    </select>

    <label for="user" class="block text-sm text-gray-600 mt-2">Assign to User:</label>
    <select id="user" class="w-full p-2 border border-gray-300 rounded-md" required>
      <option value="">Select User</option>
      ${userOptions}
    </select>
  `;

  modalForm.classList.remove('hidden');
};
setupSorting();
renderInteractions();
renderTasks();
