import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from './AllProducts';
import ProductOrdering from './ProductOrdering';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function AllSnowboards(props) {
  const { products } = useContext(ProductContext);
  const [sortedProducts, setSortedProducts] = useState([]);

  const finalProds = sortedProducts.length > 0 ? sortedProducts : products;

  return (
    <Container>
      <ProductOrdering
        setSortedProducts={setSortedProducts}
        products={products}
      />
      <CardGroup>
        {finalProds
          .filter((product) => product.id && product.type === 'snowboard')
          .map((product) => (
            <Col key={product.id}>
              <Card
                className='mb-2'
                style={{
                  width: '30rem',
                  height: '50rem',
                  color: '#4e4c4b',
                  border: 'none',
                }}
              >
                <Link to={`/products/${product.id}`}>
                  <Card.Img
                    variant='top'
                    src={product.image_url}
                  />
                </Link>
                <Link
                  style={{ color: '#4e4c4b', textDecoration: 'none' }}
                  to={`/products/${product.id}`}
                >
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                </Link>
              </Card>
            </Col>
          ))}
      </CardGroup>
    </Container>
  );
}
