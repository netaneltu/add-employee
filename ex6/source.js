const loadFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const saveToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
let employees = loadFromLS("employees") ? loadFromLS("employees") : [];
let index = loadFromLS("index") ? loadFromLS("index") : [];

const Name_input = document.querySelector("#Name_input");
const age_input = document.querySelector("#age_input");
const salary_input = document.querySelector("#salary_input");
const input_btn = document.querySelector("#input_btn");
const body = document.querySelector("#body");
const table_div = document.querySelector("#table_div");
let search_input = document.querySelector("#search_input");

const addemployee = (employee) => {
  const row = document.createElement("tr");

  const employee_num = document.createElement("th");
  employee_num.innerHTML = employee.employee_num;

  const name = document.createElement("td");
  name.innerHTML = employee.name;
  const age = document.createElement("td");
  age.innerHTML = employee.age;
  const salary = document.createElement("td");
  salary.innerHTML = employee.salary;
  const delete_btn_div = document.createElement("td");
  delete_btn_div.classList.add("delete_btn_div");
  const delete_btn = document.createElement("img");
  delete_btn.classList.add("trash_logo");
  delete_btn.setAttribute("src", "pngfind.com-trash-png-471196.png");
  Name_input.value = "";
  age_input.value = "";
  salary_input.value = "";
  delete_btn.addEventListener("click", () => {
    row.remove();
    employees = employees.filter((employee) => {
      return employee.employee_num !== employee.employee_num;
    });
    saveToLS("employees", employees);
  });

  // const br = document.createElement("br");
  // var search_input = document.createElement("input");
  // search_input.classList.add("form-control");
  // search_input.setAttribute("placeholder", "search by name, age or salary");
  // table_div.append(br, search_input);

  delete_btn_div.append(delete_btn);

  row.append(employee_num, name, age, salary, delete_btn_div);
  body.append(row);

  console.log(employees);
};

input_btn.addEventListener("click", () => {
  index++;
  const employee = {
    employee_num: index,
    name: Name_input.value,
    age: age_input.value,
    salary: salary_input.value,
  };

  employees.push(employee);
  saveToLS("employees", employees);
  saveToLS("index", index);

  addemployee(employee);
});

for (let employee of employees) {
  addemployee(employee);
}

search_input.addEventListener("keyup", () => {
  const filtered_array = employees.filter(
    (employee) =>
      employee.name.includes(search_input.value) ||
      employee.age.includes(search_input.value) ||
      employee.salary.includes(search_input.value)
  );

  
    console.log(filtered_array);
    body.innerHTML = "";
    for (let employee of filtered_array) {
      addemployee(employee);
    }
  }
);
