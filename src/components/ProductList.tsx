import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchProducts } from '../features/products/productsSlice'
import { addToCart } from '../features/cart/cartSlice'

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: products, loading, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      dispatch(addToCart(product))
    }
  }

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center', fontSize: '16px' }}>Đang tải sản phẩm...</div>
  }

  if (error) {
    return <div style={{ padding: '20px', textAlign: 'center', fontSize: '16px', color: '#dc2626' }}>Lỗi: {error}</div>
  }

  return (
    <div style={{ flex: 1, padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
      <h2 style={{ marginTop: 0, fontSize: '20px', color: '#1f2937' }}>Danh sách sản phẩm</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px', textAlign: 'center', transition: 'all 0.2s' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
            <h3 style={{ fontSize: '14px', margin: '8px 0', color: '#1f2937' }}>{product.name}</h3>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0', minHeight: '30px', lineHeight: '1.3' }}>{product.description}</p>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#059669', margin: '8px 0' }}>${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleAddToCart(product.id)}
              style={{ width: '100%', padding: '8px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500, fontSize: '13px' }}
            >
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
