import { screen, render, fireEvent } from '@testing-library/react';
import CartItem from './cart-item';

const mockProduct = {
  title: 'Watch',
  price: '100',
  image:
    'https://s.yimg.com/aah/movadobaby/rado-hyperchrome-automatic-chronograph-men-s-watch-r32168155-22.jpg',
};

const renderCartItem = () => render(<CartItem product={mockProduct} />);

describe('CartItem', () => {
  renderCartItem();
  test('should render CartItem', () => {
    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  test('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(
      screen.getByText(new RegExp(mockProduct.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockProduct.price, 'i')),
    ).toBeInTheDocument();

    expect(image).toHaveProperty('alt', mockProduct.title);
  });

  test('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  test('should increse quantity by 1 when second button is clicked', async () => {
    renderCartItem();

    const [_, __, button] = screen.getAllByRole('button');

    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  test('should decrese quantity by 1 whem first button is clicked', async () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');

    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('0');
  });

  test('should be value incresed while clicked in first button and decrese in second button', async () => {
    renderCartItem();

    const [_, decreseButtom, increseButton] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(decreseButtom);

    expect(quantity.textContent).toBe('0');

    await fireEvent.click(increseButton);

    expect(quantity.textContent).toBe('1');
  });

  test('should not go below zero in the quantity', async () => {
    renderCartItem();

    const [_, button] = screen.getAllByRole('button');
    const quantity = screen.getByTestId('quantity');

    await fireEvent.click(button);

    expect(quantity.textContent).toBe('0');

    await fireEvent.click(button);
    await fireEvent.click(button);

    expect(quantity.textContent).toBe('0');
  });
});
