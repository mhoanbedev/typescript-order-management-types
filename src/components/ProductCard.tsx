import type { Product } from '../types/product';
import { useFavoritesStore } from '../store/favoritesStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorited = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <div style={{
      border: '1px solid #d9d9d9',
      borderRadius: '4px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      transition: 'border-color 0.2s',
    }}>
      <div style={{
        width: '100%',
        height: '180px',
        backgroundColor: '#f0f0f0',
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>
        <button
          onClick={handleToggleFavorite}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: favorited ? '#d32f2f' : '#fff',
            color: favorited ? '#fff' : '#999',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            transition: 'all 0.2s',
            fontWeight: '600',
          }}
          title={favorited ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          {favorited ? '♥' : '♡'}
        </button>
      </div>

      <div style={{ padding: '14px' }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          color: '#777',
          backgroundColor: '#f5f5f5',
          padding: '4px 8px',
          borderRadius: '3px',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {product.category}
        </span>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '8px',
          color: '#222',
          margin: '8px 0 0 0',
          lineHeight: '1.4',
        }}>
          {product.name}
        </h3>
        <p style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#d32f2f',
          margin: '0',
        }}>
          {product.price.toLocaleString('vi-VN')} đ
        </p>
      </div>
    </div>
  );
};
