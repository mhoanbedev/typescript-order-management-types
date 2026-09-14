import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { clearCart } from '../features/cart/cartSlice'
import { CartItem } from './CartItem'

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, total } = useAppSelector((state) => state.cart)

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <div style={{ flex: 1, padding: '20px', background: '#f9fafb', borderRadius: '8px', maxWidth: '400px', height: 'fit-content', position: 'sticky', top: '20px' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px', color: '#1f2937', marginBottom: '16px' }}>Giỏ hàng</h2>
        <p style={{ textAlign: 'center', color: '#9ca3af', padding: '20px 0' }}>Giỏ hàng trống</p>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, padding: '20px', background: '#f9fafb', borderRadius: '8px', maxWidth: '400px', height: 'fit-content', position: 'sticky', top: '20px' }}>
      <h2 style={{ marginTop: 0, fontSize: '20px', color: '#1f2937', marginBottom: '16px' }}>Giỏ hàng ({items.length})</h2>
      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '16px', border: '1px solid #e5e7eb', borderRadius: '4px', background: 'white' }}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div style={{ background: 'white', padding: '12px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 600, color: '#1f2937', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
          <span>Tổng:</span>
          <span style={{ color: '#059669', fontSize: '18px' }}>${total.toFixed(2)}</span>
        </div>
        <button style={{ width: '100%', padding: '10px', marginBottom: '8px', border: 'none', borderRadius: '4px', background: '#059669', color: 'white', cursor: 'pointer', fontWeight: 500 }}>Thanh toán</button>
        <button onClick={handleClearCart} style={{ width: '100%', padding: '10px', border: 'none', borderRadius: '4px', background: '#e5e7eb', color: '#1f2937', cursor: 'pointer', fontWeight: 500 }}>Xóa tất cả</button>
      </div>
    </div>
  )
}
