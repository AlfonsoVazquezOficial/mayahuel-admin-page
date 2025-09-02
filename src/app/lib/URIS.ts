const AUTH_IP = "localhost";
const AUTH_PORT = "8083";

const DATA_IP = "192.168.1.81";
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
    POST_DELETE_ORDER_STATUS_URI
}