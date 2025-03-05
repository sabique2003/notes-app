import base_url from "./base_url";
import commonApi from "./CommonApi";

export const AddnoteApi=async(data)=>{
    return await commonApi(`${base_url}/addnote`,"POST","",data)
}

export const GetnoteApi=async()=>{
    return await commonApi(`${base_url}/getnote`,"GET","","")
}

export const DeleteNoteApi = async (id) => {
    return await commonApi(`${base_url}/deletenote/${id}`, "DELETE");
};

export const EditNoteApi = async(id,data) =>{
    return await commonApi(`${base_url}/editnote/${id}`,"PUT","",data)
}