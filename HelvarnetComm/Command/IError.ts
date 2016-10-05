import Diagnostics = require("../EDiagnostics");

export interface IError {
    setErrorFromString(input: string): void;
    setErrorFromNumber(input: number): void;
    setError(input: Diagnostics.EDiagnostics): void;
    getError(): Diagnostics.EDiagnostics;
}
