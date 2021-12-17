//Import useStae, and useEffect
import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  //Create our state that should store the array of users
  const [users, setUsers] = useState([]);

  //UseEffect used to fetch users from the api.
  useEffect(() => {
    //Create an async function that fetches the users.
    const fetchUsers = async () => {
      //Use a try catch block here to handle async data.
      try {
        //We will call our fetch in the try. Make sure to use await keyword.
        await fetch('https://jsonplaceholder.typicode.com/users')
          .then((res) => {
            //The res parameter holds the raw data returned from the api.
            //We need to format the raw data into a json format.
            return res.json();
            //Now that the response is formatted into json we can use another .then() to set call our setUsers function from our useState.
          })
          .then((formattedData) => {
            //formattedData stores the json we returned from the previous .then()
            //This is where we are calling our setUsers function from the useState we created.
            return setUsers(formattedData);
          });
      } catch (err) {
        //err holds any error if our promise is rejected.
        //We can just print out the error here.
        console.log(err);
      }
    };
    //Because the function is declared but never called we need to call it at the bottom of our useEffect.
    fetchUsers();
  }, []);
  //Print the state variable holding our fetched users to make sure everything works.
  console.log(users);

  //**************************************** */
  //NOTE: Our users state variable contains an array of the fetched users.
  //**************************************** */

  //Now we will just print out the names and phone numbers of each person.
  return (
    <div className="app">
      <div className="usersList">
        {/* We need to map through the users array here to get access to the keys of each user in our array. */}
        {users.map((user) => {
          //Remember the .map() will loop through the array.
          //Each time the map looks at an obj in the array it temporarily stores that in the the user parameter we set above.
          //This happens for each object in the array because it is looping.

          //We want to return jsx so we can display the names and phone numbers.
          return (
            <div className="user">
              {/* Remember the reason we are able to access each objects key is because the map is taking each object in the array one at a time and we are using that objects key to display the things we want to jsx */}
              <h2>{user.name}</h2>
              <p>{user.phone}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
