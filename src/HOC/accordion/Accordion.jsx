import React, { useState } from 'react'
import './Accordion.css'
import edit_icon from '../../assets/edit-2-svgrepo-com.svg'
import plus_icon from '../../assets/plus-svgrepo-com.svg'
import minus_icon from '../../assets/minus-svgrepo-com.svg'

const withAccordion = (WrappedCompenent) => {
  return (props) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const handleClick = () => {
      setIsExpanded(prev => !prev)
    }
    return (
      <>
      <div className='accordion' onClick={handleClick}>
       <img src={edit_icon} className='accordion-icon' />
       <p className='accordion-name'>{props.name}</p>
       <img src={isExpanded ? minus_icon : plus_icon} className={`accordion-status`} />
      </div>
       <div className={`accordion-content ${isExpanded ? 'accordion-expand' : ''}`}>
          <WrappedCompenent {...props} /> 
        </div>

      </>
    )
  }
}

export default withAccordion