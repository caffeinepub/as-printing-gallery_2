import Text "mo:core/Text";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type ProductId = Nat;
  type Category = Text;

  type Product = {
    name : Text;
    description : Text;
    category : Text;
    priceText : Text;
    imageUrl : Text;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  type QuoteRequest = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    productName : Text;
    timestamp : Time.Time;
  };

  module QuoteRequest {
    public func compare(q1 : QuoteRequest, q2 : QuoteRequest) : Order.Order {
      Text.compare(q1.name, q2.name);
    };
  };

  type ProductInput = {
    name : Text;
    description : Text;
    category : Text;
    priceText : Text;
    imageUrl : Text;
  };

  var nextProductId : ProductId = 0;

  let products = Map.empty<ProductId, Product>();
  let quoteRequests = Map.empty<Text, QuoteRequest>();

  func getNextProductId() : ProductId {
    let currentId = nextProductId;
    nextProductId += 1;
    currentId;
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductById(id : ProductId) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category }).sort();
  };

  public shared ({ caller }) func addProduct(productInput : ProductInput) : async () {
    let productId = getNextProductId();
    let product : Product = {
      name = productInput.name;
      description = productInput.description;
      category = productInput.category;
      priceText = productInput.priceText;
      imageUrl = productInput.imageUrl;
    };
    products.add(productId, product);
  };

  public shared ({ caller }) func updateProduct(id : ProductId, productInput : ProductInput) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let updatedProduct : Product = {
          name = productInput.name;
          description = productInput.description;
          category = productInput.category;
          priceText = productInput.priceText;
          imageUrl = productInput.imageUrl;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func submitQuoteRequest(request : QuoteRequest) : async () {
    let id = request.name.concat("_").concat(request.productName);
    let newRequest : QuoteRequest = {
      name = request.name;
      email = request.email;
      phone = request.phone;
      message = request.message;
      productName = request.productName;
      timestamp = Time.now();
    };
    quoteRequests.add(id, newRequest);
  };

  public query ({ caller }) func getAllQuoteRequests() : async [QuoteRequest] {
    quoteRequests.values().toArray().sort();
  };

  public query ({ caller }) func getQuoteRequestsByProduct(productName : Text) : async [QuoteRequest] {
    quoteRequests.values().toArray().filter(func(q) { q.productName == productName }).sort();
  };
};
