import type { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  title: string;
}

export const ProductList = ({ products, title }: ProductListProps) => {
  return (
    <div style={{ marginBottom: '50px' }}>
      <h2 style={{
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#222',
      }}>
        {title}
      </h2>
      {products.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '50px 20px',
          backgroundColor: '#fff',
          borderRadius: '4px',
          border: '1px solid #e0e0e0',
          color: '#999',
          fontSize: '14px',
        }}>
          <p>Không có sản phẩm nào</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
