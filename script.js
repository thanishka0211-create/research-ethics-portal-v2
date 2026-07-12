// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const user = {
            full_name: document.getElementById("full_name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            phone: document.getElementById("phone").value,
            department: document.getElementById("department").value,
            designation: document.getElementById("designation").value,
            role: "Researcher"
        };

        try {

            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {

                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: data.message,
                    confirmButtonColor: "#1E3A5F"
                }).then(() => {
                    window.location.href = "login.html";
                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: data.message,
                    confirmButtonColor: "#1E3A5F"
                });

            }

        } catch (error) {

            console.log(error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Unable to connect to the server.",
                confirmButtonColor: "#1E3A5F"
            });

        }

    });

}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginData = {
            email: document.getElementById("login_email").value,
            password: document.getElementById("login_password").value
        };

        try {

            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("user", JSON.stringify(data.user));

                Swal.fire({
                    icon: "success",
                    title: "Login Successful!",
                    text: "Welcome to the Research Ethics Portal",
                    confirmButtonColor: "#1E3A5F"
                }).then(() => {

                    if (data.user.role === "REC Member") {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "dashboard.html";
                    }

                });

            } else {

                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: data.message,
                    confirmButtonColor: "#1E3A5F"
                });

            }

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Unable to connect to the server.",
                confirmButtonColor: "#1E3A5F"
            });

        }

    });

}