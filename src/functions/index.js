
import { HOST_API_KEY } from '../config';
import axios from '../utils/axios';
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
const config = {
    headers: {
    Authorization : `Bearer ${accessToken}`
    }
};

// user function 
export const getUserList = async () =>{    
    const response = await axios.get(HOST_API_KEY + '/api/user', config);
    return response.data.data;
}
export const deleteUser = async (data, id) =>{    
    const response = await axios.put(HOST_API_KEY + '/api/user/'+ id, config);
    return response.data;
}
export const getUserSingle = async (id) =>{    
    const response = await axios.get(HOST_API_KEY + '/api/user/'+ id, config);
    return response.data.data;
}
export const insertUser = async (data) =>{    
    const response = await axios.post(HOST_API_KEY + '/api/auth/register', data, config);
    return response.data;
}
export const updateUser = async (data, id) =>{    
    const response = await axios.put(HOST_API_KEY + '/api/user/'+ id, data, config);
    return response.data;
}

// Role Function
export const getRoleList = async () =>{    
    const response = await axios.get(HOST_API_KEY + '/api/role', config);
    return response.data.data;
}
export const getRoleSingle = async (id) =>{    
    const response = await axios.get(HOST_API_KEY + '/api/role/'+ id, config);
    return response.data.data;
}
export const insertRole = async (data) =>{    
    const response = await axios.post(HOST_API_KEY + '/api/role', data, config);
    return response.data;
}
export const updateRole = async (data, id) =>{    
    const response = await axios.put(HOST_API_KEY + '/api/role/'+ id, data, config);
    return response.data;
}
export const deleteRole = async (data, id) =>{    
    const response = await axios.put(HOST_API_KEY + '/api/role/'+ id, config);
    return response.data;
}
