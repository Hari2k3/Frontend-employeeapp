import './EmployeeList.css'
import deleteIcon from '../../assets/delete.png'
import editIcon from '../../assets/pencil.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Modal } from '../../components'
import {  useMemo, useState, type MouseEvent } from 'react'
import { FormHeaderButton } from '../../components/Button/FormHeaderButton'
import { StatusSpan } from '../../components/StatusSpan/StatusSpan'

import { useAppSelector } from '../../store/store'
// import { Employee } from '../../store/employee/employee.types'
// import { useAppDispatch } from '../../store/store'
import { useDeleteEmployeeMutation, useGetEmployeeListQuery } from '../../api-services/employees/employees.api'


    

export const EmployeeList = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
    // const [employeelist,setemployeeList]=useState<Employee | undefined>(undefined);

    const [modalIsOpen, setModal] = useState(false)

    // const handleGetSearchParams = () => {
    //     const status = searchParams.get("status") || "All"
    //     console.log("searchParams",status)
    // }
    const status = searchParams.get("status") || "all"
    // console.log("searchParams",status)
    const [error,setError] = useState("")
    const statusOptions = ["All", "Active", "Inactive", "Probation"]
    const {data: employeeList}=useGetEmployeeListQuery()
    // console.log(employeeList);

        // setemployeeList(employeeList)
        // console.log(getEmployee.data)

    const navigate = useNavigate();


    const handleDelete = (event: MouseEvent<HTMLImageElement>,id:any) => {
        setEmployeeToDelete(id);
        setModal(true)
        event.stopPropagation()
        
    }

    const handleClose = () => {
        setModal(false)

    }
    const employees=useAppSelector((state:any)=>state.employee.employees)


    const handleFilter = (status: string) => {
        const newSearchParams = new URLSearchParams(searchParams)

        if (status === "all" ) {
            newSearchParams.delete("status")
        } else {
            newSearchParams.set("status", status)
        }
        setSearchParams(newSearchParams)
    }

    const filteredEmployees = useMemo(() => {

            if(status === "all")  {
                return employeeList
            }
            else return employeeList?.filter((employee:any) => 
                employee?.status?.toLowerCase() === status.toLowerCase()
            )
        }, [status,employeeList]
    )
    console.log(employeeList)
    // const filteredEmployees = getEmployee.data
    // const dispatch = useAppDispatch();
    // const employ=useSelector((state:any)=>state.employees)
    // console.log(employ);
    
    const [delemp] = useDeleteEmployeeMutation();
    return (
        <>
            <div className='employee-list-title layout-child-div'>
                <h2>Employee List</h2>
                <div className='employee-list-title-input-group'>
                    <div className='employee-list-title-filter-group'>
                        <label>Filter By</label>
                        <select name='status' onChange={(event) => handleFilter(event.target.value)}>
                            <option value="" disabled selected hidden> Status </option>
                            {
                                statusOptions.map((status) => {
                                    return <option value={status.toLowerCase()}>{status}</option>
                                })
                            }
                        </select>
                    </div>
                    <FormHeaderButton type="Create" onclick={() => navigate('/employees/create')}/>
                </div>
            </div>
            <div className='employee-list-header layout-child-div'>
                <h3>Employee Name</h3>
                <h3>Employee Id</h3>
                <h3>Joining Date</h3>
                <h3>Role</h3>
                <h3>Status</h3>
                <h3>Experience</h3>
                <h3>Action</h3>
            </div>

            {
                filteredEmployees?.map((employee:any)=> {
                    // console.log(employee)
                    return <div className='employee-list-element layout-child-div' onClick={()=>navigate(`/employees/details/${employee.id}`)}>

                        <p>{employee.name}</p>
                        <p>{employee.employee_id}</p>
                        <p>{employee.dateOfJoining}</p>
                        <p>{employee.role}</p>
                        <p><StatusSpan status={employee.status}/></p>
                        <p>{employee.experience}</p>
                        <div className='action-buttons'>
                            <img src={deleteIcon} onClick={(event) => { handleDelete(event,employee.id) }} />
                            <img src={editIcon} onClick={(event) => { navigate(`/employees/edit/${employee.id}`); event.stopPropagation()}} />
                        </div>
                    </div>
                })
            }

            <Modal isOpen={modalIsOpen} onClose={handleClose}>
                <div className='delete-confirmation-box'>
                    
                    <div className='delete-confirmation-box-text '>
                        <h2>Are you sure?</h2>
                        <p>Do you really want to delete employee</p>
                    </div>
                    <div className='delete-confirmation-box-buttons '>
                        <Button variant='blue' text='Confirm' type='submit' onclick={()=>{ 
                            delemp({id:employeeToDelete})
                            .unwrap()
                            .then(()=>{
                                setEmployeeToDelete(null);

                            }).catch((error)=>{
                                setError(error.data.message);
                            })
                            // dispatch({type:EMPLOYEE_ACTION_TYPES.DELETE,payload:employeeToDelete});
                            // setEmployeeToDelete(null);
                            setModal(false);
                            navigate("/");
                            }}/>
                        <Button variant='grey' text='Cancel'  type='submit' onclick={handleClose}/>
                    </div>
                </div>
            </Modal>

        </>
    )
}