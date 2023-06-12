import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css'
import { useNavigate } from 'react-router-dom';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(user.data);
       
      } catch (error) {
        console.error('Error :', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className='container'>
      <button onClick={()=>{navigate('/favourites')}}>favourites</button>
      <h2 className='title'>User List</h2>
      {users.length === 0 ? (
        <div className='loading'>Loading users...</div>
      ) : (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>    
            </thead> 
            <tbody>  
                {users.sort((a, b) => a.name.localeCompare(b.name)).map((user) => (
                    <tr key={user.id} className=''>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                    </tr>
                    
                ))}
            </tbody>   
        </table>
      )}
    </div>
  );
};

export default UserList;
