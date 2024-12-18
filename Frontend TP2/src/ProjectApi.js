import urls from "../src/ApiUrls.js";

async function projects(data) {
  const params = new URLSearchParams();

  if (data.name) params.append('name', data.name);
  if (data.campaign) params.append('campaign', data.campaign);
  if (data.client) params.append('client', data.client);
  if (data.offset) params.append('offset', data.offset);
  if (data.size) params.append('size', data.size);
  const url = urls.getProjects(params.toString());

  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const datareturned = await response.json();
    return datareturned;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
async function AddInteraction(Id, data) {
  const url = urls.addInteraction(Id);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      mode: "cors",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    const dataReturned = await response.json();
    return dataReturned;
  } catch (error) {
    console.log("Error:", error.message);
    throw error; 
  }
}
async function AddTask(Id, data) {
  const url = urls.addTask(Id);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      mode: "cors",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }
    const datareturned = await response.json();
    return datareturned;
  } 
  catch {
    console.log("Error:", error.message);
    throw error; 
  }
}

async function insertProject(data) {
  const url = urls.insertProject;
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const dataReturned = await response.json();
    return dataReturned;

  } catch (error) {
    console.log("Error:", error.message);
    throw error;
  }
}

async function getProjecById(Id) {
  const url = urls.getProjectById(Id);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const datareturned = await response.json();
    return datareturned;
  } catch {
    console.error("Error fetching data:", error);
  }
}

async function updateTask(Id, data) {
  const url = `https://localhost:7030/api/v1/Tasks/${Id}`
  console.log(data);
  try {
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    const dataReturned = await response.json();
    return dataReturned;
  } catch {
    console.log("Error:", error.message);
    throw error; 
  }
}

const Project = {
  Get: projects,
  Post: insertProject,
  GetById: getProjecById,
  PatchInteraction: AddInteraction,
  PatchTask: AddTask,
  Put: updateTask,
};

export default Project;
