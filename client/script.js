

// selecting the form used to add employee
const employeeForm = document.getElementById('employeeForm');

// selecting table body whereemployee rows will be shown when user fill the form
const employeeTableBody = document.getElementById('employeeTableBody')

// selecting the department dropdown inside employee form
const departmentSelect = document.getElementById('departmentSelect');

// selecting the department form (to add a department)
const deptForm = document.getElementById('departmentForm')

// selecting the input fields for department
const deptNameInput = document.getElementById('deptName')
const deptDescInput = document.getElementById('deptDesc')

// selecting the department table body
const deptTableBody = document.getElementById('departmentTableBody')

// base url of server
const BASE_URL = "http://localhost:3000/api";


async function loadDepartmentsUI() {

  try {
    // fetching data from  backend
    const res = await fetch(`${BASE_URL}/departments`);

    // if response is not ok (like 500 or 404) ,  throw error
    if (!res.ok) throw new Error('Failed to fetch department');

    // parsing the response as json
    const responseData = await res.json()

    // extracting data array from response
    const departments = Array.isArray(responseData.data) ? responseData.data : [];

    // clearing old data in dropdown and table
    departmentSelect.innerHTML = `<option value = " ">select Department</option>`;
    deptTableBody.innerHTML = ""
 
    // 6️⃣ Loop through each department and update UI
    departments.forEach((dept) => {
      // Add to <select> dropdown
      const option = document.createElement("option");
      option.value = dept._id;
      option.textContent = dept.name;
      departmentSelect.appendChild(option);

      // Add to departments table
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dept.name}</td>
        <td>${dept.description || ""}</td>
        <td>
          <button onclick="deleteDepartment('${dept._id}')">🗑️ Delete</button>
        </td>
      `;
      deptTableBody.appendChild(row);
    });

  } catch (error) {
    alert("Error loading departments: " + error.message);
  }
}


  
// 🔁 Add Department - Form Submit Handler
deptForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🔒 prevent page reload

  // 1️⃣ Create department object from form inputs
  const department = {
    name: deptNameInput.value,
    description: deptDescInput.value,
  };

  try {
    // 2️⃣ Send POST request to backend
    const res = await fetch(`${BASE_URL}/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(department),
    });

    // 3️⃣ Handle response
    if (res.ok) {
      alert("✅ Department added successfully!");
      deptForm.reset();        // Clear the form
      loadDepartmentsUI();     // Reload list and dropdown
    } else {
      const err = await res.json(); // ⛔ Extract error
      alert(`Error: ${err.error || err.message}`);
    }

  } catch (error) {
    alert("Network error: " + error.message); // 🔌 Fail-safe
  }
});

// ❌ Delete Department
async function deleteDepartment(id) {
  // 1️⃣ Confirm with the user
  if (!confirm("Are you sure you want to delete this department?")) return;

  try {
    // 2️⃣ Send DELETE request to backend
    const res = await fetch(`${BASE_URL}/departments/${id}`, {
      method: "DELETE"
    });

    // 3️⃣ Handle success/failure
    if (res.ok) {
      alert("✅ Department deleted successfully!");
      loadDepartmentsUI(); // 🔁 Refresh department list
    } else {
      const err = await res.json();
      alert(`Error: ${err.message || err.error}`);
    }

  } catch (error) {
    alert("Network error: " + error.message);
  }
}

employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page reload

  // 1️⃣ Grab data from form fields
  const newEmployee = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    departmentId: departmentSelect.value,
  };

  // 2️⃣ Validate: Department must be selected
  if (!newEmployee.departmentId) {
    alert("⚠️ Please select a department.");
    return;
  }

  try {
    // 3️⃣ Send POST request to backend
    const res = await fetch(`${BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });

    // 4️⃣ Handle response
    const result = await res.json();

    if (res.ok) {
      alert("✅ Employee added!");
      employeeForm.reset(); // Clear the form
      loadEmployees(); // Refresh the table
    } else {
      alert(`❌ Error: ${result.error || result.message}`);
    }
  } catch (error) {
    alert("Network error: " + error.message);
  }
});


async function loadEmployees() {
  try {
    const res = await fetch(`${BASE_URL}/employees`);
    const result = await res.json();

    // Check if response was ok
    if (!res.ok) throw new Error(result.error || result.message);

    const employees = Array.isArray(result.data) ? result.data : [];

    // Clear the old table
    employeeTableBody.innerHTML = "";

    // Loop and insert into table
    employees.forEach((emp) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.role || ""}</td>
        <td>${emp.email}</td>
        <td>${emp.phone || ""}</td>
        <td>${emp.departmentId?.name || "N/A"}</td>
        <td>
  ${
    emp.role?.toLowerCase() === "ceo"
      ? "<span>🔒 Protected</span>"
      : `<button onclick="deleteEmployee('${emp._id}')">🗑️ Delete</button>`
  }
</td>

      `;

      employeeTableBody.appendChild(row);
    });
  } catch (error) {
    alert("❌ Error loading employees: " + error.message);
  }
}

async function deleteEmployee(id) {
  if (!confirm("❌ Are you sure you want to delete this employee?")) return;

  try {
    const res = await fetch(`${BASE_URL}/employees/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (res.ok) {
      alert("✅ Employee deleted successfully!");
      loadEmployees(); // Refresh list
    } else {
      alert(`❌ Error: ${result.message || result.error}`);
    }
  } catch (error) {
    alert("Network error: " + error.message);
  }
}

loadDepartmentsUI();
loadEmployees();
