import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Order } from "@/app/lib/types";

interface PaymentConfirmedPDFProps {
  order: Order;
}

// 🎨 Estilos PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f4f6f8",
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 11,
  },
  titleCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#343a40",
  },
  titleFirstWord: { color: "#6a7282" },
  titleSecondWord: { color: "#daa520" },

  headerCard: {
    backgroundColor: "#fccc49",
    color: "#353535",
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    textAlign: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  subtitle: { fontSize: 13, opacity: 0.9 },
  generatedDate: { fontSize: 11, marginTop: 4, color: "#555" },

  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    borderBottom: "1px solid #ccc",
    paddingBottom: 4,
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { fontWeight: "bold", width: "35%", color: "#333" },
  value: { width: "65%", color: "#555" },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderBottom: "1px solid #ccc",
    padding: 6,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    padding: 6,
  },
  cell: { flex: 1 },
  cellQty: { width: "10%", textAlign: "center" },
  cellPrice: { width: "20%", textAlign: "right" },
  cellTotal: { width: "20%", textAlign: "right" },

  totalContainer: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    borderTop: "1px solid #ced4da",
    paddingTop: 8,
    textAlign: "center",
  },
  footerText: { fontSize: 10, color: "#6c757d" },
  twoColumns: {
  flexDirection: "row",
  gap: 12, // separa las columnas
},
halfSection: {
  flex: 1,
  marginBottom: 20,
  backgroundColor: "#fff",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #ddd",
},

});

const PaymentConfirmedPDF = ({ order }: PaymentConfirmedPDFProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo / Marca */}
        <View style={styles.titleCard}>
          <Text style={styles.titleFirstWord}>Eth</Text>
          <Text style={styles.titleSecondWord}>os</Text>
        </View>

        {/* Encabezado */}
        <View style={styles.headerCard}>
          <Text style={styles.title}>Confirmación de Compra</Text>
          <Text style={styles.subtitle}>Pedido: {order.id}</Text>
          <Text style={styles.generatedDate}>
            Generado el:{" "}
            {new Date().toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {/* Datos del cliente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>
              {String(order.paymentDetails.name)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.value}>
              {String(order.paymentDetails.email)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>
              {String(order.shippingDetails["phone"] ?? "")}
            </Text>
          </View>
        </View>

        {/* Información de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles del Pago</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Método:</Text>
            <Text style={styles.value}>{order.paymentDetails.method}</Text>
          </View>
          {order.paymentDetails.paymentIntentClientSecret && (
            <View style={styles.row}>
              <Text style={styles.label}>ID de pago:</Text>
              <Text style={styles.value}>
                {order.paymentDetails.paymentIntentClientSecret}
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{order.paymentDetails.status}</Text>
          </View>
        </View>

        {/* Información de envío y garantía en paralelo */}
<View style={styles.twoColumns}>
  {/* Información de envío */}
  <View style={styles.halfSection}>
    <Text style={styles.sectionTitle}>Detalles de Envío</Text>
    <View style={styles.row}>
      <Text style={styles.label}>Método:</Text>
      <Text style={styles.value}>
        {String(
          (order.shippingDetails["shippingMethod"] as { name?: string } | undefined)
            ?.name ?? "No especificado"
        )}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Dirección:</Text>
      <Text style={styles.value}>
        {String(order.shippingDetails["address"] ?? "No especificada")}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Ciudad:</Text>
      <Text style={styles.value}>
        {String(order.shippingDetails["city"] ?? "")}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Código Postal:</Text>
      <Text style={styles.value}>
        {String(order.shippingDetails["postalCode"] ?? "")}
      </Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Costo:</Text>
      <Text style={styles.value}>
        $
        {String(
          (order.shippingDetails["shippingMethod"] as { price?: string } | undefined)
            ?.price ?? "No especificado"
        )}
      </Text>
    </View>
  </View>

  {/* Información de garantía */}
  {order.shippingDetails["shippingWarranty"] && (
    <View style={styles.halfSection}>
      <Text style={styles.sectionTitle}>Garantía</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>
          {String(
            (order.shippingDetails["shippingWarranty"] as { name?: string } | undefined)
              ?.name ?? "No especificado"
          )}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Costo (%):</Text>
        <Text style={styles.value}>
          {String(
            (order.shippingDetails["shippingWarranty"] as Record<string, unknown>)
              ["percentCost"]
          )}
          %
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Cobertura (%):</Text>
        <Text style={styles.value}>
          {String(
            (order.shippingDetails["shippingWarranty"] as Record<string, unknown>)
              ["warrantyPercent"]
          )}
          %
        </Text>
      </View>
    </View>
  )}
</View>


        {/* Lista de productos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.cell, { flex: 2 }]}>Producto</Text>
            <Text style={styles.cellQty}>Cant.</Text>
            <Text style={styles.cellPrice}>Precio</Text>
            <Text style={styles.cellTotal}>Total</Text>
          </View>
          {order.products.map((item) => (
            <View key={item.productId} style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
              <Text style={styles.cellQty}>{item.quantity}</Text>
              <Text style={styles.cellPrice}>
                ${item.pricePerUnit.toFixed(2)}
              </Text>
              <Text style={styles.cellTotal}>
                ${item.finalPrice.toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Total final */}
          <View style={styles.totalContainer}>
            <Text>Total:</Text>
            <Text>${order.totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Este documento ha sido generado automáticamente por el sistema de
            ventas.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PaymentConfirmedPDF;
