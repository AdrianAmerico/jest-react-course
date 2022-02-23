import { screen, render, fireEvent } from '@testing-library/react';
import ProductCard from './product-card';

const mockProduct = {
  title: 'Watch',
  price: '100',
  image:
    'https://s.yimg.com/aah/movadobaby/rado-hyperchrome-automatic-chronograph-men-s-watch-r32168155-22.jpg',
};

const addToCart = jest.fn();

const renderProductCard = () =>
  render(<ProductCard product={mockProduct} addToCart={addToCart} />);

describe('ProductCard', () => {
  renderProductCard();
  test('should render ProductCard', () => {
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  test('should display proper content', () => {
    renderProductCard();
    expect(
      screen.getByText(new RegExp(mockProduct.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockProduct.price, 'i')),
    ).toBeInTheDocument();

    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: mockProduct.image,
    });
  });

  test('should call props.addToCart() when button gets clicked', async () => {
    renderProductCard();

    const button = screen.getByRole('button');

    await fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(mockProduct);
  });
});
