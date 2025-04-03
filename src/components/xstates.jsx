import React, { useEffect, useState } from "react";
import axios from "axios";

const Xstateslist = () => {
  const [countrydata, setcountrydata] = useState([]);
  const [states, setStates] = useState([]);
  const [city, setcity] = useState([]);

  const [selectedCountry, setselectedCountry] = useState("");
  const [selectedState, setselectedState] = useState("");
  const [selectedCity, setselectedCity] = useState("");

  useEffect(() => {
    const fetchcountry = async () => {
      try {
        const res = await axios.get(
          " https://crio-location-selector.onrender.com/countries"
        );
        //console.log(res);
        setcountrydata(res.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchcountry();
  }, []);

  useEffect(() => {
    const fetchstate = async () => {
      if (selectedCountry) {
        try {
          const res = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
          );
          //console.log("states", res);
          setStates(res.data);
          setselectedState("");
          setcity([]);
          setselectedCity("");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchstate();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchcity = async () => {
      if (selectedCountry && selectedState) {
        try {
          const res = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
          );
          //console.log(res);
          setcity(res.data);
          setselectedCity("");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchcity();
  }, [selectedCountry, selectedState]);

  return (

    <div>
        <h1>Select Location</h1>
    
    <div  style={{ display:"flex", justifyContent:"center",  gap:"10px"}}>
   
      <select  style={{
        padding:"10px",
        
        
      }}
        value={selectedCountry}
        onChange={(e) => setselectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>

        {countrydata.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <select style={{
        padding:"10px"
        
      }}
        value={selectedState}
        onChange={(e) => setselectedState(e.target.value)}
        disabled={!selectedCountry}
      >
        <option value="" disabled>
          Select State
        </option>

        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select style={{
        padding:"10px"
        
      }}
        value={selectedCity}
        onChange={(e) => setselectedCity(e.target.value)}
        disabled={!selectedState}
      >
        <option value="" disabled>
          Select City
        </option>

        {city.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
};

export default Xstateslist;
