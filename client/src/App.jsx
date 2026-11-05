import React from 'react'
import { useState, useEffect } from 'react'
import "./App.css";

const App = () =>{


  const [ name , setName] = useState("");
  const [ datetime , setDateTime ] = useState("2026-01-01T00:00");
  const [ description , setDescription] = useState("");
  const [ transactions , setTransactions] = useState([]);


  // useEffect(() => {
  //   const url = `${import.meta.env.VITE_API_URL}/transactions`;

  //   const fetchTransactions = async () => {
  //     try {
  //       const res = await fetch(url);
  //       if (!res.ok) {
  //         throw new Error(`Server responded with status: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       console.log("Fetched transactions:", data);
  //     } catch (err) {
  //       console.error("Fetch Error:", err);
  //     }
  // }});

  // useEffect(() =>{
  //   getTransactions().
  //           then((transactions) =>{
  //             setTransactions(transactions);
  //             console.log("Transactions state updated:", transactions);
  //           })
  // },[])

  async function getTransactions(){
    try{
       const url = `${import.meta.env.VITE_API_URL}/transactions` ||  "http://localhost:5000/api";
      //const url = `${process.env.REACT_APP_API_URL}/transactions`;


      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }
      // const data = await res.json();
      // console.log("Fetched transactions:", data);
      return await res.json();

    }catch(err){
      console.error("Fetch Errors", err);
    }
  }

  const addNewTransaction = async (e) => {
  e.preventDefault();

  const apiUrl = process.env.REACT_APP_API_URL;
  const url = `${apiUrl}/transaction`;


    const price = name.split("")[0];
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        
        price,
        name : name.substring(price.length +1),
        description,
        datetime,
      }),
    });

    if (!res.ok) throw new Error(`Server responded with status: ${res.status}`);

    const json = await res.json();
    console.log("Success:", json);

    setName("");
    setDescription("");
    setDateTime("2026-01-01T00:00");
  } catch (err) {
     console.error("Fetch Error:", err);
   }


  // Expect input like: "200 iphone"  or  "-50 rent"
  // price = first number, name = rest of the text
  const match = name.trim().match(/^(-?\d+(\.\d+)?)\s*(.+)$/);

  if (!match) {
    alert("Enter like: '200 iphone' (number then space then text)");
    return;
  }

  //const price = Number(match[1]);
  //const cleanName = match[3];

  
};

  return (
    <main>
      <h1>
        $200.<span>00</span>
      </h1>

      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text" value={name} onChange={(e) =>{ setName(e.target.value)}} placeholder='e.g. 200 iphone'/><br /> 
          <input type="datetime-local" value={datetime} onChange={(e) => { setDateTime(e.target.value)}} name="datetime" id="datetime" /> 
        </div>
       
        <div>
          <input type="text" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder='description'/>
        </div>

        <button type='submit'>add new transcation</button>
      </form>

      <div className="transcations">
        { transactions.length > 0 && transactions.map((transaction )=> (
           <div className="transcation" key={transaction._id}>
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>

            <div className="right">
              <div className={"price" + (transaction.price < 0 ? "red" : "green")}>
                ${transaction.price}
              </div>
              <div className="datetime">{new Date(transaction.datetime).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
export default App
  