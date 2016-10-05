export class DiagnosticsUtil {

    public static getDescription(diagnostics: EDiagnostics): string {
        switch (diagnostics) {
            case (EDiagnostics.UNKNOWN): return "Unknown state / Init state";
            case (EDiagnostics.TIMEOUT): return "Request Timeout/Cancel";
            case (EDiagnostics.NOTDELIVERED): return "Request could not be sent/delivered";

            case (EDiagnostics.SUCCESS): return "Success";

            case (EDiagnostics.ERROR1): return "Invalid group index parameter";
            case (EDiagnostics.ERROR2): return "Invalid cluster parameter";
            case (EDiagnostics.ERROR3): return "Invalid router parameter";
            case (EDiagnostics.ERROR4): return "Invalid subnet parameter";
            case (EDiagnostics.ERROR5): return "Invalid device parameter";
            case (EDiagnostics.ERROR6): return "Invalid sub device parameter";
            case (EDiagnostics.ERROR7): return "Invalid block parameter";
            case (EDiagnostics.ERROR8): return "Invalid scene parameter";
            case (EDiagnostics.ERROR9): return "Cluster does not exist";
            case (EDiagnostics.ERROR10): return "Router does not exist";
            case (EDiagnostics.ERROR11): return "Device does not exist";
            case (EDiagnostics.ERROR12): return "Property does not exist";
            case (EDiagnostics.ERROR13): return "Invalid RAW message size";
            case (EDiagnostics.ERROR14): return "Invalid messages type";
            case (EDiagnostics.ERROR15): return "Invalid message command";
            case (EDiagnostics.ERROR16): return "Missing ASCII terminator";
            case (EDiagnostics.ERROR17): return "Missing ASCII parameter";
            case (EDiagnostics.ERROR18): return "Incompatible version";
            case (EDiagnostics.ERROR19): return "Invalid reply size";
            case (EDiagnostics.ERROR20): return "Invalid reply";
            case (EDiagnostics.ERROR21): return "I am the only router";
            case (EDiagnostics.ERROR22): return "Ignore";
            case (EDiagnostics.ERROR23): return "Invalid Address parameter";
            case (EDiagnostics.ERROR24): return "Command not relevant for object type";
            case (EDiagnostics.ERROR25): return "Property not supported";
            case (EDiagnostics.ERROR26): return "Invalid colour parameter";
            case (EDiagnostics.ERROR27): return "Group does not exist";

            default: return "Unknown error";
        }
    }

    /*public static getEnum(diagnostics: number): EDiagnostics {
        return EDiagnostics[diagnostics];
    }*/
}


export enum EDiagnostics {

    UNKNOWN = -20,
    TIMEOUT = -2,
    NOTDELIVERED = -1,

    SUCCESS = 0,

    ERROR1 = 1,
    ERROR2 = 2,
    ERROR3 = 3,
    ERROR4 = 4,
    ERROR5 = 5,
    ERROR6 = 6,
    ERROR7 = 7,
    ERROR8 = 8,
    ERROR9 = 9,
    ERROR10 = 10,
    ERROR11 = 11,
    ERROR12 = 12,
    ERROR13 = 13,
    ERROR14 = 14,
    ERROR15 = 15,
    ERROR16 = 16,
    ERROR17 = 17,
    ERROR18 = 18,
    ERROR19 = 19,
    ERROR20 = 20,
    ERROR21 = 21,
    ERROR22 = 22,
    ERROR23 = 23,
    ERROR24 = 24,
    ERROR25 = 25,
    ERROR26 = 26,
    ERROR27 = 27,

    UNKNOWNERROR = 50

}