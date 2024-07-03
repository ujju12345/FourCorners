import React, { useState } from 'react';

const options = [
    { value: 'Apple', label: 'Apple' },
    { value: 'Banana', label: 'Banana' },
];

function ReactTagInputComponent() {
    const [values, setValues] = useState([]);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue && !values.includes(selectedValue)) {
            setValues([...values, selectedValue]);
            event.target.value = ''; // Clear the selection
        }
    };

    const handleRemoveValue = (index) => {
        setValues(values.filter((_, i) => i !== index));
    };

    return ( < div style = {
            {
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                padding: '10px',
                margin: '30px 30px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
            }
        } > {
            values.map((value, index) => ( <
                div key = { index }
                style = {
                    {
                        padding: '5px 10px',
                        margin: '2px',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '15px',
                        display: 'flex',
                        alignItems: 'center',
                    }
                } > { value } < span onClick = {
                    () => handleRemoveValue(index)
                }
                style = {
                    {
                        marginLeft: '10px',
                        cursor: 'pointer',
                        color: 'red',
                        fontWeight: 'bold',
                    }
                } >
                &
                times; < /span> </div >
            ))
        } < select onChange = { handleChange }
        style = {
            {
                padding: '10px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                outline: 'none',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                flex: '1',
                minWidth: '150px',
                marginRight: '10px',
            }
        } >
        <
        option value = ""
        disabled > Select a fruit < /option> {
        options.map((option) => ( < option key = { option.value }
            value = { option.value } > { option.label } < /option>
        ))
    } < /select> </div >
);
}

export default ReactTagInputComponent;