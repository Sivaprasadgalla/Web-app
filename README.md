# Web App

This is a small web application built with React, Redux, React Router, and Axios. It displays a list of products, allows users to view details of individual products, and provides functionality to edit existing products and create new ones.

## Features

- **Product List Page**: Displays a list of products fetched from a Dummy JSON API.
  - Each product shows name, price, and a brief description.
  - Clicking "View Details" navigates to the product detail page.
  - Click Edit icon to modify product details and save changes.

- **Product Detail Page**: Shows detailed information about a selected product.
  - Displays product image, name, price, description, and other relevant details.

- **Redux State Management**: Manages application state using Redux.
  - Stores the list of products and details of the selected product.
  - Append/Update product in the store.
  - Uses Redux actions and reducers to handle state changes.

- **React Router**: Handles navigation between the product list page and product detail page.

- **API Integration with Axios**: Fetches data from a Dummy JSON API using Axios.
  - Handles loading states and errors appropriately.

- **Styling**: Applies basic CSS for visual appeal and layout.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sivaprasadgalla/Web-app.git
   cd web-app

2. **Install Dependencies**   

    ```bash
    npm install

3. **Start the React application**

    ```bash
    npm start

4. **Usage**

    - **View Products**: Navigate to the home page at http://localhost:3000 to see a list of products.
    - **Search Product**: Enter your search term in input.
    - **View Product Details**: Click on "View Details" to see detailed information about a product.
    - **Edit Product**: Click on "Edit icon" to edit the product.
    - **Add Product**: Implemented functionality to create new products, held in memory.