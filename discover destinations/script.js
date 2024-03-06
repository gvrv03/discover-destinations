const baseURL = "http://127.0.0.1:8080";

// -------------------- for an Contact Form --------------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    submitBtn.innerText = "Waiting...";
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const sub = document.getElementById("subject").value;
    const msg = document.getElementById("message").value;
    try {
      const res = await fetch(baseURL + "/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, sub, msg }),
      });

      const data = await res.json();
      if (data?.isSuccess) {
        submitBtn.innerText = "Submit Successful";
        return alert("Form Submitted Successfully");
      } else {
        submitBtn.innerText = "Submit";
        return alert(data?.error);
      }
    } catch (error) {
      submitBtn.innerText = "Submit";
      return alert("Error submitting form: " + error.message);
    }
  });
});

// -------------------- for an Register Form --------------------
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const submitBtn = document.getElementById("submit");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        submitBtn.value = "Waiting...";

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const number = document.getElementById("number").value;

        // Example of phone number validation
        if (number.length < 10 || isNaN(number)) {
            alert("Phone number must be at least 10 digits and should not include characters!");
            submitBtn.value = "Submit";
            return false;
        }

        try {
            const res = await fetch(baseURL + "/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, gender, email, password, number }),
            });

            const data = await res.json();
            if (data?.isSuccess) {
                // Update submit button text to indicate success
                submitBtn.value = "Submit Successful";
                // Optionally, you can display an alert or perform other actions
                return alert("Form Submitted Successfully");
            }
        } catch (error) {
            console.error(error);
            // Update submit button text to original state
            submitBtn.value = "Submit";
            return alert("Error submitting form: " + error.message);
        }
    });
});