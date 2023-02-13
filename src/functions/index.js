
import { HOST_API_KEY } from '../config';
import axios from '../utils/axios';
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
const config = {
    headers: {
        Authorization : `Bearer ${accessToken}`,
       "Access-Control-Allow-Credentials": "true" ,
       "Access-Control-Allow-Origin": "*" ,
       "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT" ,
       "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" 
    }
};

// user function 
export const getUserList = async () =>{    
    const response = await axios.get(HOST_API_KEY + '/api/user', config);
    return response.data.data;
}
export const deleteUser = async (id) =>{    
    const response = await axios.delete(HOST_API_KEY + '/api/user/'+ id, config);
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
    // console.log("error data", response.data);
    return response.data.data;
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
export const deleteRole = async (id) =>{    
    const response = await axios.delete(HOST_API_KEY + '/api/role/'+ id, config);
    return response.data;
}


// Invoice Function
export const getInvoiceList = async () =>{    
    const response = await axios.get(HOST_API_KEY + '/api/invoice', config);
    return response.data.data;
}
export const getInvoiceSingle = async (id) =>{    
    const response = await axios.get(HOST_API_KEY + '/api/invoice/'+ id, config);
    return response.data.data;
}
export const insertInvoice = async (data) =>{    
    const response = await axios.post(HOST_API_KEY + '/api/invoice', data, config);
    return response.data;
}
export const updateInvoice = async (data, id) =>{    
    const response = await axios.put(HOST_API_KEY + '/api/invoice/'+ id, data, config);
    return response.data;
}
export const deleteInvoice = async (id) =>{    
    const response = await axios.delete(HOST_API_KEY + '/api/invoice/'+ id, config);
    return response.data;
}

export const updateInvoiceStatus = async (card, id) =>{    
    const response = await axios.put(HOST_API_KEY + '/api/invoicestatus/'+ id, card);
    return response.data.data;
}
export const updateInvoiceSingle = async (id) =>{    
    const response = await axios.get(HOST_API_KEY + '/api/invoicestatus/'+ id);
    return response.data.data;
}


// Send Email 
export const sendEmail = async (id) =>{    
    const response = await axios.post(HOST_API_KEY + '/api/sendemail/'+ id, config);
    return response.data;
}

