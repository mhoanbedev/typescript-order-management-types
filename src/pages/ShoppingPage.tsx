import React from 'react'
import { ProductList } from '../components/ProductList'
import { Cart } from '../components/Cart'

export const ShoppingPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <header style={{ textAlign: 'center', padding: '32px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px' }}>Shopping Cart Redux Toolkit</h1>
        <p style={{ margin: '0', fontSize: '14px', opacity: 0.9 }}>Bài tập tuần 3 - LTWNC</p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <ProductList />
        <Cart />
      </main>
    </div>
  )
}
