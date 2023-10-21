import { Employee } from "./Employee.js";

const employee = new Employee("John", 1000);

console.log(employee.name);
console.log(employee.salary);
employee.increaseSalary();
console.log(employee.salary);
