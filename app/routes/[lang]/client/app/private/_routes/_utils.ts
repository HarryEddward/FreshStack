// @routes/[lang]/client/_utils.ts


export function termsAndConditionsErrorResponse(errorMsg: Record<any, any>[], actualLang: string = "ca-mall"): Response | null {
    
    let verifyTACE: boolean = false;
    verifyTACE = errorMsg[0].expected === "accepted";

    const params = new URLSearchParams({
        not_accepted_terms_and_conditions: verifyTACE.toString(),
    });

    if (verifyTACE) {
        return new Response(null, {
            status: 303,
            headers: {
                Location: `/${actualLang}/client?${params.toString()}`,
            },
        });
    }
    return null;

}


export function emptyEmailFieldErrorResponse(errorMsg: Record<any, any>[], actualLang: string = "ca-mall"): Response | null {
    
    let verifyEmptyEmail: boolean = false;
    console.log(errorMsg[-1]);
    verifyEmptyEmail = errorMsg[errorMsg.length - 1].code === "invalid_string";

    const params = new URLSearchParams({
        bad_format_email: verifyEmptyEmail.toString(),
    });

    if (verifyEmptyEmail) {
        return new Response(null, {
            status: 303,
            headers: {
                Location: `/${actualLang}/client?${params.toString()}`,
            },
        });
    }
    return null;

}