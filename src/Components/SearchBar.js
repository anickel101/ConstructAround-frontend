import React from 'react';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getDetails, getGeocode, getLatLng } from "use-places-autocomplete";

function SearchBar(props) {

    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => props.center.lat, lng: () => props.center.lng},
            radius: 0.5*1000
        }
    })

    const handleSubmit = async (e) => {
        if (e.key === "Enter") {
            try {
                const address = e.target.value
                const results = await getGeocode({address})
                const {lat, lng} = await getLatLng(results[0])  
                props.updateCenter(lat, lng)
            } catch(error) {
                console.log("uh oh - error in submit")
            }
        }
    }

    // const getStreetView = (address) => {

    //     let size = "600x400"
    //     let key = process.env.REACT_APP_GOOGLE_API_KEY

    //     return `http://localhost:3000/buildings/size/${size}/location/${address}/key/${key}`
    // }

    const handleSelect = async (e) => {
        try {
            const address = e
            // const streetView = getStreetView(address)
            const results = await getGeocode({address})
            const place_id = results[0].place_id
            const details = await getDetails(place_id)
            console.log("Address: ", address)
            console.log("Results[0]:", results[0])
            console.log("Details: ", details)
            const {lat, lng} = await getLatLng(results[0])
            setValue(e, false)
            clearSuggestions()
            props.updateCenter(lat, lng)
        } catch(error) {
            console.log("uh oh - error in search")
        }
    }
    

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <div className="searchbar">
            <Combobox 
                onSelect={handleSelect}>
                <ComboboxInput 
                    value={value} 
                    onChange={handleChange}
                    disabled={!ready}
                    placeholder="Search for an address..."
                    onKeyDown={handleSubmit}
                />
                <ComboboxPopover>
                    {status === "OK" && data.map(({id, description}, index) => <ComboboxOption key={index} value={description}>
                    </ComboboxOption>)}
                </ComboboxPopover>
            </Combobox>
        </div>
    )
}

export default SearchBar;