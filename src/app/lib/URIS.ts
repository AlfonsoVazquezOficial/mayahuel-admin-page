const AUTH_IP = "localhost";
const AUTH_PORT = "8083";

const DATA_IP = "192.168.1.85";
const DATA_PORT = "8080";

const PAGE_SIZE = 5;

// Suppliers
const GET_PAGINATED_SUPPLIERS_URI = `http://${DATA_IP}:${DATA_PORT}/suppliers/get-paginated?size=${PAGE_SIZE}`;
const POST_SAVE_SUPPLIER_URI = `http://${DATA_IP}:${DATA_PORT}/suppliers/save`;
const GET_BY_ID_SUPPLIER_URI = `http://${DATA_IP}:${DATA_PORT}/suppliers/get-by-id`;
const POST_DELETE_SUPPLIER_URI = `http://${DATA_IP}:${DATA_PORT}/suppliers/delete`;
const GET_SUPPLIER_LIST_URI = `http://${DATA_IP}:${DATA_PORT}/suppliers/get-list`;

// Categories
const GET_PAGINATED_CATEGORIES_URI = `http://${DATA_IP}:${DATA_PORT}/categories/get-paginated?size=${PAGE_SIZE}`;
const POST_SAVE_CATEGORY_URI = `http://${DATA_IP}:${DATA_PORT}/categories/save`;
const POST_SAVE_CATEGORY_WITH_IMAGE_URI = `http://${DATA_IP}:${DATA_PORT}/categories/save-with-image`;
const GET_BY_ID_CATEGORY_URI = `http://${DATA_IP}:${DATA_PORT}/categories/get-by-id`;
const POST_DELETE_CATEGORY_URI = `http://${DATA_IP}:${DATA_PORT}/categories/delete`;
const GET_CATEGORY_LIST_URI = `http://${DATA_IP}:${DATA_PORT}/categories/get-list`;

// Tags
const GET_PAGINATED_TAGS_URI = `http://${DATA_IP}:${DATA_PORT}/tags/get-paginated?size=${PAGE_SIZE}`;
const POST_SAVE_TAG_URI = `http://${DATA_IP}:${DATA_PORT}/tags/save`;
const GET_BY_ID_TAG_URI = `http://${DATA_IP}:${DATA_PORT}/tags/get-by-id`;
const POST_DELETE_TAG_URI = `http://${DATA_IP}:${DATA_PORT}/tags/delete`;
const GET_TAG_LIST_URI = `http://${DATA_IP}:${DATA_PORT}/tags/get-list`;

// Notifications
const GET_PAGINATED_NOTIFICATIONS_URI = `http://${DATA_IP}:${DATA_PORT}/notifications/get-paginated?size=${PAGE_SIZE}`;
const POST_SAVE_NOTIFICATION_URI = `http://${DATA_IP}:${DATA_PORT}/notifications/save`;
const GET_BY_ID_NOTIFICATION_URI = `http://${DATA_IP}:${DATA_PORT}/notifications/get-by-id`;
const POST_DELETE_NOTIFICATION_URI = `http://${DATA_IP}:${DATA_PORT}/notifications/delete`;

// Products
const GET_PAGINATED_PRODUCTS_URI = `http://${DATA_IP}:${DATA_PORT}/products/get-paginated?size=${PAGE_SIZE}`;
const POST_SAVE_PRODUCT_URI = `http://${DATA_IP}:${DATA_PORT}/products/save`;
const POST_SAVE_PRODUCT_WITH_IMAGES_URI = `http://${DATA_IP}:${DATA_PORT}/products/save-with-images`;
const GET_BY_ID_PRODUCT_URI = `http://${DATA_IP}:${DATA_PORT}/products/get-by-id`;
const GET_PRODUCT_TAGS_URI = `http://${DATA_IP}:${DATA_PORT}/products/get-tags`;
const POST_DELETE_PRODUCT_URI = `http://${DATA_IP}:${DATA_PORT}/products/delete`;

// Order Statuses
const GET_PAGINATED_ORDER_STATUSES_URI = `http://${DATA_IP}:${DATA_PORT}/order-statuses/get-paginated?size=${PAGE_SIZE}`;
const POST_SAVE_ORDER_STATUS_URI = `http://${DATA_IP}:${DATA_PORT}/order-statuses/save`;
const GET_BY_ID_ORDER_STATUS_URI = `http://${DATA_IP}:${DATA_PORT}/order-statuses/get-by-id`;
const POST_DELETE_ORDER_STATUS_URI = `http://${DATA_IP}:${DATA_PORT}/order-statuses/delete`;
const GET_ALL_ORDER_STATUSES_URI = `http://${DATA_IP}:${DATA_PORT}/order-statuses/get-all`;

