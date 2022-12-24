import React from 'react'
import Header from './Containers/Header'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ProductListing from './Containers/ProductListing'
import ProductDetail from './Containers/ProductDetail'

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<ProductListing/>}/>
                    <Route path='/product/:productId' element={<ProductDetail/>}/>
                    <Route path='*' element={<h1>Error 404! page not found</h1>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App