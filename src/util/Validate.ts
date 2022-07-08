export class Validate {
    static email(email: string | null): boolean {
        if (email === null) return false;
        let atIndex = [];

        for (let i = 0; i < email.length; i++) {
            if (email[i] === "@") atIndex.push(i);
        }
        if (atIndex.length !== 1) return false; // cant have more than one @
        if (atIndex[0] === 0) return false; // cant have @ at the start of the email

        if (email[0] === ".") return false; // email cant start with a dot "."


        let splittedEmail = email.split("@");
        if (splittedEmail[splittedEmail.length - 1][0] === ".") return false; // domain cant start with a dot "."

        let doubleQuoted = false;
        if (splittedEmail[0][0] === "\"" && splittedEmail[0][splittedEmail[0].length - 1] === "\"") doubleQuoted = true;

        for (let i = 0; i < splittedEmail[splittedEmail.length - 1].length - 1; i++) { // cant have two dots ".." one after the other 
            if (splittedEmail[splittedEmail.length - 1][i] === "." && splittedEmail[splittedEmail.length - 1][i + 1] === ".") return false;
        }

        for (let i = 0; i < splittedEmail[0].length - 1; i++) { // cant have two dots ".." one after the other 
            if ((splittedEmail[0][i] === "." && splittedEmail[0][i + 1] === ".") && !doubleQuoted) return false;
        }

        let testCh;
        for (let i = 0; i < splittedEmail[0].length; i++) {
            testCh = splittedEmail[0][i];
            if ((testCh === "\"" ||
                testCh === "," ||
                testCh === ":" ||
                testCh === "(" ||
                testCh === ")" ||
                testCh === ";" ||
                testCh === "<" ||
                testCh === ">" ||
                testCh === "[" ||
                testCh === "]" ||
                testCh === " " ||
                testCh === "\\") && !doubleQuoted) return false;
        }
        if (splittedEmail[0].length > 64) return false;

        // cant have "_" in the domain
        for (let i = 0; i < splittedEmail[0].length; i++) {
            testCh = splittedEmail[splittedEmail.length - 1][i];
            if (testCh === "_") return false;
        }

        return true;
    }

    static matchPassword(pass: string | null): boolean {
        if (pass === null) return false;
        if (pass.length < 8 ||
            (/[A-Z]/).test(pass) === false ||
            (/[a-z]/).test(pass) === false ||
            (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(pass) === false ||
            pass === ""
        ) return false;
        return true && testThreeNumbers(pass) && onlyEnglish(pass);
    }
}
function testThreeNumbers(str: string): boolean {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if ((/[0-9]/).test(str[i])) {
            count++;
            if (count == 3) return false;
        } else count = 0;
    }
    return true;
}
function onlyEnglish(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
        if (!(/[0-9]|[a-z]|[A-Z]|[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(str[i])) {
            return false;
        }
    }
    return true;
}
