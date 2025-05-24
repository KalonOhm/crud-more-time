import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';

// Mock the components
jest.mock('../src/components/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header Component</header>;
  };
});

jest.mock('../src/components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer Component</footer>;
  };
});

jest.mock('../src/components/Booklist', () => {
  return function MockBookList() {
    return <div data-testid="book-list">BookList Component</div>;
  };
});

jest.mock('../src/components/CreateBook', () => {
  return function MockCreateBook() {
    return <div data-testid="create-book">CreateBook Component</div>;
  };
});

jest.mock('../src/components/ViewBook', () => {
  return function MockViewBook() {
    return <div data-testid="view-book">ViewBook Component</div>;
  };
});

describe('App Component', () => {
  it('renders App with header and footer', () => {
    // Act
    render(<App />);
    
    // Assert
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders the BookList component by default', () => {
    // Act
    render(<App />);
    
    // Assert
    expect(screen.getByTestId('book-list')).toBeInTheDocument();
  });

  // Test routing functionality separately
  describe('App routing', () => {
    it('renders BookList for / route', () => {
      // Arrange - We need to setup a proper BrowserRouter context
      window.history.pushState({}, '', '/');
      
      // Act
      render(<App />);
      
      // Assert
      expect(screen.getByTestId('book-list')).toBeInTheDocument();
    });

    it('renders BookList for /books route', () => {
      // Arrange
      window.history.pushState({}, '', '/books');
      
      // Act
      render(<App />);
      
      // Assert
      expect(screen.getByTestId('book-list')).toBeInTheDocument();
    });

    // Note: Additional route tests would be implemented with a routing test library
    // like @testing-library/react-router or by setting up the history more carefully
  });
});
