export interface ProductVariant {
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  variants: ProductVariant[];
  sizes: string[];
  category: string;
  inStock: boolean;
  bestSeller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: string | null;
  selectedSize: string | null;
}

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  shippingMethod: string;
}