# CRUD App Unit Tests

This folder contains unit tests for the Book CRUD application. These tests demonstrate how to test React components and services using Jest and React Testing Library.

## Test Files

1. **BookServices.test.js** - Tests for the service layer that interacts with the API
2. **BookList.test.jsx** - Tests for the BookList component that displays all books
3. **CreateBook.test.js** - Tests for the CreateBook component that handles both adding and editing books
4. **ViewBook.test.js** - Tests for the ViewBook component that displays book details
5. **App.test.js** - Tests for the main App component and routing

## Running the Tests

To run these tests in your project:

1. Place these test files in your project's `src/__tests__` directory or alongside the components they test
2. Run `npm test` to execute Jest tests

## Test Coverage

These tests cover:

- API service functions (get, add, edit, delete)
- Component rendering
- User interactions (clicking buttons, filling forms)
- Component state management
- Error handling
- Routing functionality

## Notes

- The tests use Jest's mock functionality to mock dependencies like `axios` and child components
- The tests follow the Arrange-Act-Assert pattern for clarity
- The tests identified a bug in the ViewBook component where it displays the book title instead of the author name

## Additional Improvements

To further improve test coverage:

1. Add more edge cases and error scenarios
2. Implement integration tests that test component interactions
3. Add snapshot tests for UI consistency
4. Implement end-to-end tests with tools like Cypress
