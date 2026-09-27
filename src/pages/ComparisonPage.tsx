export const ComparisonPage = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    }}>
      <h1 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '30px',
        color: '#222',
      }}>
        So sánh: Zustand vs Redux Toolkit
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        marginBottom: '40px',
      }}>
        <div style={{
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          padding: '24px',
          backgroundColor: '#fff',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#222',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '2px solid #333',
          }}>
            Zustand (Lựa chọn của bài này)
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '10px',
            }}>
              Ưu điểm:
            </h3>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.7', fontSize: '13px' }}>
              <li>Setup đơn giản, ít boilerplate code</li>
              <li>Không cần Provider wrapper</li>
              <li>API sạch, dễ sử dụng với hooks</li>
              <li>Bundle size nhỏ (~2KB gzip)</li>
              <li>Phù hợp app nhỏ đến trung bình</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '10px',
            }}>
              Nhược điểm:
            </h3>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.7', fontSize: '13px' }}>
              <li>Dev tools support hạn chế</li>
              <li>Ecosystem nhỏ hơn Redux</li>
              <li>Middleware support ít</li>
            </ul>
          </div>
        </div>

        <div style={{
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          padding: '24px',
          backgroundColor: '#fff',
        }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#222',
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '2px solid #333',
          }}>
            Redux Toolkit
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '10px',
            }}>
              Ưu điểm:
            </h3>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.7', fontSize: '13px' }}>
              <li>Mạnh mẽ cho app lớn, state phức tạp</li>
              <li>Redux DevTools mạnh mẽ</li>
              <li>Middleware support toàn diện</li>
              <li>Ecosystem rộng, cộng đồng lớn</li>
              <li>Async thunk tích hợp sẵn</li>
            </ul>
          </div>

          <div>
            <h3 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#222',
              marginBottom: '10px',
            }}>
              Nhược điểm:
            </h3>
            <ul style={{ paddingLeft: '20px', color: '#444', lineHeight: '1.7', fontSize: '13px' }}>
              <li>Setup phức tạp, nhiều boilerplate</li>
              <li>Bắt buộc Provider wrapper</li>
              <li>Learning curve cao</li>
              <li>Bundle size lớn (~40KB gzip)</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{
        overflowX: 'auto',
        marginBottom: '40px',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #d9d9d9',
          backgroundColor: '#fff',
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                borderBottom: '1px solid #d9d9d9',
                color: '#222',
                fontSize: '13px',
              }}>
                Tiêu chí
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                borderBottom: '1px solid #d9d9d9',
                color: '#222',
                fontSize: '13px',
              }}>
                Zustand
              </th>
              <th style={{
                padding: '12px',
                textAlign: 'left',
                fontWeight: '600',
                borderBottom: '1px solid #d9d9d9',
                color: '#222',
                fontSize: '13px',
              }}>
                Redux Toolkit
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Độ phức tạp', zustand: 'Đơn giản', redux: 'Phức tạp' },
              { label: 'Bundle size', zustand: '~2KB', redux: '~40KB' },
              { label: 'Dev tools', zustand: 'Cơ bản', redux: 'Mạnh mẽ' },
              { label: 'Learning curve', zustand: 'Dễ', redux: 'Trung bình-Khó' },
              { label: 'Phù hợp với', zustand: 'App nhỏ-trung', redux: 'App lớn phức tạp' },
              { label: 'Provider wrapper', zustand: 'Không cần', redux: 'Bắt buộc' },
              { label: 'Async handling', zustand: 'Thủ công', redux: 'createAsyncThunk' },
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '12px', fontWeight: '600', color: '#222', fontSize: '13px' }}>
                  {row.label}
                </td>
                <td style={{ padding: '12px', color: '#444', fontSize: '13px' }}>
                  {row.zustand}
                </td>
                <td style={{ padding: '12px', color: '#444', fontSize: '13px' }}>
                  {row.redux}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        padding: '24px',
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#222',
          marginBottom: '12px',
        }}>
          Kết luận
        </h3>
        <p style={{
          color: '#444',
          lineHeight: '1.8',
          margin: '0',
          fontSize: '13px',
        }}>
          Dự án này chọn Zustand vì tính năng quản lý yêu thích đơn giản, không cần logic state phức tạp. Zustand cung cấp đủ sức mạnh với setup gọn gàng, bundle size nhỏ. Nếu app lớn hơn hoặc state trở nên phức tạp, Redux Toolkit sẽ tốt hơn nhờ có DevTools mạnh mẽ, middleware hỗ trợ, async thunk tích hợp sẵn, và cộng đồng lớn giúp debug dễ dàng.
        </p>
      </div>
    </div>
  );
};
