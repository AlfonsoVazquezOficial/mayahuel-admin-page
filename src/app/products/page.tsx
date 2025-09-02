'use client';
import React, { useEffect } from 'react'
import BasePage from '../common/BasePage'
import PulseSimpleItem from '../common/PulseSimpleItem';
import PaginationButtons from '../common/PaginationButtons';
import ProductItem from './components/ProductItem';
import Button from '../common/Button';
import { Product } from '../lib/types';
import { useRouter } from 'next/navigation';
import { GET_PAGINATED_PRODUCTS_URI } from '../lib/URIS';
import { getFunction } from '../lib/FetchUtils';

interface PaginatedResponse {
  products: Product[];
  lastVisible: string;
}

const ProductsPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);
    const [lastVisibles, setLastVisibles] = React.useState<string[]>([]);
    const router = useRouter();

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

  const fetchProducts = async (lastVisible: string | null) => {
    setIsLoading(true);
    try {
      let uri = GET_PAGINATED_PRODUCTS_URI;
      if (lastVisible) {
        uri += `&lastVisible=${lastVisible}`;
      }
      const data = await getFunction<PaginatedResponse>(uri, false);

      setProducts(data?.products || []);
      setLastVisibles((prev) => [...prev, data.lastVisible]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(null);
  }, []);

  useEffect(() => {
    // Aquí podrías manejar la lógica para cargar más
    // cuando se alcance el último visible.
    if (lastVisibles.length > 0) {
      console.log("Últimos visibles:", lastVisibles);
      // Lógica para cargar más si es necesario
    }
  }, [lastVisibles]);

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

            <Button
              color="primary"
              onClick={() => {
                router.push("/products/add");
              }}
              className="mb-4"
              size="large"
            >
              Agregar
            </Button>

            {products.length > 0 ? (
              products.map((product) => <ProductItem key={product.id} product={product} />)
            ) : (
              <div className="text-center text-gray-500">
                No hay productos disponibles.
              </div>
            )}

            <PaginationButtons
              onBack={() => {
                if (lastVisibles.length > 1) {
                  const newLastVisibles = lastVisibles.slice(0, -2);
                  const previousLastVisible =
                    newLastVisibles[newLastVisibles.length - 1] || null;
                  setLastVisibles(newLastVisibles);
                  fetchProducts(previousLastVisible);
                } else {
                  console.warn("No hay más páginas anteriores.");
                }
              }}
              onNext={() => {
                const lastVisible = lastVisibles[lastVisibles.length - 1];
                if (lastVisible == "") {
                  setLastVisibles([]);
                }
                fetchProducts(lastVisible);
              }}
              disableBack={false}
              disableNext={false}
              isLoading={false}
            />
          </div>
        )}
        </div>
    </BasePage>
  )
}

export default ProductsPage