import { Html, Body, Head, Heading, Container, Text, Link } from 'react-email';

export const PurchaseReceiptEmail = ({ customerName, orderId, downloadLink }) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f6f9fc' }}>
        <Container style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <Heading>Gracias por tu compra, {customerName}!</Heading>
          <Text>Tu orden #{orderId} ha sido procesada correctamente.</Text>
          <Text>
            Ya puedes acceder a tus materiales de estudio haciendo clic en el siguiente enlace:
          </Text>
          <Link href={downloadLink} style={{ color: '#007bff' }}>
            Descargar Mis Materiales
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default PurchaseReceiptEmail;
