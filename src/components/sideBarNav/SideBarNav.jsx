import React, { useState } from 'react'
import './SideBarNav.css'
import hamburger_icon from '../../assets/hamburger-menu-svgrepo-com.svg'
import close_icon from '../../assets/close-svgrepo-com.svg'

// HOC Accordion
import withAccordion from '../../HOC/accordion/Accordion'
import LocationList from '../locationList/LocationList'

const LocationListWithAccordion = withAccordion(LocationList)

const SideBarNav = () => {

    const [expand, setExpand] = useState(false)

  return (
    <>
        <div className={`side-nav ${expand ? "" : "collapse"}`}>  
            <div className='side-nav-item'>
                <img onClick={() => setExpand(prev => !prev)} src={expand ? close_icon : hamburger_icon} alt="" />
            </div>
            <LocationListWithAccordion
              name={'Location List'}
            />
        </div>
    </>
  )
}

export default SideBarNav