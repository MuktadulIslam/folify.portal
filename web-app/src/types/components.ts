export interface BaseComponentProps {
  fontSize?: string;
  color?: string;
  backgroundColor?: string;
  fontStyle?: "normal" | "italic";
  fontFamily?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
}

export interface NavbarProps extends BaseComponentProps {
  logoText: string;
  links: { label: string; href: string }[];
  showSearch?: boolean;
  sticky?: boolean;
}

export interface FooterProps extends BaseComponentProps {
  companyName: string;
  columns: { heading: string; links: { label: string; href: string }[] }[];
  copyrightText: string;
  showNewsletter?: boolean;
}

export interface CardProps extends BaseComponentProps {
  title: string;
  description: string;
  imageUrl?: string;
  badgeText?: string;
  rating?: number;
  price?: string;
  buttonText?: string;
}

export interface CheckoutProps extends BaseComponentProps {
  heading: string;
  items: { name: string; price: string; quantity: number }[];
  totalLabel: string;
  buttonText: string;
  showCouponField?: boolean;
}

export interface SubscriptionProps extends BaseComponentProps {
  heading: string;
  plans: {
    name: string;
    price: string;
    period: string;
    features: string[];
    highlighted?: boolean;
    buttonText: string;
  }[];
}

export interface LoginProps extends BaseComponentProps {
  heading: string;
  subheading?: string;
  buttonText: string;
  showSocialButtons?: boolean;
  showRememberMe?: boolean;
  forgotPasswordText?: string;
}

export interface RegistrationProps extends BaseComponentProps {
  heading: string;
  subheading?: string;
  buttonText: string;
  showSocialButtons?: boolean;
  showAvatar?: boolean;
  fields: { label: string; type: string; placeholder: string }[];
}

// Prop schema for dynamic form generation in the edit panel
export type PropFieldType = "string" | "boolean" | "number" | "color" | "select" | "array";

export interface PropFieldSchema {
  type: PropFieldType;
  label: string;
  options?: string[]; // for select type
  itemSchema?: Record<string, PropFieldSchema>; // for array type
}

export type PropSchema = Record<string, PropFieldSchema>;

export const BASE_PROP_SCHEMA: PropSchema = {
  fontSize: { type: "string", label: "Font Size" },
  color: { type: "color", label: "Text Color" },
  backgroundColor: { type: "color", label: "Background Color" },
  fontStyle: { type: "select", label: "Font Style", options: ["normal", "italic"] },
  fontFamily: {
    type: "select",
    label: "Font Family",
    options: ["Inter", "Arial", "Georgia", "Courier New", "Times New Roman", "Verdana"],
  },
  padding: { type: "string", label: "Padding" },
  margin: { type: "string", label: "Margin" },
  borderRadius: { type: "string", label: "Border Radius" },
};

export const NAVBAR_PROP_SCHEMA: PropSchema = {
  logoText: { type: "string", label: "Logo Text" },
  links: {
    type: "array",
    label: "Nav Links",
    itemSchema: {
      label: { type: "string", label: "Label" },
      href: { type: "string", label: "URL" },
    },
  },
  showSearch: { type: "boolean", label: "Show Search Bar" },
  sticky: { type: "boolean", label: "Sticky Header" },
};

export const FOOTER_PROP_SCHEMA: PropSchema = {
  companyName: { type: "string", label: "Company Name" },
  copyrightText: { type: "string", label: "Copyright Text" },
  showNewsletter: { type: "boolean", label: "Show Newsletter" },
  columns: {
    type: "array",
    label: "Footer Columns",
    itemSchema: {
      heading: { type: "string", label: "Heading" },
    },
  },
};

export const CARD_PROP_SCHEMA: PropSchema = {
  title: { type: "string", label: "Title" },
  description: { type: "string", label: "Description" },
  imageUrl: { type: "string", label: "Image URL" },
  badgeText: { type: "string", label: "Badge Text" },
  rating: { type: "number", label: "Rating (1-5)" },
  price: { type: "string", label: "Price" },
  buttonText: { type: "string", label: "Button Text" },
};

export const CHECKOUT_PROP_SCHEMA: PropSchema = {
  heading: { type: "string", label: "Heading" },
  totalLabel: { type: "string", label: "Total Label" },
  buttonText: { type: "string", label: "Button Text" },
  showCouponField: { type: "boolean", label: "Show Coupon Field" },
  items: {
    type: "array",
    label: "Items",
    itemSchema: {
      name: { type: "string", label: "Name" },
      price: { type: "string", label: "Price" },
      quantity: { type: "number", label: "Quantity" },
    },
  },
};

export const SUBSCRIPTION_PROP_SCHEMA: PropSchema = {
  heading: { type: "string", label: "Heading" },
  plans: {
    type: "array",
    label: "Plans",
    itemSchema: {
      name: { type: "string", label: "Plan Name" },
      price: { type: "string", label: "Price" },
      period: { type: "string", label: "Period" },
      buttonText: { type: "string", label: "Button Text" },
      highlighted: { type: "boolean", label: "Highlighted" },
    },
  },
};

export const LOGIN_PROP_SCHEMA: PropSchema = {
  heading: { type: "string", label: "Heading" },
  subheading: { type: "string", label: "Subheading" },
  buttonText: { type: "string", label: "Button Text" },
  showSocialButtons: { type: "boolean", label: "Show Social Buttons" },
  showRememberMe: { type: "boolean", label: "Show Remember Me" },
  forgotPasswordText: { type: "string", label: "Forgot Password Text" },
};

export const REGISTRATION_PROP_SCHEMA: PropSchema = {
  heading: { type: "string", label: "Heading" },
  subheading: { type: "string", label: "Subheading" },
  buttonText: { type: "string", label: "Button Text" },
  showSocialButtons: { type: "boolean", label: "Show Social Buttons" },
  showAvatar: { type: "boolean", label: "Show Avatar Upload" },
  fields: {
    type: "array",
    label: "Form Fields",
    itemSchema: {
      label: { type: "string", label: "Label" },
      type: { type: "select", label: "Type", options: ["text", "email", "password", "tel"] },
      placeholder: { type: "string", label: "Placeholder" },
    },
  },
};

export const CATEGORY_PROP_SCHEMAS: Record<string, PropSchema> = {
  navbar: NAVBAR_PROP_SCHEMA,
  footer: FOOTER_PROP_SCHEMA,
  card: CARD_PROP_SCHEMA,
  checkout: CHECKOUT_PROP_SCHEMA,
  subscription: SUBSCRIPTION_PROP_SCHEMA,
  login: LOGIN_PROP_SCHEMA,
  registration: REGISTRATION_PROP_SCHEMA,
};
