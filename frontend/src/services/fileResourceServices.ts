import axios from "./http";
import {FileResourceDto} from "../types/FileResourceDto";
import {AxiosProgressEvent} from "axios";


const apiUri = `/api/v1/file-resources`;


export const uploadFileResource = (file: File, onUploadProgress: (progressEvent: AxiosProgressEvent) => void): Promise<FileResourceDto> => {
    let bodyFormData = new FormData();
    bodyFormData.append("file", file);
    return axios.post(
        apiUri,
        bodyFormData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        }
    ).then(response => response.data);
}