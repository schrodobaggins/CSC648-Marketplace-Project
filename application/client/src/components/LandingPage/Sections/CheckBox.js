import React, { useState } from 'react'
import { Checkbox, Collapse } from 'antd';
import Collapsible from 'react-collapsible';
const { Panel } = Collapse


function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox
                onChange={() => handleToggle(value._id)}
                type="checkbox"
                checked={Checked.indexOf(value._id) === -1 ? false : true}
            />
            <span>{value.name}</span> 
            <br></br>
            {/* &nbsp;&nbsp; */}
        </React.Fragment>
    ))

    return (
        <div style={{
            display: 'block', width: 175, padding: 0
          }}>
              <Collapsible trigger = " > Location">
                    {renderCheckboxLists()}
             </Collapsible>
        </div>
    )
}

export default CheckBox
