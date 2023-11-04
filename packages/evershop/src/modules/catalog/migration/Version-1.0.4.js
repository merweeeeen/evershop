const { execute, insert } = require('@evershop/postgres-query-builder');

// eslint-disable-next-line no-multi-assign
module.exports = exports = async (connection) => {
  // Create a function to add event to the event table after a order is created
  await execute(
    connection,
    `CREATE OR REPLACE FUNCTION add_product_inventory_updated_event() RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO event (name, data)
      VALUES ('inventory_updated', json_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW)));
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;`
  );

  // Create a trigger to add event to the event table after a order is created
  await execute(
    connection,
    `CREATE TRIGGER "ADD_INVENTORY_UPDATED_EVENT_TRIGGER"
    AFTER UPDATE ON "product_inventory"
    FOR EACH ROW
    EXECUTE PROCEDURE add_product_inventory_updated_event();`
  );

  // Check if a default collection called "Featured Products" already exists
  const featuredProductsExists = await execute(
    connection,
    `SELECT EXISTS (SELECT 1 FROM collection WHERE code = 'homepage');`
  );

  if (featuredProductsExists.rows[0].exists) {
    return;
  }

  // Create a default collection called "Featured Products"
  const featuredProducts = await insert('collection')
    .given({
      name: 'Featured Products',
      code: 'homepage'
    })
    .execute(connection);

  // Create 4 default products and assign them to the "Featured Products" collection

  const product1 = await insert('product')
    .given({
      type: 'simple',
      visibility: 1,
      group_id: 1,
      sku: 'FMD-12345',
      price: 100,
      weight: 100,
      status: true,
      variant_group_id: null,
      category_id: 2
    })
    .execute(connection);

  await insert('product_inventory')
    .given({
      product_inventory_product_id: product1.insertId,
      qty: 100,
      manage_stock: true,
      stock_availability: true
    })
    .execute(connection);

  await insert('product_description')
    .given({
      product_description_product_id: product1.insertId,
      name: '1989 Vinyl Record',
      url_key: '1989-Taylor-Swift-Vinyl-Record',
      meta_title: '1989 Vinyl Record',
      meta_description: '1989 Vinyl Record',
      meta_keywords: '1989 Vinyl Record',
      description: '1989 Vinyl Record'
    })
    .execute(connection);

  await insert('product_image')
    .given({
      product_image_product_id: product1.insertId,
      image:
        'https://testbucketcme.s3.ap-southeast-1.amazonaws.com/1989taylor.jpeg'
    })
    .execute(connection);

  const product2 = await insert('product')
    .given({
      type: 'simple',
      visibility: 1,
      group_id: 1,
      sku: 'CLL-98765',
      price: 120,
      weight: 120,
      status: true,
      variant_group_id: null,
      category_id: 3
    })
    .execute(connection);

  await insert('product_inventory')
    .given({
      product_inventory_product_id: product2.insertId,
      qty: 120,
      manage_stock: true,
      stock_availability: true
    })
    .execute(connection);

  await insert('product_description')
    .given({
      product_description_product_id: product2.insertId,
      name: 'The Era World Tour T-Shirt',
      url_key: 'The-Era-World-Tour-T-Shirt',
      meta_title: 'The Era World Tour T-Shirt',
      meta_description: 'The Era World Tour T-Shirt',
      meta_keywords: 'The Era World Tour T-Shirt',
      description: 'The Era World Tour T-Shirt'
    })
    .execute(connection);

  await insert('product_image')
    .given({
      product_image_product_id: product2.insertId,
      image:
        'https://testbucketcme.s3.ap-southeast-1.amazonaws.com/eraShirt.jpeg'
    })
    .execute(connection);

  const product3 = await insert('product')
    .given({
      type: 'simple',
      visibility: 1,
      group_id: 1,
      sku: 'DSJ-54321',
      price: 120,
      weight: 120,
      status: true,
      variant_group_id: null,
      category_id: 3
    })
    .execute(connection);

  await insert('product_inventory')
    .given({
      product_inventory_product_id: product3.insertId,
      qty: 90,
      manage_stock: true,
      stock_availability: true
    })
    .execute(connection);

  await insert('product_description')
    .given({
      product_description_product_id: product3.insertId,
      name: 'Fearless Baseball Cap',
      url_key: 'Fearless-Baseball-Cap',
      meta_title: 'Fearless Baseball Cap',
      meta_description: 'Fearless Baseball Cap',
      meta_keywords: 'Fearless Baseball Cap',
      description: 'Fearless Baseball Cap'
    })
    .execute(connection);

  await insert('product_image')
    .given({
      product_image_product_id: product3.insertId,
      image:
        'https://testbucketcme.s3.ap-southeast-1.amazonaws.com/fearlesscap.png'
    })
    .execute(connection);

  const product4 = await insert('product')
    .given({
      type: 'simple',
      visibility: 1,
      group_id: 1,
      sku: 'SCS-24680',
      price: 90,
      weight: 90,
      status: true,
      variant_group_id: null,
      category_id: 1
    })
    .execute(connection);

  await insert('product_inventory')
    .given({
      product_inventory_product_id: product4.insertId,
      qty: 150,
      manage_stock: true,
      stock_availability: true
    })
    .execute(connection);

  await insert('product_description')
    .given({
      product_description_product_id: product4.insertId,
      name: 'RED Album',
      url_key: 'RED-Album',
      meta_title: 'RED Album',
      meta_description: 'RED Album',
      meta_keywords: 'RED Album',
      description: 'RED Album'
    })
    .execute(connection);

  await insert('product_image')
    .given({
      product_image_product_id: product4.insertId,
      image:
        'https://testbucketcme.s3.ap-southeast-1.amazonaws.com/redalbum.jpeg'
    })
    .execute(connection);
  // Assign products to the "Featured Products" collection
  await insert('product_collection')
    .given({
      collection_id: featuredProducts.insertId,
      product_id: product1.insertId
    })
    .execute(connection);
  await insert('product_collection')
    .given({
      collection_id: featuredProducts.insertId,
      product_id: product2.insertId
    })
    .execute(connection);
  await insert('product_collection')
    .given({
      collection_id: featuredProducts.insertId,
      product_id: product3.insertId
    })
    .execute(connection);
  await insert('product_collection')
    .given({
      collection_id: featuredProducts.insertId,
      product_id: product4.insertId
    })
    .execute(connection);
};
