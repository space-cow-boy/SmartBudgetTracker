import { auth, db } from "./fbconfig.js";
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const logoutBtn = document.getElementById("logout-btn");
const deleteAllBtn = document.getElementById("delete-all");
let currentUser = null;

// Check auth state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    currentUser = user;
    fetchExpenses();
  }
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

// Add Expense
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = form.date.value;
  const category = form.category.value;
  const amount = parseFloat(form.amount.value);
  const note = form.note.value;

  if (!date || !category || !amount) return alert("Please fill all fields!");

  await addDoc(collection(db, "expenses"), {
    userId: currentUser.uid,
    date,
    category,
    amount,
    note
  });

  form.reset();
  fetchExpenses();
});

// Fetch Expenses
async function fetchExpenses() {
  const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));
  const snapshot = await getDocs(q);
  expenseList.innerHTML = "";
  let total = 0;
  const data = [];

  snapshot.forEach((docSnap) => {
    const item = docSnap.data();
    total += item.amount;
    data.push(item);
    const p = document.createElement("p");
    p.textContent = `${item.date} | ${item.category} | ₹${item.amount} | ${item.note}`;
    expenseList.appendChild(p);
  });

  updateChart(data);
}

// Delete All Expenses
deleteAllBtn.addEventListener("click", async () => {
  const q = query(collection(db, "expenses"), where("userId", "==", currentUser.uid));
  const snapshot = await getDocs(q);
  snapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, "expenses", docSnap.id));
  });
  fetchExpenses();
});

// Chart.js
let chartInstance = null;
function updateChart(data) {
  const ctx = document.getElementById("expenseChart").getContext("2d");
  const categories = {};
  data.forEach((item) => {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  });

  const chartData = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"]
    }]
  };

  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "pie",
    data: chartData
  });
}
