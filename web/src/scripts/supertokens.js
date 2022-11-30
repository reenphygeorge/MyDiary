supertokens.init({
    appInfo: {
        apiDomain: "http://localhost:8000",
        apiBasePath: "/auth",
        appName: "MyDiary",
    },
    recipeList: [
        supertokensSession.init(),
        supertokensEmailPassword.init(),
    ],
});

async function signUpClicked(email, password) {
    try {
        let response = await supertokensEmailPassword.signUp({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/homepage"
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}



async function signInClicked() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    try {
        let response = await supertokensEmailPassword.signIn({
            formFields: [{
                id: "email",
                value: email
            }, {
                id: "password",
                value: password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    if (formField.error === 'This email already exists. Please sign in instead.') {

                    }
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/dashboard.html"
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}

async function logout() {
    await supertokensSession.signOut();
    window.location.href = "/web/src/pages/login.html";
}

