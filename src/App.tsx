import { Provider } from 'react-redux'
import { store } from './app/store'
import { ShoppingPage } from './pages/ShoppingPage'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ShoppingPage />
    </Provider>
  )
}

export default App
