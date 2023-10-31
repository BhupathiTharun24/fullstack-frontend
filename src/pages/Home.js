import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([])

    const {id} = useParams()

    useEffect(() => {
        loadUsers();

    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/users")
        setUsers(result.data);
    };

    const deleteUser = async (id)=>{
        await axios.delete(`http://localhost:8080/user/${id}`)
        loadUsers()
    }

    return (
        <div className='container'>
            <div className='py-4'>

                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th className="col">S.no</th>
                            <th className="col">Name</th>
                            <th className="col">Username</th>
                            <th className="col">Email</th>
                            <th className="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th className="row" key={index}>{index+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button className='btn btn-primary'>View</button>
                                        <Link className='btn btn-outline-primary'
                                        to={`/edituser/${user.id}`}
                                        >Edit</Link>
                                        <button className='btn btn-danger'
                                        onClick={()=>deleteUser(user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>

                            ))
                        }
                        
                    </tbody>
                </table>


            </div>
        </div>
    )
}
