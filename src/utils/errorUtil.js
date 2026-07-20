import * as z from "zod";
import { Prisma } from "../../generated/prisma/client.ts";

export function getErrorMessage(error, isSingleError) {
    let errors = {};
    let singleError = "";

    if (error instanceof z.ZodError) {
        errors = z.flattenError(error).fieldErrors;
        singleError = isSingleError ? Object.values(errors).flat()[0] : "";
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P2002":
                singleError = "Such record already exists";
                break;
            case "P2003":
                singleError = "Invalid data";
                break;
            default: singleError = "Database error";
        }
    } else if (error instanceof RepositoryError) {
        errors[error.field] = error.message;
        singleError = error.isSingleError ? error.message : "";
    } else {
        singleError = error.message || "Something went wrong!";
    };

    return { errors, singleError };
}

export class RepositoryError {
    constructor(field, message, isSingleError) {
        this.field = field;
        this.message = [message];
        this.isSingleError = isSingleError
    }
}