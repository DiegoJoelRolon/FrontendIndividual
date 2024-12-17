async function projects(data) {
  const url = "https://localhost:7030/api/v1/Project";
  try {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch {
    console.error("Error fetching data:", error);
  }
}

async function insertProject(data) {
  const url = "https://localhost:7030/api/v1/Project";
  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch {
    console.error("Error fetching data:", error);
  }
}

async function getProjecById(Id) {
  try {
    const response = await fetch('https://localhost:7030/api/v1/Project/${Id}');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch {
    console.error("Error fetching data:", error);
  }
}

const Project={
  Get : projects,
  Post: insertProject,
  GetById: getProjecById
}

export default Project;
