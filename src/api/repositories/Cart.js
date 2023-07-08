import BaseCrud from './BaseCrud';

class Cart extends BaseCrud{
    constructor() {
        super('cart');
      }
}

export default new Cart('cart');