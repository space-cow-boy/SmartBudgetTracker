import { auth } from "./fbconfig.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
const signupLink = document.getElementById("signup-link");

let isSignup = false;

// Toggle between login and signup
signupLink.addEventListener("click", () => {
  isSignup = !isSignup;
  loginForm.querySelector("button").textContent = isSignup ? "Sign Up" : "Login";
  signupLink.textContent = isSignup ? "Already have an account? Login" : "Sign Up";
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    if (isSignup) {
      await createUserWithEmailAndPassword(auth, email, password);
    } else {
      await signInWithEmailAndPassword(auth, email, password);
    }
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
});
