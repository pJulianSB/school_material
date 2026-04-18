import { Html, Body, Head, Heading, Container, Text, Link } from '@react-email/components';

export const PurchaseReceiptEmail = ({ customerName, orderId, downloadLink }) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f6f9fc' }}>
        <Container style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <Heading>Thank you for your purchase, {customerName}!</Heading>
          <Text>Your order #{orderId} has been successfully processed.</Text>
          <Text>
            You can now access your study materials by clicking the link below:
          </Text>
          <Link href={downloadLink} style={{ color: '#007bff' }}>
            Download My Materials
          </Link>
        </Container>
      </Body>
    </Html>
  );
};

export default PurchaseReceiptEmail;
