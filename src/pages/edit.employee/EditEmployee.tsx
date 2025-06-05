import { useNavigate, useParams } from "react-router-dom";
import { EmployeeForm } from "../../containers/employee.form/EmployeeForm";
import { useEffect, useState } from "react";
import { useGetEmployeeByIdQuery, useEditEmployeeMutation } from "../../api-services/employees/employees.api";
import type { Employee } from "../../store/employee/employee.types";
// import bcrypt from 'bcrypt'
export const EditEmployee = () => {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

  const { data: employeeData, isLoading } = useGetEmployeeByIdQuery(numericId);
  const [formValues, setFormValues] = useState<Employee | null>(null);
  
  useEffect(() => {
  if (employeeData) {
    const mappedData = {
      name: employeeData.name,
      email: employeeData.email,
      age: employeeData.age,
      employee_id: employeeData.employee_id,
      role: employeeData.role,
      dateOfJoining: employeeData.dateOfJoining ?? "",
      status: employeeData.status,
      experience: employeeData.experience,
      dept_id:employeeData.dept_id ?? 1,
      password: employeeData.password??"12345", 
      address: {
        house_no: employeeData.address?.house_no || "",
        line1: employeeData.address?.line1 || "",
        line2: employeeData.address?.line2 || "",
        pincode: employeeData.address?.pincode || ""
      }
    };

    setFormValues(mappedData);
  }
}, [employeeData]);
  console.log(formValues)
  const numbertypes=['experience','age','dept_id'];
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues((prevState:any)=>({
      ...prevState, [name]:value
    }))
    if(numbertypes.includes(name)){
      setFormValues((prevState:any)=>({
        ...prevState,[name]:parseInt(value)
      }))
    }
  }
  

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) =>
      prev
        ? {
            ...prev,
            address: {
              ...prev.address,
              [name]: value
            }
          }
        : prev
    );
  };

  if (isLoading || !formValues) {
    return <div>Loading employee data...</div>;
  }
  const payload = {
  id: Number(id),
  name: formValues.name,
  email: formValues.email,
  age: Number(formValues.age),
  employee_id: formValues.employee_id,
  role: formValues.role,
  date_of_joining: formValues.dateOfJoining,
  status: formValues.status,
  experience: Number(formValues.experience),
  department_id: Number(formValues.dept_id),
//   address: formValues.address,
  address: {
        house_no: formValues.address.house_no,
        line1: formValues.address.line1,
        line2: formValues.address.line2,
        pincode: formValues.address.pincode
      },
  password: formValues.password
};
    console.log(payload)
  return (
    <EmployeeForm
      type="Edit"
      values={payload}
      formOnChange={handleFormChange }
      addressOnChange={handleAddressChange}
    />
  );
};
