import React from 'react';
import Button from '@components/frontStore/cms/Button';

export default function FeaturedCategories() {
  return (
    <div className="mt-15">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 page-width">
        <div>
          <div className="text-center">
            <img src="/assets/album.jpeg" alt="" style={{ height: 225 }} />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">CDs</h3>
          <div className="mb-1">
            <p>
              Looking for the latest albums of your favourite artists ?
              Click below to find out more ! 
            </p>
          </div>
          <Button url="/Album" title="Shop Albums" variant="primary" />
        </div>
        <div>
          <div>
            <img src="/assets/vinyl.jpeg" alt="" style={{ height: 225 }} />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Vinyls</h3>
          <div className="mb-1">
            <p>
              Finding old records to listen or to add to your collection ?
              Click below to see more ! 
            </p>
          </div>
          <Button url="/vinyl" title="Shop Vinyl" variant="primary" />
        </div>
        <div>
          <div>
            <img src="/assets/shirt.jpeg" alt="" style={{ height: 225 }}/>
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Merchandise</h3>
          <div className="mb-1">
            <p>
              Looking for merchandise of your favourite artists ?
              Click here to see more ! 
            </p>
          </div>
          <Button url="/merchandise" title="Shop Merch" variant="primary" />
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
