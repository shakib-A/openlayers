import React, { useContext } from 'react'
import './SideBarNav.css'
import hamburger_icon from '../../assets/hamburger-menu-svgrepo-com.svg'
import close_icon from '../../assets/close-svgrepo-com.svg'

// HOC Accordion
import withAccordion from '../../HOC/accordion/Accordion'
import LocationList from '../locationList/LocationList'
import { infoContext } from '../../context/infoContext/InfoContextProvider'

const LocationListWithAccordion = withAccordion(LocationList)

const SideBarNav = () => {

    const { infoStore: { isSideExpanded }, dispatchInfo } = useContext(infoContext)

  return (
    <>
        <div className={`side-nav ${isSideExpanded ? "" : "collapse"}`}>  
            <div className='side-nav-item'>
                <img onClick={() => dispatchInfo({ type: "TOGGLE_SIDEBAR_STATE" })} src={isSideExpanded ? close_icon : hamburger_icon} />
            </div>
            <LocationListWithAccordion
              name={'Location List'}
            />
        </div>
    </>
  )
}

export default SideBarNav