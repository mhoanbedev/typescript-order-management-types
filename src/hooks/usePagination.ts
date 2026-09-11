import { useState, useMemo } from 'react'

interface UsePaginationResult<T> {
  currentPage: number
  totalPages: number
  currentItems: T[]
  next: () => void
  prev: () => void
  goToPage: (page: number) => void
}

export const usePagination = <T,>(
  items: T[],
  itemsPerPage: number = 10
): UsePaginationResult<T> => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage) || 1
  }, [items.length, itemsPerPage])

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const next = () => {
    setCurrentPage((prev) => {
      const nextPage = prev + 1
      return nextPage > totalPages ? totalPages : nextPage
    })
  }

  const prev = () => {
    setCurrentPage((prev) => {
      const prevPage = prev - 1
      return prevPage < 1 ? 1 : prevPage
    })
  }

  const goToPage = (page: number) => {
    if (page < 1) {
      setCurrentPage(1)
    } else if (page > totalPages) {
      setCurrentPage(totalPages)
    } else {
      setCurrentPage(page)
    }
  }

  return {
    currentPage,
    totalPages,
    currentItems,
    next,
    prev,
    goToPage,
  }
}
