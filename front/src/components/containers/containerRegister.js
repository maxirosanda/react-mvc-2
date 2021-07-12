import React , { useState, useEffect } from 'react'
import Register from '../renders/register'
import ButtonLink from '../Button/ButtonLink'
const axios = require('axios');

const ContainerRegister= () => {
    const [user, setUser] = useState({})


    const register = e => {
        e.preventDefault()
        
        var config = {
          method: 'post',
          url: 'http://localhost:8080/register',
          headers: { 
            'Content-Type': 'application/json', 
            'Cookie': 'connect.sid=s%3Apz4YEORTxBVS8gBVzr7BgKTYaWRHYQ2w.Icb4qbXZBED%2BfUh5Exzr4aExayL87sDwfqXK9tVqOaY'
          },
          data : user,
          withCredentials: true
        };
        
        axios(config)
        .then(function (response) {
         // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error)
          })
     /*
        axios.post('http://localhost:8080/register',user)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  */
      }


    const crearDatos = (e) => {
        setUser({...user,[e.target.name]: e.target.value});
        console.log(user)
      };


  

  return <React.Fragment> 
<div className="container mt-5">
      <h1>Login</h1>
      <ButtonLink texto='Productos' link={`/`}></ButtonLink>
  <div className="row justify-content-center">


     <Register crearDatos={crearDatos} register={register} />

  </div>
  </div>
  </React.Fragment>
  }
  
  export default ContainerRegister