import {EDiagnostics} from "../EDiagnostics";

export interface IError {
    setErrorFromString(input: string): void;
    setErrorFromNumber(input: number): void;
    setError(input: EDiagnostics): void;
    getError(): EDiagnostics;
}
