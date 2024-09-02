// api.js

import { ContactlessOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import { baseURL } from "src/utils/baseURL";

export const Login = async (email, password) => {
  const apiUrl = "/pub/login";

  const requestData = {
    email: email,
    password: password,
  };
  console.log("requestData", requestData);
  try {
    const res = await fetch(baseURL + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        error: false,
        status: 200,
        data: data,
      };
    } else {
      const data = await res.json();
      return {
        error: true,
        status: 200,
        data: data,
      };
    }
  } catch (error) {
    return {
      error: true,
      status: 400,
      data: error,
    };
  }
};

export const sendEmail = async (data) => {
  const apiUrl = "/pub/sendEmail";

  try {
    const res = await fetch(baseURL + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resp = await res.json();
  } catch (error) {
    return {
      error: true,
      status: 400,
      data: error,
    };
  }
};

export const handleDeleteCompany = async (questionId, token) => {
  const apiUrl = "/api/admin/deleteCompany";
  const requestData = {
    questionId: questionId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
};

//delete question based on company id
export const deleteDynamicQuestion = async (questionId, companyId, token) => {
  const apiUrl = "/api/companyAdmin/deleteDynamicQuestion";
  const requestData = {
    questionId: questionId,
    companyId: companyId, // Include company ID
  };
  console.log("requestData", token);
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(requestData),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
};


export const UpdateCompany = async (data, token) => {
  const apiUrl = "/api/admin/updateCompany";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const GetAllCompanies = async (token) => {
  const apiUrl = "/api/admin/allCompanies";

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
  });
  return res.json();
};

export const inviteBulkUsers = async (token, usersData) => {
  const apiUrl = "/api/inviteUsersCSV";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const data = { users: usersData, companyId: currentUser.company.id };

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// create company policy
export const createCompanyPolicy = async (data, token) => {
  const apiUrl = "/api/companyAdmin/createCompanyPolicy";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//createUserAttemptQuestionnaire
export const createUserAttemptQuestionnaire = async (companyId, userId, questionnaireId, token, questionnareData) => {
  const apiUrl = "/api/createUserAttemptQuestionnaire";
  const data = {
    companyId: companyId,
    userId: userId,
    questionnaireId: questionnaireId,
    questionnareData: questionnareData,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAllCompanyPolicies = async (token, companyId) => {
  const apiUrl = "/api/companyAdmin/allCompanyPolicy";
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const UpdatePolicy = async (data, token) => {
  const apiUrl = "/api/companyAdmin/updateCompanyPolicy";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const handleDeleteCompanyPolicy = async (companyId, token) => {
  const apiUrl = "/api/companyAdmin/deleteCompanyPolicy";

  const requestData = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
};

//
export const getAllCompanyUser = async (token, companyId, superAdmin) => {
  const apiUrl = `/api/${superAdmin ? 'admin' : 'companyAdmin'}/getAllUserByCompanyId`;
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//get all user daily question
export const getAllDailyQuestions = async (token, companyId) => {
  const apiUrl = "/api/companyAdmin/getAllDailyQuestionsByCompanyId";
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log("api/index file", res);
  return res.json();
};

export const getUserStartUpQuestions = async (token, companyId, userId) => {
  const apiUrl = "/api/getAllStartUpQuestionsByCompanyIdAndUserId";
  const data = {
    companyId: companyId,
    userId: userId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  console.log("api/index file", res);
  return res.json();
};

export const getCompanyData = async (token, companyId) => {
  const apiUrl = `/api/admin/company`;
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const getAllAdmins = async (token) => {
  const apiUrl = "/api/companyAdmin/getAllAdmins";
  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
  });
  return res.json();
};

export const UpdateCompanyUser = async (data, token, superAdmin) => {
  const apiUrl = `/api/${superAdmin ? 'admin' : 'companyAdmin'}/updateUser`;

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
export const updateUserQuestionnaire = async (data, token) => {
  const apiUrl = "/api/updateUserQuestionnaire";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//updateStartUpQuestions
export const updateStartUpQuestions = async (data, token) => {
  const apiUrl = "/api/updateStartUpQuestions";
  console.log("updated startup data", data);

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateUserGamification = async (data, token) => {
  const apiUrl = "/api/updateUserGamification";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

// department management
export const createDepartment = async (data, token) => {
  const apiUrl = "/api/createDepartment";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//create questions on daily basis
export const createDailyQuestions = async (data, token) => {
  const apiUrl = "/api/createDailyQuestions";
  console.log("token:", token);
  // const data1 = {
  //   anxietyLevel:data.anxietyLevel,
  //   feeling: data.feeling,
  //   reason: data.reason,
  //   symptom: data.symptom
  // };
  try {
    const res = await fetch(baseURL + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": `${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log("res", res);
    // if (!res.ok) {
    //   throw new Error(`HTTP error! status: ${res.status}`);
    // }

    return res.json();
  } catch (error) {
    console.error("Error in API call:", error); // Debugging line
    throw error;
  }
};

//create startup questions
export const createStartUpQuestions = async (data, token) => {
  const apiUrl = "/api/createStartUpQuestions";

  console.log("Data being sent to API:", data);

  const convertedData = {
    userId: data.userId,
    companyId: data.companyId,
    authorName: data.authorName,
    bookTitle: data.bookTitle,
    contentPreferences: data.contentPreferences,
    engagementMethod: data.engagementMethod,
    hobbies: data.hobbies,
    interestTopics: data.interestTopics,
    lifePrincipleInspirations: data.lifePrincipleInspirations,
    personalityType: data.personalityType,
    readingPreference: data.readingPreference,
    relaxationActivities: data.relaxationActivities,
  };

  try {
    const res = await fetch(baseURL + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": `${token}`,
      },
      body: JSON.stringify(convertedData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error in API call:", error);
    throw error;
  }
};


export const getFunctionDepartments = async (token, functionId) => {
  const apiUrl = "/api/getFunctionDepartments";
  const data = {
    functionId: functionId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const deleteDepartment = async (departmentId, token) => {
  const apiUrl = "/api/deleteDepartment";

  const requestData = {
    id: departmentId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
}

export const updateDepartment = async (data, token) => {
  const apiUrl = "/api/updateDepartment";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// function management
export const createFunction = async (data, token) => {
  const apiUrl = "/api/createFunction";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCompanyFunctions = async (token, companyId) => {
  const apiUrl = "/api/getCompanyFunctions";
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const deleteFunction = async (functionId, token) => {
  const apiUrl = "/api/deleteFunction";

  const requestData = {
    id: functionId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
}

export const updateFunction = async (data, token) => {
  const apiUrl = "/api/updateFunction";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const createTeam = async (data, token) => {
  const apiUrl = "/api/createTeam";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const getDepartmentTeams = async (token, departmentId) => {
  const apiUrl = "/api/getDepartmentTeams";
  const data = {
    departmentId: departmentId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const updateTeam = async (data, token) => {
  const apiUrl = "/api/updateTeam";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const deleteTeam = async (teamId, token) => {
  const apiUrl = "/api/deleteTeam";

  const requestData = {
    id: teamId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
}

export const getTeamMembers = async (token, teamId) => {
  const apiUrl = "/api/getTeamMembers";
  const data = {
    teamId: teamId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export const handleDeleteCompanyUser = async (userId, token) => {
  const apiUrl = "/api/companyAdmin/deleteUserById";

  const requestData = {
    id: userId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
};

export const getUserCompanyPolicy = async (token, companyId) => {
  const apiUrl = "/api/getCompanyPolicy";
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateUserPoints = async (point, userId, policyId, token) => {
  const apiUrl = "/api/updateUserPoints";
  const data = {
    userPolicyId: policyId,
    userRewards: point,
    userId: userId,
  };

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getUserProfile = async (userId, token) => {
  const apiUrl = "/api/getUserProfile";
  const data = {
    userId: userId,
  };

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//getUserByCompany
export const getUserByCompany = async (userId, token) => {
  const apiUrl = "/api/companyAdmin/getUserProfile";
  const data = {
    userId: userId,
  };

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createCompanyQuestion = async (data, token) => {
  const apiUrl = "/api/createQuestions";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//createDynamicQuestion
export const createDynamicQuestion = async (data, token) => {
  const apiUrl = "/api/companyAdmin/createDynamicQuestion";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createCompanyGamification = async (data, token) => {
  const apiUrl = "/api/createGamifications";

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCompanyQuestions = async (token, companyId) => {
  const apiUrl = "/api/getCompanyQuestions";
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCompanyGamifications = async (token, companyId) => {
  const apiUrl = "/api/getGamifications";
  const data = {
    companyId: companyId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const CreateThread = async (data) => {
  const apiUrl = "/pub/createComment";

  try {
    const res = await fetch(baseURL + apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        error: false,
        status: 200,
        data: data,
      };
    } else {
      const data = await res.json();
      return {
        error: true,
        status: 200,
        data: data,
      };
    }
  } catch (error) {
    return {
      error: true,
      status: 400,
      data: error,
    };
  }
};

export const getSellingItems = async (category = '') => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = category ? 
    `/api/getSellingItems/${currentUser.company.id}?category=${category}` :
    `/api/getSellingItems/${currentUser.company.id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  return res.json();
};

export const GetCompaniesAllThread = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/pub/getAllThreadMessage/${currentUser.company.id}`;


  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },

  });
  return res.json();
};

export const deleteQuestion = async (questionId) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = "/api/deleteCompanyQuestion";

  const requestData = {
    questionId: questionId,
  };
  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
};

export const getConversations = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/getConversations/${currentUser.user.id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  return res.json();
};

export const getConversationMessages = async (id) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/getConversationMessages?conversationId=${id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  return res.json();
};

export const postMessage = async (data) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/postMessage`;

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createConversation = async (data) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/createConversation`;

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const addQuestionCategory = async (name) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/addQuestionCategory`;
  const data = { name: name, companyId: currentUser.company.id }

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//create questionnaire with title and description and isReady
export const createQuestionnaire = async (title, description, isReady) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/companyAdmin/createQuestionnaire`;
  const data = { 
    questionnaireTitle: title, 
    questionnaireDescription: description, 
    isReady: Boolean(isReady), 
    companyId: currentUser.company.id,
    isLive: false,
  };

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to add questionnaire');
  }
  return res.json();
};


export const getQuestionCategories = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/getQuestionCategories/${currentUser.company.id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  return res.json();
};

//getQuestionnaire 
export const getQuestionnaire = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/companyAdmin/getQuestionnaire/${currentUser.company.id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  console.log("res getQuestionnaire", res);
  return res.json();
};

//getUserQuestionnaire
export const getUserQuestionnaire = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/getUserQuestionnaire/${currentUser.company.id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  console.log("res getQuestionnaire", res);
  return res.json();
};

//getUserAttemptedQuestionnaire
export const getUserAttemptedQuestionnaire = async () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/getUserAttemptedQuestionnaire/${currentUser.company.id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  console.log("res getQuestionnaire", res);
  return res.json();
};
//getUserAttemptedQuestionnaireToAdmin
// export const getUserAttemptedQuestionnaireToAdmin = async (questionnaireId, companyId) => {
//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//   console.log("getUserAttemptedQuestionnaireToAdmin->", questionnaireId, companyId);
//   const apiUrl = `/api/companyAdmin/getUserAttemptedQuestionnaireToAdmin`;
//   const data = {questionnaireId: questionnaireId, companyId: companyId }
//   const res = await fetch(baseURL + apiUrl, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "x-token": `${currentUser.token}`,
//     },
//     body:JSON.stringify(data),
//   });
//   return res.json();
// };
export const getUserAttemptedQuestionnaireToAdmin = async (questionnaireId, companyId) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("getUserAttemptedQuestionnaireToAdmin->", questionnaireId, companyId);

  // Construct the query string
  const queryParams = new URLSearchParams({ questionnaireId, companyId }).toString();
  const apiUrl = `/api/companyAdmin/getUserAttemptedQuestionnaireToAdmin?${queryParams}`;

  // Fetch data using GET method without a body
  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  return res.json();
};


//fetchDynamicQuestions
export const getDynamicQuestions = async (questionnaireId, companyId) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/companyAdmin/getDynamicQuestions/${questionnaireId}?companyId=${companyId}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  console.log("res getDynamicQuestions", res);
  return res.json();
};
//getUserDynamicQuestions
export const getUserDynamicQuestions = async (questionnaireId, companyId) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/getUserDynamicQuestions/${questionnaireId}?companyId=${companyId}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });
  console.log("res getUserDynamicQuestions", res);
  return res.json();
};

export const deleteQuestionCategory = async (id) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/deleteQuestionCategory/${id}`;

  const res = await fetch(baseURL + apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
  });

  res.status === 204 ? window.location.reload() : toast.error('Error while deleting')
};


export const updateQuestionCategory = async (categoryId, name) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/updateCategoryName`;
  const data = { newName: name, categoryId: categoryId }

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
//update the toggle isReady
export const updateQuestionnaireIsReady = async (questionnaireId, isReady) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/companyAdmin/updateQuestionnaireIsReady`;
  const data = { isReady: isReady, questionnaireId: questionnaireId }

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//updateQuestionnaireIsLive
export const updateQuestionnaireIsLive = async (questionnaireId, isLive) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/companyAdmin/updateQuestionnaireIsLive`;
  const data = { isLive: isLive, questionnaireId: questionnaireId }

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//update the questionnaire title and description
export const handleUpdateQuestionnaireTitleAndDescription = async (questionnaireId, questionnaireTitle, questionnaireDescription) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/companyAdmin/handleUpdateQuestionnaireTitleAndDescription`;
  const data = { questionnaireTitle: questionnaireTitle, questionnaireDescription:questionnaireDescription, questionnaireId: questionnaireId }
  console.log("handleUpdateQuestionnaireTitleAndDescription", data);
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const getArticles = async (category) => {
  const apiKey = "AIzaSyC3FVIBTpZUcwYI16HR1K9eu8TktccL6Dw";
  const cx = "430d5a3e4f6f644f4";
  // const url = `https://customsearch.googleapis.com/customsearch/v1?cx=430d5a3e4f6f644f4&q=${category}%20c[%E2%80%A6]yPrint=true&key=AIzaSyC3FVIBTpZUcwYI16HR1K9eu8TktccL6Dw`
  const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${cx}&q=${category}&key=${apiKey}`;

  try {
      const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
  } catch {
    toast.error('Error!')
  }
};

// export const getArticlesFromTopicAndContentPref = async ({ topic, contentPreferences }) => {
//   const apiKey = "AIzaSyC3FVIBTpZUcwYI16HR1K9eu8TktccL6Dw";
//   const cx = "430d5a3e4f6f644f4";

//   if (!topic || !Array.isArray(contentPreferences) || contentPreferences.length === 0) {
//     console.error('Invalid parameters:', { topic, contentPreferences });
//     toast.error('Invalid parameters for fetching articles');
//     return null;
//   }

//   // Combine the topic and content preferences into a single search query
//   const searchParams = `${topic} ${contentPreferences.join(' ')}`;
//   const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${cx}&q=${encodeURIComponent(searchParams)}&key=${apiKey}`;

//   try {
//     const res = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await res.json();
//   } catch (error) {
//     toast.error('Error while fetching articles');
//     console.error('Error fetching articles:', error);
//   }
// };

export const getArticlesFromTopicAndContentPref = async ({ topic, contentPreferences, start = 1 }) => {
  //new api key=AIzaSyDS-x8lZ0vl_suQ11XB2ndkFiQTT-SlxR0
  //old api key=AIzaSyC3FVIBTpZUcwYI16HR1K9eu8TktccL6Dw
  //new cx=06a74ca2383b64e43
  //old cx=430d5a3e4f6f644f4
  const apiKey = "AIzaSyDS-x8lZ0vl_suQ11XB2ndkFiQTT-SlxR0";
  const cx = "06a74ca2383b64e43";
  const numResults = 10;
  const searchParams = `${topic} ${contentPreferences.join(' ')}`;
  const url = `https://customsearch.googleapis.com/customsearch/v1?cx=${cx}&q=${encodeURIComponent(searchParams)}&key=${apiKey}&num=${numResults}&start=${start}`;

  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (res.status === 429 && retries > 0) {
          console.warn(`Rate limited. Retrying after ${delay} ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchWithRetry(url, retries - 1, delay * 2);
        }
        throw new Error('Network response was not ok');
      }
      return await res.json();
    } catch (error) {
      toast.error('Error while fetching articles');
      console.error('Error fetching articles:', error);
      throw error;
    }
  };

  return fetchWithRetry(url);
};



export const forgotPassword = async (requestData) => {
  const apiUrl = `/pub/forgotPassword`;

  try {
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
  } catch {
    toast.error('Error!')
  }


};

export const verifyOTP = async (requestData) => {
  const apiUrl = `/pub/verifyOTP`;

  try {
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
  } catch {
    toast.error('Error!')
  }

};

export const resetPassword = async (requestData) => {
  const apiUrl = `/pub/resetPassword`;

  try {
  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  return res.json();
  } catch {
    toast.error('Error!')
  }

};

export const UpdateUser = async (data) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/updateUserProfile`;

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

//
export const UpdateUserFromStartUpQuestions = async (data) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const apiUrl = `/api/UpdateUserFromStartUpQuestions`;
  console.log("Persona data in front controller", data);

  const res = await fetch(baseURL + apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-token": `${currentUser.token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

