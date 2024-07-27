import React from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'https://unpkg.com/ethers@5.2/dist/ethers.esm.min.js';
import {abis,contAddress,nestle_abi,nestle_contractAddress,mcd_contractAddress} from './abis_constant'
import { useState,useEffect, useRef } from 'react';
import { Outlet, Link } from "react-router-dom";
import Home from './Home.js';

export default function Header(props) {
   
    

  return (
<>
      <nav className="navbar navbar-expand-lg bg-body-tertiary"  data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">{props.title}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link"><Link to="/">hOME</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/swap">Swap</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/tokens">Tokens</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/form2">Hook form</Link></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" ><Link to="/form3">Formik form</Link></a>
        </li>
        <li className="nav-item">
            {(props.wallet ?<a className="nav-link">Connected</a>:<a className="nav-link" onClick={props.connectwallet}>Connect Wallet</a>)}
        </li>
       
      </ul>
      { props.searchbar ? <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>:<p>ret</p> }
    </div>
  </div>
</nav>
      <h5 id="addr"></h5>

            <Outlet />

</>
  )
}
Header.defaultProps = {
    title:'Your Title Here',
    searchbar:true
}
Header.propTypes = {
    title: PropTypes.string,
    searchbar: PropTypes.bool.isRequired
}