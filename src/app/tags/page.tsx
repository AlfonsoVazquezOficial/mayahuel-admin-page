'use client';
import React from 'react'
import BasePage from '../common/BasePage'
import PulseSimpleItem from '../common/PulseSimpleItem';
import PaginationButtons from '../common/PaginationButtons';
import TagItem from './components/TagItem';

const TagsPage = () => {

  const [isLoading, setIsLoading] = React.useState(false);

  const TEST_TAG = {
    id: '1',
    name: 'Etiqueta de Prueba',
    createdAt: new Date().toISOString(),
    color: '#FF5733', // Color de ejemplo,
    discount: 15, // Descuento de ejemplo
  }

  return (
    <BasePage title='Etiquetas' description={'Aquí puedes administrar las etiquetas de tus productos.'}>
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
            <TagItem tag={TEST_TAG} />
            <TagItem tag={TEST_TAG} />
            <TagItem tag={TEST_TAG} />
            <TagItem tag={TEST_TAG} />
            <TagItem tag={TEST_TAG} />

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

export default TagsPage