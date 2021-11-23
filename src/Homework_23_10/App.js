import React, {  useState, useEffect } from 'react';
import {  Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Film from "./Film";
import Infinite from './Infinite';
import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.REACT_APP_OMDB_ACCESS_KEY;

export default function App() {


  return (
      <Switch>
        <Route exact path="/Film" component={Film} />
        <Route exact path="/" render={() => <Infinite myKey={API_KEY}/>} />
      </Switch>
      
  );
}