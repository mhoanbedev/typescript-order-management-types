import React, { createContext, useState, ReactNode } from 'react'

interface AccordionContextType {
  openPanelId: string | null
  setOpenPanelId: (id: string | null) => void
}

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
)

interface AccordionProviderProps {
  children: ReactNode
}

export const AccordionProvider: React.FC<AccordionProviderProps> = ({
  children,
}) => {
  const [openPanelId, setOpenPanelId] = useState<string | null>(null)

  const value: AccordionContextType = {
    openPanelId,
    setOpenPanelId,
  }

  return (
    <AccordionContext.Provider value={value}>
      {children}
    </AccordionContext.Provider>
  )
}

