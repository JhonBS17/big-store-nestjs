import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      database: process.env.MONGO_URL || 'mongodb://localhost:27017/big-store',
      collectionUser: process.env.COLLECTION_USER || 'coll_user',
      collectionCustomer: process.env.COLLECTION_CUSTOMER || 'coll_customer',
      collectionProduct: process.env.COLLECTION_PRODUCT || 'coll_product',
      collectionOrder: process.env.COLLECTION_ORDER || 'coll_order',
    },
    general: {
      port: process.env.PORT || 8080,
    },
  };
});
