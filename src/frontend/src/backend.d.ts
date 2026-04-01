import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductInput {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    priceText: string;
}
export type ProductId = bigint;
export type Time = bigint;
export interface QuoteRequest {
    name: string;
    productName: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    priceText: string;
}
export type Category = string;
export interface backendInterface {
    addProduct(productInput: ProductInput): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllQuoteRequests(): Promise<Array<QuoteRequest>>;
    getProductById(id: ProductId): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getQuoteRequestsByProduct(productName: string): Promise<Array<QuoteRequest>>;
    submitQuoteRequest(request: QuoteRequest): Promise<void>;
    updateProduct(id: ProductId, productInput: ProductInput): Promise<void>;
}
