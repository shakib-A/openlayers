import React, { useState, useContext, useEffect } from 'react'
import './Accordion.css'
import edit_icon from '../../assets/edit-2-svgrepo-com.svg'
import plus_icon from '../../assets/plus-svgrepo-com.svg'
import minus_icon from '../../assets/minus-svgrepo-com.svg'
import { infoContext } from '../../context/infoContext/InfoContextProvider'

const withAccordion = (WrappedCompenent) => {
  return (props) => {
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)
    const { infoStore: { isSideExpanded } } = useContext(infoContext)

    // if the side bar collapses, collapse all accordions.
    // ======================================
    useEffect(() => {
      if(!isSideExpanded) {
        setIsAccordionExpanded(false)
      }
    }, [isSideExpanded])
    // ======================================

    const handleClick = () => {
      setIsAccordionExpanded(prev => !prev)
    }
    return (
      <>
      <div className={isSideExpanded ? "accordion" : 'accordion accordion-sidebar-collapse'} onClick={isSideExpanded ? handleClick : null}>
       <img src={edit_icon} className='accordion-icon' />

       {/* only show accordian title and plus and minus icons when the sidebar is expanded */}
       {/* ================================================================== */}
       {isSideExpanded 
       ? <>
          <p className='accordion-name'>{props.name}</p>
          <img src={isAccordionExpanded ? minus_icon : plus_icon} className={`accordion-status`} />
         </>
       : null}
        {/* ================================================================== */}

      </div>
       <div className={`accordion-content ${isAccordionExpanded ? 'accordion-expand' : ''}`}>
          <WrappedCompenent {...props} /> 
        </div>

      </>
    )
  }
}

export default withAccordion