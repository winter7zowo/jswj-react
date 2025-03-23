import { AxiosResponse } from "axios";
import { ExceptionCode } from "./errorCode";

export class ApiError extends Error {
    public code: ExceptionCode;

    constructor(message: string, code: ExceptionCode) {
        super(message);
        this.code = code;
    }
}

export const validateResponse = (res: AxiosResponse, errorMessage: string): void => {
    if (res.status !== 200) {
        console.error(errorMessage);
        throw new Error(errorMessage);
    }
    if (res.data.code !== 0) {
        console.error(errorMessage);
        console.error(res.data.message);
        throw new ApiError(res.data.message, res.data.code);
    }
};