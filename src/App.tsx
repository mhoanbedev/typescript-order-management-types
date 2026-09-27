import { useState } from 'react';
import { useFavoritesStore } from './store/favoritesStore';
import { ProductList } from './components/ProductList';
import { ComparisonPage } from './pages/ComparisonPage';
import { mockProducts } from './data/mockProducts';

function App() {
  const { favorites } = useFavoritesStore();
  const [showComparison, setShowComparison] = useState(false);

  if (showComparison) {
    return (
      <div>
        <div style={{
          padding: '20px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #e0e0e0',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <button
              onClick={() => setShowComparison(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              Quay lại
            </button>
          </div>
        </div>
        <ComparisonPage />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fafafa',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              marginBottom: '8px',
              color: '#222',
            }}>
              Cửa hàng yêu thích
            </h1>
            <p style={{
              color: '#666',
              fontSize: '14px',
              margin: '0',
            }}>
              Quản lý sản phẩm yêu thích của bạn bằng Zustand
            </p>
          </div>
          <button
            onClick={() => setShowComparison(true)}
            style={{
              padding: '10px 24px',
              backgroundColor: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            So sánh Zustand vs Redux
          </button>
        </div>

        <ProductList 
          products={favorites} 
          title={`Sản phẩm yêu thích (${favorites.length})`}
        />

        <ProductList 
          products={mockProducts} 
          title="Tất cả sản phẩm"
        />
      </div>
    </div>
  );
}

export default App;
