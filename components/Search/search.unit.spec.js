import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

describe('search', () => {
  test('should render a form', () => {
    render(<Search />);

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');

    fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  test('should call props.doSearch() with the user input', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');
    const inputText = 'some text here';
    const input = screen.getByRole('searchbox'); // searchbox para inputs de texto

    userEvent.type(input, inputText);

    fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });

  test('should render a input type equals search', () => {
    render(<Search doSearch={doSearch} />);
    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search');
  });

  test('should contan a placeholder in search input', () => {
    render(<Search doSearch={doSearch} />);
    const placeholder = screen.queryByPlaceholderText(/search/i);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(placeholder).toBeTruthy();
  });
});
