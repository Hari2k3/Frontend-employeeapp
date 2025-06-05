import { useNavigate } from "react-router-dom";
import { Input, Button, SelectComponent} from "../../components"
import "./EmployeeForm.css"
import { useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector} from "react-redux";
import { EMPLOYEE_ACTION_TYPES } from "../../store/employee/employee.types";
import { type UseSelector } from "react-redux";
import { useAppSelector } from "../../store/store";
import { useAppDispatch } from "../../store/store";
import { addEmployee } from "../../store/employee/employeeReducer";
import type { Employee } from "../../store/employee/employee.types";
import { useCreateEmployeeMutation,useEditEmployeeMutation} from "../../api-services/employees/employees.api";
import { useGetDepartmentListQuery } from "../../api-services/department/departments.api";
interface Props {
    type: "Edit" | "Create";
    formOnChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    addressOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
        name: string,
        email:string,
        age: number,
        employee_id: string,
        role: string,
        dateofjoining: string,
        status: string,
        experience: number,
        dept_id: number,
        address: {
            house_no: string,
            line1: string,
            line2: string,
            pincode: string
        },
        password:string
    }
}




export const    EmployeeForm = (props: Props) => {
    const dispatch = useAppDispatch();
    // const deparments = [{key:"1", value:'HR'}, {key: "3", value:'Development'}];
    const roles = [{key:'HR', value:'HR'}, {key: 'DEVELOPER', value:'DEVELOPER'},{key:"UI",value:'UI'},{key:'UX',value:'UX'}];
    const status = [{key:"ACTIVE", value:'ACTIVE'}, {key: "INACTIVE", value:'INACTIVE'},{key:"PROBATION",value:'PROBATION'}];
    const {data: departments} = useGetDepartmentListQuery();
    let departmentOptions:{key:string,value:string}[]=[]
    if(departments){
        departments.forEach((dept:any)=>{
            departmentOptions.push({
                key:dept.id,
                value:dept.name
            })
        })
    }
    console.log(props.values)
    const navigate = useNavigate();
    // const employ=useAppSelector((state:any)=>{
    //     state.employee.employees
        
    // })
    // console.log(employ);
    const { id } = useParams<{ id: string }>(); // id is string by default
    const numericId = Number(id);

    const isEdit = props.type==="Edit";
    const [error,setError] = useState("")
    const [create, { isLoading: isCreating }] = useCreateEmployeeMutation();
const [editEmployee, { isLoading: isEditing }] = useEditEmployeeMutation();


    return (
        <>
            <div className="layout-child-div"><h2>{props.type} Employee</h2></div>
            <div className="layout-child-div">
                <div className="form-container">
                    <Input label="Employee Name" name="name" type="text" variant="input" placeholder="Employee name" value={props.values.name} onchange={props.formOnChange} />
                    <Input label="Joining Date" name="dateofjoining" type="string" variant="input" placeholder="Joining Date" value={props.values.dateofjoining} onchange={props.formOnChange}/>
                    <Input label="Email" name="email" type="text" variant="input" placeholder="Email" value={props.values.email} onchange={props.formOnChange}/>
                    <Input label="Age" name="age" type="number" variant="input" placeholder="Age" value={props.values.age as unknown as string} onchange={props.formOnChange}/>


                    <SelectComponent label="Department" name="dept_id" options={departmentOptions} value={(departmentOptions.find((d) => d.key.toString() === props.values?.dept_id?.toString())?.key)?.toString() || ""} onchange={props.formOnChange}/>
                    <SelectComponent label="Role" name="role" options={roles} value={props.values.role} onchange={props.formOnChange}/>
                    <SelectComponent label="Status" name="status" options={status} value={props.values.status.toUpperCase()} onchange={props.formOnChange}/>

                    <Input label="Experience" name="experience" type="number" variant="input" placeholder="Experience" value={props.values.experience as unknown as string} onchange={props.formOnChange}/>
                    <Input label="Employee Id" name="employee_id" type="string" variant="input" placeholder="Employee Id" value={props.values.employee_id} onchange={props.formOnChange} disabled={isEdit}/>

                    <div className="form-element address-input">
                        <label>Address</label>
                        <input className="input" type="text" name="house_no" placeholder="House No" value={props.values.address.house_no} onChange={props.addressOnChange}/>
                        <input className="input" type="text" name="line1" placeholder="Line 1" value={props.values.address.line1} onChange={props.addressOnChange}/>
                        <input className="input" type="text" name="line2" placeholder="Line 2" value={props.values.address.line2} onChange={props.addressOnChange}/>
                        <input className="input" type="text" name="pincode" placeholder="Pincode" value={props.values.address.pincode} onChange={props.addressOnChange}/>
                    </div>
                    <Input label="Password" name="password" type="string" variant="input" placeholder="Password" value={props.values.password} onchange={props.formOnChange} disabled={isEdit}/>
                    
                </div>
                <div>
                    <Button variant="blue" className="button-form" type="submit" text={props.type==="Create"? "Create" : "Edit"} onclick={async()=> {
                        // e.preventDefault();
                        // console.log(props.values)
                        try {
      if (props.type === "Create") {
        await create(props.values).unwrap();
      } else {
        await editEmployee({ id: numericId!, payload: props.values }).unwrap();
      }
      navigate("/");
    } catch (error: any) {
      setError(error.data?.message || "Something went wrong");
    }
                        
                        // dispatch({type:EMPLOYEE_ACTION_TYPES.ADD,payload:props.values})
                        // const action = addEmployee(employ)
                        // const emp=props.values

                        // dispatch(addEmployee(props.values))
                        // dispatch({type:EMPLOYEE_ACTION_TYPES.ADD,payload:props.values})
                        // navigate('/')
                    
                    }
                        
                }/>
                    <Button variant="grey" className="button-form" type="button" text="Cancel" onclick={() => navigate(-1) }/>
                </div>
            </div>
        </>
    )
}