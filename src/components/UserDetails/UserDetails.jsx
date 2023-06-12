import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {AiFillStar, AiFillDelete} from 'react-icons/ai'
import './UserDetails.css'

import { useNavigate } from 'react-router-dom';


const UserDetails = () => {
    const navigate = useNavigate();
    const {userId}= useParams()
    const [user, setUser] = useState(null)
    


    const handelFavourite = (userId) => {
        const storedFavoriteUserIds = localStorage.getItem('favoriteUserId');
        const favoriteUserIds = storedFavoriteUserIds ? new Set(JSON.parse(storedFavoriteUserIds)) : new Set();
        favoriteUserIds.add(userId);
        const updatedFavoriteUserIds = JSON.stringify([...favoriteUserIds]);
        localStorage.setItem('favoriteUserId', updatedFavoriteUserIds);
        alert("added to favourites")
      };
      
      

      
      

      const handelDelete = (userId) => {
        const storedFavoriteUserIds = localStorage.getItem('favoriteUserId');
        if (storedFavoriteUserIds) {
          const favoriteUserIds = new Set(JSON.parse(storedFavoriteUserIds));
          favoriteUserIds.delete(userId);
          const updatedFavoriteUserIds = JSON.stringify([...favoriteUserIds]);
          localStorage.setItem('favoriteUserId', updatedFavoriteUserIds);
          console.log(localStorage.getItem('favoriteUserId'));
          alert("deleted from favourites")
        }
      };
      
      
      
      
      
      
    useEffect(()=> {
        const userDetails = async () => {
            try {
                const userData = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
                setUser(userData.data);
            } catch (error) {
                console.log(error)
            }
        } 
        userDetails();
    }, [userId])
    if (!user) {
        return <div>Loading user details...</div>;
      }

  return (
    <div className='user-details'>
        <h2 className='title'>UserDetails</h2>
        <button onClick={()=>{navigate('/favourites')}}>favourites</button>
        <div className='detail-container'>
            <p>Name: {user.name}</p>
            <p>UserName: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            <button className='fav-btn' onClick={()=>{handelFavourite(user.id)}}>add to favourite <AiFillStar/></button>
            <button className='remove-btn' onClick={()=>{handelDelete(user.id)}} >Delete<AiFillDelete/></button>
        </div>
    </div>
  )
}

export default UserDetails