/**
 * models are used to structured the data 
 * 
 * Determines , how our data look like.
 */
export default class ProductModel{

    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id = _id;
        this.name = _name;
        this.desc = _desc;
        this.price = _price;
        this.imageUrl = _imageUrl;
    }
    // static methods can directly be accessed from class itself , 
    // we don't have to create instance for these
    static get(){
        return products;
    }
    static add(productObject){
      productObject.id = products.length + 1;
      products.push(productObject);
    }
    static getById(id){
      return products.find(p=> p.id == id) ;
    }
    static update(productObj)
    {
      const index = products.findIndex(p => p.id == productObj.id) ;
      products[index] = productObj ;
    }

}

/** Without using data-base */
var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      100.56,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      15.45,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    )
  ]