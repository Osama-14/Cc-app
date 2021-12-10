import React, { useContext } from "react";
import { ContextProvider } from "../../../global/Context";
import "./model.css";

const Model = () => {
  const { model, closeModel,register , login } = useContext(ContextProvider);

  const [state, setstate] = React.useState({
    register: true ,
    login: false
  });
  const [inputs, setInputs] = React.useState({
    username: '',
    email: '',
    password: ''
  })
  const handleInput = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  }
  const formsToggle = () => {
    setstate({
      ...state,
      register: !state.register,
      login: !state.login,
    })
  };
  const closeForm = e => {
      const className = e.target.getAttribute('class');
      if (className === "model"){
        closeModel();

      }
  };
  const registerUser = (e) => {
    e.preventDefault();
    register(inputs);
    setInputs({username: "", email: "", password:""});
    
  }
  const loginUser = e => {
    e.preventDefault();
    login(inputs);
  }

  return <>{model ? <div className="model" onClick={closeForm}> 

    <div className="model__container">
      {state.register ?      <div className="model__form">
        <form onSubmit={registerUser}>
          <div className="model__group">
            <h1 style={{textAlign:"center"}}>ChitChat</h1>
         
          </div>
          <div className="model__group">
            <input type="text" name="username" className="model__input" placeholder="UserName" onChange={handleInput} value ={inputs.username} required/>
          </div>
          <div className="model__group">
            <input type="email" name="email" className="model__input" placeholder="Email" onChange={handleInput} value ={inputs.email} required/>
          </div>
          <div className="model__group">
            <input type="password" name="password" className="model__input" placeholder="password" onChange={handleInput} value ={inputs.password} required />
          </div>
          <div className="model__group">
            <input type="submit" value="Register" className="btn btn-smart" />
          </div>

          <div className="model__group">
            <span onClick={formsToggle}>Already Have An Account ?</span>

          </div>
        </form>

      </div> :  <div className="model__form">
        <form onSubmit={loginUser}>
          <div className="model__group">
            <h1  style={{textAlign:"center"}}>ChitChat</h1>
          </div>
          <div className="model__group">
            <input type="email" name="email" className="model__input" placeholder="Email" onChange={handleInput} value={inputs.email} required />
          </div>
          <div className="model__group">
            <input type="password" name="password" className="model__input" placeholder="password" onChange={handleInput} value={inputs.password} />
          </div>
          <div className="model__group">
            <input type="submit" value="Login" className="btn btn-smart" />
          </div>

          <div className="model__group">
            <span onClick={formsToggle}> Create a New Account ?</span>

          </div>
        </form>

      </div>}
 
    </div>
  
   </div> : ""}</>;
};

export default Model;



// import React from 'react'

// const Model = () => {
//   return (
//     <div>
//       <h1>SIGN OUT</h1>
//     </div>
//   )
// }

// export default Model
