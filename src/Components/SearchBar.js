import React from 'react';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

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
                console.log(e.target.value)
                const address = e.target.value
                const results = await getGeocode({address})
                const {lat, lng} = await getLatLng(results[0])

                console.log(lat, lng)
            
                props.updateCenter(lat, lng)
            } catch(error) {
                console.log("uh oh - error in submit")
            }
        }
    }

    const handleSelect = async (e) => {
        try {
            const address = e
            const results = await getGeocode({address})
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