import { AxiosResponse } from "axios";

export const validateResponse = (res: AxiosResponse, errorMessage: string): void => {
    if (res.status !== 200) {
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (res.data.code !== 0) {
        console.error(errorMessage);
        console.error(res.data.message);
        throw new Error(res.data.message || errorMessage);
    }
};