// Orders
const GET_PAGINATED_ORDERS_URI = `http://${DATA_IP}:${DATA_PORT}/orders/get-paginated?size=${PAGE_SIZE}`;
const GET_ORDER_STATUS_BY_ID_URI = `http://${DATA_IP}:${DATA_PORT}/orders/get-order-status-by-id`;
const POST_CHANGE_ORDER_STATUS_URI = `http://${DATA_IP}:${DATA_PORT}/orders/change-order-status`;
const GET_ORDER_BY_ID_URI = `http://${DATA_IP}:${DATA_PORT}/orders/get-by-id`;
const POST_CHANGE_SHIPPING_DATA_URI = `http://${DATA_IP}:${DATA_PORT}/orders/change-shipping-data`;
const POST_DELETE_ORDER_URI = `http://${DATA_IP}:${DATA_PORT}/orders/delete`;

// Shipping
const GET_SHIPPING_METHODS_URI = `http://${DATA_IP}:${DATA_PORT}/public/shipping/get-methods`;
const GET_SHIPPING_WARRANTIES_URI = `http://${DATA_IP}:${DATA_PORT}/public/shipping/get-warranties`;
const POST_SAVE_SHIPPING_METHOD_URI = `http://${DATA_IP}:${DATA_PORT}/shipping-methods/save`;
const GET_SHIPPING_METHOD_BY_ID_URI = `http://${DATA_IP}:${DATA_PORT}/shipping-methods/get-by-id`;
const POST_DELETE_SHIPPING_METHOD_URI = `http://${DATA_IP}:${DATA_PORT}/shipping-methods/delete`;
const POST_DELETE_SHIPPING_WARRANTY_URI = `http://${DATA_IP}:${DATA_PORT}/shipping-warranties/delete`;
const POST_SAVE_SHIPPING_WARRANTY_URI = `http://${DATA_IP}:${DATA_PORT}/shipping-warranties/save`;
const GET_SHIPPING_WARRANTY_BY_ID_URI = `http://${DATA_IP}:${DATA_PORT}/shipping-warranties/get-by-id`;

export {
    AUTH_IP,
    AUTH_PORT,
    DATA_IP,
    DATA_PORT,
    PAGE_SIZE,
    GET_PAGINATED_SUPPLIERS_URI,
    POST_SAVE_SUPPLIER_URI,
    GET_BY_ID_SUPPLIER_URI,
    POST_DELETE_SUPPLIER_URI,
    GET_SUPPLIER_LIST_URI,
    GET_PAGINATED_CATEGORIES_URI,
    POST_SAVE_CATEGORY_URI,
    POST_SAVE_CATEGORY_WITH_IMAGE_URI,
    GET_BY_ID_CATEGORY_URI,
    POST_DELETE_CATEGORY_URI,
    GET_CATEGORY_LIST_URI,
    GET_PAGINATED_TAGS_URI,
    POST_SAVE_TAG_URI,
    GET_BY_ID_TAG_URI,
    POST_DELETE_TAG_URI,
    GET_TAG_LIST_URI,
    GET_PAGINATED_NOTIFICATIONS_URI,
    POST_SAVE_NOTIFICATION_URI,
    GET_BY_ID_NOTIFICATION_URI,
    POST_DELETE_NOTIFICATION_URI,
    GET_PAGINATED_PRODUCTS_URI,
    POST_SAVE_PRODUCT_URI,
    POST_SAVE_PRODUCT_WITH_IMAGES_URI,
    GET_BY_ID_PRODUCT_URI,
    GET_PRODUCT_TAGS_URI,
    POST_DELETE_PRODUCT_URI,
    GET_PAGINATED_ORDER_STATUSES_URI,
    POST_SAVE_ORDER_STATUS_URI,
    GET_BY_ID_ORDER_STATUS_URI,
    POST_DELETE_ORDER_STATUS_URI,
    GET_PAGINATED_ORDERS_URI,
    GET_ORDER_STATUS_BY_ID_URI,
    GET_ALL_ORDER_STATUSES_URI,
    POST_CHANGE_ORDER_STATUS_URI,
    GET_SHIPPING_METHODS_URI,
    GET_SHIPPING_WARRANTIES_URI,
    GET_ORDER_BY_ID_URI,
    POST_CHANGE_SHIPPING_DATA_URI,
    POST_DELETE_ORDER_URI,
    POST_SAVE_SHIPPING_METHOD_URI,
    GET_SHIPPING_METHOD_BY_ID_URI,
    POST_DELETE_SHIPPING_METHOD_URI,
    POST_DELETE_SHIPPING_WARRANTY_URI,
    POST_SAVE_SHIPPING_WARRANTY_URI,
    GET_SHIPPING_WARRANTY_BY_ID_URI
}