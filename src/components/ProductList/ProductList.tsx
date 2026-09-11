import React from 'react'
import { usePagination } from '../../hooks/usePagination'
import './ProductList.css'

interface Product {
  id: number
  name: string
  price: number
  description: string
}

interface ProductListProps {
  products: Product[]
  itemsPerPage?: number
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  itemsPerPage = 6,
}) => {
  const { currentPage, totalPages, currentItems, next, prev, goToPage } =
    usePagination<Product>(products, itemsPerPage)

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="product-list-container">
      <h2>Danh sách sản phẩm ({products.length})</h2>

      <div className="products-grid">
        {currentItems.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-id">#{product.id}</div>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={prev}
          disabled={currentPage === 1}
        >
          ← Trước
        </button>

        <div className="pagination-pages">
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`pagination-page ${
                page === currentPage ? 'active' : ''
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className="pagination-btn"
          onClick={next}
          disabled={currentPage === totalPages}
        >
          Sau →
        </button>
      </div>

      <div className="pagination-info">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  )
}
