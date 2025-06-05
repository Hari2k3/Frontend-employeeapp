import { useNavigate, useParams } from "react-router-dom"
import "./profile.css"
import { StatusSpan } from "../../components/StatusSpan/StatusSpan";
import { FormHeaderButton } from "../../components/Button/FormHeaderButton";
import { useGetEmployeeByIdQuery } from "../../api-services/employees/employees.api";

// import jwt_decode from 'jwt-decode';


// const [get]=useGetEmployeeByIdQuery();
export const Profile = () => {
    const token = localStorage.getItem("token")
    if(!token){
        return(
            <>
            <div >Not found</div>
            </>
        )
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-','+').replace('_','/')
    const data = JSON.parse(window.atob(base64))
    const id = data.id
    
    // const {id} = useParams();
    const {data:employee}=useGetEmployeeByIdQuery(parseInt(id as string));
    // const employee = employees.find ((e) => e.id === Number(id))
    const navigate = useNavigate()
    if(!employee) return null
    console.log(employee);

    return (
        <>
            <div className='employee-list-title layout-child-div'>
                <h2>Profile</h2>
                {/* <div className='employee-list-title-input-group'>
                    <FormHeaderButton type="Edit" onclick={() => navigate(`/employees/edit/${id}`)}/>
                </div> */}
            </div>
            

                <div className='employee-details-container layout-child-div'>
                    <div>
                        <h3>Employee Name</h3>
                        <p>{employee.name}</p>
                    </div>
                    <div>
                        <h3>Employee Id</h3>
                        <p>{employee.employee_id}</p>
                    </div>
                    <div>
                        <h3>Joining Date</h3>
                        <p>{(new Date(employee.dateofjoining)).toLocaleDateString().split("T")[0]}</p>
                    </div>
                    <div>
                        <h3>Role</h3>
                        <p>{employee.role}</p>
                    </div>
                    <div>
                        <h3>Status</h3>
                        <p><StatusSpan status={employee.status} /></p>

                    </div>
                    {/* <div className="partition-line"></div> */}
                    
                    <div>
                        <h3>Address</h3>
                        <p>{employee.address?.house_no}</p>
                        <p>{employee.address?.line1}</p>
                        <p>{employee.address?.line2}</p>
                        <p>{employee.address?.pincode}</p>
                    </div>
                    <div>
                        <h3>Experience</h3>
                        <p>{employee.experience} Years</p>
                    </div>
                    
            
            </div>
    
        </>
    )
}