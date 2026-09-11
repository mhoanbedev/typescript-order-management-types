import React from 'react'
import { AccordionProvider } from './AccordionContext'
import { useAccordion } from './useAccordion'
import './Accordion.css'

interface AccordionRootProps {
  children: React.ReactNode
}

const AccordionRoot: React.FC<AccordionRootProps> = ({ children }) => {
  return <AccordionProvider>{children}</AccordionProvider>
}

interface AccordionPanelProps {
  id: string
  children: React.ReactNode
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ id, children }) => {
  return (
    <div className="accordion-panel" data-panel-id={id}>
      {children}
    </div>
  )
}

interface AccordionHeaderProps {
  panelId: string
  children: React.ReactNode
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  panelId,
  children,
}) => {
  const { openPanelId, setOpenPanelId } = useAccordion()
  const isOpen = openPanelId === panelId

  const handleClick = () => {
    setOpenPanelId(isOpen ? null : panelId)
  }

  return (
    <button
      className={`accordion-header ${isOpen ? 'open' : ''}`}
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-controls={`panel-content-${panelId}`}
      type="button"
    >
      <span className="accordion-title">{children}</span>
      <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
    </button>
  )
}

interface AccordionContentProps {
  panelId: string
  children: React.ReactNode
}

const AccordionContent: React.FC<AccordionContentProps> = ({
  panelId,
  children,
}) => {
  const { openPanelId } = useAccordion()
  const isOpen = openPanelId === panelId

  return (
    <div
      id={`panel-content-${panelId}`}
      className={`accordion-content ${isOpen ? 'open' : ''}`}
      hidden={!isOpen}
      role="region"
      aria-labelledby={`accordion-header-${panelId}`}
    >
      <div className="accordion-content-inner">{children}</div>
    </div>
  )
}

export const Accordion = {
  Root: AccordionRoot,
  Panel: AccordionPanel,
  Header: AccordionHeader,
  Content: AccordionContent,
}

