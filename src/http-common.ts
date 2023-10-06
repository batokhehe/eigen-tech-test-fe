import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
    'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization', 
  }
});