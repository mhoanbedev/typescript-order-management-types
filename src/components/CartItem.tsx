import React from 'react'
import { useAppDispatch } from '../app/hooks'
import { removeFromCart, updateQuantity } from '../features/cart/cartSlice'
import type { CartItem as CartItemType } from '../features/cart/types'

interface CartItemProps {
  item: CartItemType
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch()

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  const handleDecrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '13px' }}>
      <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#1f2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
        <p style={{ margin: 0, color: '#059669', fontWeight: 600, fontSize: '12px' }}>${item.price.toFixed(2)}</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
        <button onClick={handleDecrement} style={{ width: '24px', height: '24px', padding: 0, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', borderRadius: '2px', fontWeight: 600, fontSize: '12px' }}>−</button>
        <input type="number" value={item.quantity} readOnly style={{ width: '30px', textAlign: 'center', border: '1px solid #d1d5db', borderRadius: '2px', padding: '4px', fontSize: '12px' }} />
        <button onClick={handleIncrement} style={{ width: '24px', height: '24px', padding: 0, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer', borderRadius: '2px', fontWeight: 600, fontSize: '12px' }}>+</button>
      </div>
      <p style={{ fontWeight: 600, color: '#1f2937', margin: 0, flexShrink: 0, minWidth: '50px', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</p>
      <button onClick={handleRemove} style={{ padding: '4px 8px', background: '#fca5a5', color: '#dc2626', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', fontWeight: 500, flexShrink: 0 }}>Xóa</button>
    </div>
  )
}
