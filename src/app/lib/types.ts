export type Supplier = {
    id: string; // Unique identifier for the supplier
    name: string; // Name of the supplier
    email: string; // Email address of the supplier
    phone: string; // Phone number of the supplier
    address?: string; // Optional address of the supplier
    createdAt: string; // Date when the supplier was created
}

export type Category = {
    id: string; // Unique identifier for the category
    name: string; // Name of the category
    description?: string; // Optional description of the category
    createdAt: string; // Date when the category was created
    discount?: number; // Optional discount percentage for the category
    imageUrl?: string; // Optional URL for the category image
}

export type Tag = {
    id: string; // Unique identifier for the tag
    name: string; // Name of the tag
    createdAt: string; // Date when the tag was created
    color: string; // Color associated with the tag
    discount?: number; // Optional discount percentage for the tag
}

export type Product = {
    id: string; // Unique identifier for the product
    name: string; // Name of the product
    description?: string; // Optional description of the product
    price: number; // Price of the product
    stock: number; // Stock quantity of the product
    categoryId: string; // ID of the category this product belongs to
    supplierId?: string; // Optional ID of the supplier for this product
    tags?: Tag[]; // Optional array of tags associated with the product
    createdAt: string; // Date when the product was created
    images?: string[]; // Optional array of image URLs for the product
    discount?: number; // Optional discount percentage for the product
    minimumStock?: number; // Optional minimum stock quantity for the product
}

export type OrderStatus = {
    id: string; // Unique identifier for the order status
    name: string; // Name of the order status (e.g., "Pending", "Completed")
    createdAt: string; // Date when the order status was created
}

export type OrderPaymentDetails = {
    id: string; // Unique identifier for the order
    name: string; // Name of the client who placed the order
    email: string; // Email address of the client
    phone: string; // Phone number of the client
    method: string; // Payment method used for the order
    paymentIntentClientSecret: string; // Optional payment ID if available
    status: string; // Status of the payment (e.g., "Paid", "Pending")

}

export type ProductDetailsCart = {
    productId: string;
    images: string[];
    name: string;
    pricePerUnit: number;
    finalPrice: number;
    quantity: number;
    priceWithDiscount: number;
}

export type Order = {
    id: string; // Unique identifier for the order
    products: ProductDetailsCart[]; // Array of products in the order
    totalAmount: number; // Total amount for the order
    paymentDetails: OrderPaymentDetails; // Payment details for the order
    shippingDetails: Record<string, object>; // Shipping details for the order
    createdAt: string; // Date when the order was created
    updatedAt?: string; // Optional date when the order was last updated
    status: OrderStatus; // Current status of the order (e.g., pending, completed)
}

export type Notification = {
    id: string;
    title: string;
    message: string;
    color: string;
    timeInMs: number;
    date: string;
    isActive: boolean;
}

export type ShippingMethod = {
    name: string;
    price: number;
}

export type ShippingWarranty = {
    name: string;
    percentCost: number;
    warrantyPercent: number;
}