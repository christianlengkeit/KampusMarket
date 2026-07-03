# KampusMarket

KampusMarket is a mobile marketplace application for students to browse and save second-hand products.  
This project was created for the Mobile Programming UAS assignment using React Native and Expo.

## Project Overview

KampusMarket is a Minimum Viable Product (MVP) for a student second-hand marketplace.  
The application allows users to log in, browse products, search and filter products by category, view product details, and save products to a wishlist.

## Main Features

- Simulated login and account registration
- Form validation for name, email, and password
- Protected main app access after login
- Bottom tab navigation
- Product catalog screen
- Product detail screen
- Wishlist screen
- Profile screen with user information
- Product search feature
- Category filter feature
- Product list using FlatList
- API integration with DummyJSON
- Loading and error states for API requests
- Password visibility toggle
- Light and dark mode support
- Wishlist management with add, remove, and clear actions

## Screens

- Login
- Home / Product Catalog
- Product Details
- Cart / Wishlist
- Profile

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- DummyJSON API

## API Source

Product data is loaded from DummyJSON:

```txt
https://dummyjson.com/products
```

## Project Structure
```
src/
    components/
        AppButton.tsx
        AppInput.tsx
        ProductCard.tsx
    
    context/
        AuthContext.tsx
        WishlistContext.tsx

    navigation/
        AppNavigation.tsx
    
    screens/
        LoginScreen.tsx
        HomeScreen.tsx
        ProductDetailScreen.tsx
        CartWishlistScreen.tsx
        ProfileScreen.tsx

    service/
        api.ts
    
    types/
        navigation.ts
        product.ts
```

## How to Run the Project
Install dependencies: 
```npm install```
Start the Expo development server: ```npx expo start```
Then scan the QR code using Expo Go on a mobile device.

## Login Test data
The app uses simulated login data.
You can use any valid name, email and password.

Exmaple:
```
Name: Steven
Email: steven@example.com
Password: 12345
```

## Notes
This project does not use a custom backend.
Product data is loaded from the public DummyJSON API.
Login and wishlist data are simulated inside the app state.

```txt
---
# Be sure, that `.gitignore` does exist

There should be a file at the Groundfolder:

.gitignore
```
The application also includes additional UI improvements such as dark mode and password visibility toggle.