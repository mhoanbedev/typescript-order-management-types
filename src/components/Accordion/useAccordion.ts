import { useContext } from 'react'
import { AccordionContext } from './AccordionContext'

export const useAccordion = () => {
  const context = useContext(AccordionContext)

  if (!context) {
    throw new Error(
      'useAccordion phải được gọi bên trong component con của Accordion.Root'
    )
  }

  return context
}

