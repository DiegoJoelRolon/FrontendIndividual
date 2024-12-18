const API_BASE_URL = "https://localhost:7030/api/v1";

const urls = {
    getProjects: (params) => `${API_BASE_URL}/Project?${params}`,
    getProjectById: (id) => `${API_BASE_URL}/Project/${id}`,
    addInteraction: (id) => `${API_BASE_URL}/Project/${id}/Interactions`,
    addTask: (id) => `${API_BASE_URL}/Project/${id}/tasks`,
    insertProject: `${API_BASE_URL}/Project`,
    updateTask: (id) => `${API_BASE_URL}Tasks/${id}`,

    getCampaignType: `${API_BASE_URL}/CampaignType`,
    client: `${API_BASE_URL}/Client`,

    getInteractionType: `${API_BASE_URL}/InteractionType`,
    getTaskStatus: `${API_BASE_URL}/TaskStatus`,
    getUser: `${API_BASE_URL}/User`,
};

export default urls;
