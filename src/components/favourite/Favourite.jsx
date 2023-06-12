import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './favourite.css'

const Favourite = () => {
  const storedFavoriteUserIds = localStorage.getItem('favoriteUserId');
  console.log(storedFavoriteUserIds,"ids");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (storedFavoriteUserIds) {
        const favoriteUserIds = JSON.parse(storedFavoriteUserIds);
        const userRequests = favoriteUserIds.map((userId) =>
          axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        );

        try {
          const userResponses = await Promise.all(userRequests);
          const userDetails = userResponses.map((response) => response.data);
          setUsers(userDetails);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [storedFavoriteUserIds]);

  return (
    <div className="favourite-container">
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div className="user-details" key={user.id}>
              <h3>Name: {user.name}</h3>
              <p>
                Address: {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favourites">No favorite users found.</div>
      )}
    </div>
  );
  
};

export default Favourite;
