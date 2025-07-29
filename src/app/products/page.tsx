'use client';
import React from 'react'
import BasePage from '../common/BasePage'
import PulseSimpleItem from '../common/PulseSimpleItem';
import PaginationButtons from '../common/PaginationButtons';
import ProductItem from './components/ProductItem';

const ProductsPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_PRODUCT = {
    id: '1',
    name: 'Producto de Prueba',
    description: 'Descripción del producto de prueba.',
    price: 99.99,
    stock: 50,
    minimumStock: 10,
    discount: 15,
    createdAt: new Date().toISOString(),
    tags: [
      {
        id: 'tag1',
        name: 'Etiqueta 1',
        createdAt: new Date().toISOString(),
        color: '#FF5733',
        discount: 10,
      },
      {
        id: 'tag2',
        name: 'Etiqueta 2',
        createdAt: new Date().toISOString(),
        color: '#33FF57',
      }
    ],
    categoryId: 'category1',
    supplierId: 'supplier1',
    images: ['https://placehold.co/150'],

  }

  return (
    <BasePage title='Productos' description={'Aquí puedes administrar los productos de tu tienda.'}>
        <div>
          {isLoading ? (
          <div className="space-y-4">
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
            <PulseSimpleItem />
          </div>
        ) : (
          <div className="space-y-4">

            <ProductItem product={TEST_PRODUCT} />
            <ProductItem product={TEST_PRODUCT} />
            <ProductItem product={TEST_PRODUCT} />
            <ProductItem product={TEST_PRODUCT} />
            <ProductItem product={TEST_PRODUCT} />

            <PaginationButtons
              currentPage={6}
              totalPages={12}
              onBack={() => console.log("Back")}
              onNext={() => console.log("Next")}
              onPageChange={(page) => console.log("Change to", page)}
              isLoading={false}
            />
          </div>
        )}
        </div>
    </BasePage>
  )
}

export default ProductsPage