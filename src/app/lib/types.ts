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