import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../../containers/employee.form/EmployeeForm";
import { useState } from "react";


export const CreateEmployee = () => {
    const [formValues, setFormValues] = useState(
        {
            name: "",
            email:"",
            age: 0,
            employee_id: '',
            role: 'HR',
            dateofjoining: '', // or some valid ISO date string,
            password:'',
            status: 'ACTIVE',
            experience: 0,
            dept_id:1,
            address: {
                house_no: "",
                line1: "",
                line2: "",
                pincode: ""
            }
        }
    )
    const numbertypes = ['age','experience','dept_id']
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
    
    const handleAddressChange = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target
        setFormValues(prev => ({
            ...prev,
            address : {
                ...prev.address,
                [name]: value
            }
        }))
    }


    return (
        <>
            <EmployeeForm type="Create" values={formValues} formOnChange={handleFormChange} addressOnChange={handleAddressChange}/>
        </>
    )
}