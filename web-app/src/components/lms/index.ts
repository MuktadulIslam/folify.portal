"use client";

import { ComponentType } from "react";

// Navbar components
import SimpleNavbar from "./navbar/SimpleNavbar";
import SearchNavbar from "./navbar/SearchNavbar";
import MegaMenuNavbar from "./navbar/MegaMenuNavbar";
import StickyNavbar from "./navbar/StickyNavbar";

// Footer components
import SimpleFooter from "./footer/SimpleFooter";
import MultiColumnFooter from "./footer/MultiColumnFooter";
import NewsletterFooter from "./footer/NewsletterFooter";
import MinimalFooter from "./footer/MinimalFooter";

// Card components
import CourseCard from "./card/CourseCard";
import InstructorCard from "./card/InstructorCard";
import TestimonialCard from "./card/TestimonialCard";
import StatsCard from "./card/StatsCard";

// Checkout components
import SimpleCheckout from "./checkout/SimpleCheckout";
import MultiStepCheckout from "./checkout/MultiStepCheckout";
import OrderSummary from "./checkout/OrderSummary";
import PaymentForm from "./checkout/PaymentForm";

// Subscription components
import PricingTable from "./subscription/PricingTable";
import ComparisonPlan from "./subscription/ComparisonPlan";
import SinglePlan from "./subscription/SinglePlan";
import FeatureGrid from "./subscription/FeatureGrid";

// Login components
import SimpleLogin from "./login/SimpleLogin";
import SocialLogin from "./login/SocialLogin";
import SplitScreenLogin from "./login/SplitScreenLogin";
import MinimalLogin from "./login/MinimalLogin";

// Registration components
import SimpleRegister from "./registration/SimpleRegister";
import MultiStepRegister from "./registration/MultiStepRegister";
import AvatarRegister from "./registration/AvatarRegister";
import SocialRegister from "./registration/SocialRegister";

export interface ComponentRegistryEntry {
  id: string;
  category: string;
  name: string;
  thumbnail?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<any>;
  defaultProps: Record<string, unknown>;
}

export const COMPONENT_CATEGORIES = [
  { id: "navbar", label: "Navbar" },
  { id: "footer", label: "Footer" },
  { id: "card", label: "Card" },
  { id: "checkout", label: "Checkout" },
  { id: "subscription", label: "Subscription Plan" },
  { id: "login", label: "Login" },
  { id: "registration", label: "Registration" },
] as const;

export const COMPONENT_REGISTRY: ComponentRegistryEntry[] = [
  // ─── Navbar ─────────────────────────────────────────
  {
    id: "navbar/SimpleNavbar",
    category: "navbar",
    name: "Simple Navbar",
    component: SimpleNavbar,
    defaultProps: {
      logoText: "LearnHub",
      links: [
        { label: "Courses", href: "/courses" },
        { label: "My Learning", href: "/learning" },
        { label: "Certificates", href: "/certificates" },
        { label: "Community", href: "/community" },
      ],
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "navbar/SearchNavbar",
    category: "navbar",
    name: "Search Navbar",
    component: SearchNavbar,
    defaultProps: {
      logoText: "LearnHub",
      links: [
        { label: "Browse", href: "/browse" },
        { label: "My Courses", href: "/courses" },
        { label: "Teach", href: "/teach" },
      ],
      showSearch: true,
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "navbar/MegaMenuNavbar",
    category: "navbar",
    name: "Mega Menu Navbar",
    component: MegaMenuNavbar,
    defaultProps: {
      logoText: "LearnHub",
      links: [
        { label: "Categories", href: "/categories" },
        { label: "Paths", href: "/paths" },
        { label: "For Business", href: "/business" },
        { label: "Resources", href: "/resources" },
      ],
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "navbar/StickyNavbar",
    category: "navbar",
    name: "Sticky Navbar",
    component: StickyNavbar,
    defaultProps: {
      logoText: "LearnHub",
      links: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Courses", href: "/courses" },
        { label: "Progress", href: "/progress" },
        { label: "Leaderboard", href: "/leaderboard" },
      ],
      sticky: true,
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },

  // ─── Footer ─────────────────────────────────────────
  {
    id: "footer/SimpleFooter",
    category: "footer",
    name: "Simple Footer",
    component: SimpleFooter,
    defaultProps: {
      companyName: "LearnHub",
      copyrightText: "2024 LearnHub. All rights reserved.",
      columns: [
        {
          heading: "Learning",
          links: [
            { label: "Courses", href: "/courses" },
            { label: "Tutorials", href: "/tutorials" },
            { label: "Resources", href: "/resources" },
          ],
        },
      ],
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "footer/MultiColumnFooter",
    category: "footer",
    name: "Multi-Column Footer",
    component: MultiColumnFooter,
    defaultProps: {
      companyName: "LearnHub",
      copyrightText: "2024 LearnHub. All rights reserved.",
      columns: [
        {
          heading: "Learning",
          links: [
            { label: "Courses", href: "/courses" },
            { label: "Paths", href: "/paths" },
            { label: "Certifications", href: "/certs" },
          ],
        },
        {
          heading: "Community",
          links: [
            { label: "Forum", href: "/forum" },
            { label: "Discord", href: "/discord" },
            { label: "Events", href: "/events" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "/about" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "footer/NewsletterFooter",
    category: "footer",
    name: "Newsletter Footer",
    component: NewsletterFooter,
    defaultProps: {
      companyName: "LearnHub",
      copyrightText: "2024 LearnHub. All rights reserved.",
      showNewsletter: true,
      columns: [
        {
          heading: "Resources",
          links: [
            { label: "Blog", href: "/blog" },
            { label: "Help Center", href: "/help" },
            { label: "Guides", href: "/guides" },
          ],
        },
      ],
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "footer/MinimalFooter",
    category: "footer",
    name: "Minimal Footer",
    component: MinimalFooter,
    defaultProps: {
      companyName: "LearnHub",
      copyrightText: "2024 LearnHub",
      columns: [
        {
          heading: "Links",
          links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ],
        },
      ],
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },

  // ─── Card ───────────────────────────────────────────
  {
    id: "card/CourseCard",
    category: "card",
    name: "Course Card",
    component: CourseCard,
    defaultProps: {
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
      badgeText: "Bestseller",
      rating: 4,
      price: "$49.99",
      buttonText: "Enroll Now",
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "card/InstructorCard",
    category: "card",
    name: "Instructor Card",
    component: InstructorCard,
    defaultProps: {
      title: "Dr. Sarah Johnson",
      description: "Expert in machine learning and data science with 10+ years of teaching experience.",
      badgeText: "Top Instructor",
      rating: 5,
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "card/TestimonialCard",
    category: "card",
    name: "Testimonial Card",
    component: TestimonialCard,
    defaultProps: {
      title: "Alex Rivera",
      description: "This platform completely changed my career. The courses are well-structured and the instructors are amazing!",
      badgeText: "Web Development Bootcamp",
      rating: 5,
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "card/StatsCard",
    category: "card",
    name: "Stats Card",
    component: StatsCard,
    defaultProps: {
      title: "12,500+",
      description: "Active Students Enrolled",
      badgeText: "Growing",
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },

  // ─── Checkout ───────────────────────────────────────
  {
    id: "checkout/SimpleCheckout",
    category: "checkout",
    name: "Simple Checkout",
    component: SimpleCheckout,
    defaultProps: {
      heading: "Your Cart",
      items: [
        { name: "React Masterclass", price: "$49.99", quantity: 1 },
        { name: "Node.js Fundamentals", price: "$39.99", quantity: 1 },
      ],
      totalLabel: "Total",
      buttonText: "Proceed to Payment",
      showCouponField: true,
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "checkout/MultiStepCheckout",
    category: "checkout",
    name: "Multi-Step Checkout",
    component: MultiStepCheckout,
    defaultProps: {
      heading: "Checkout",
      items: [
        { name: "Full Stack Bootcamp", price: "$199.99", quantity: 1 },
        { name: "UI/UX Design Course", price: "$79.99", quantity: 1 },
      ],
      totalLabel: "Total",
      buttonText: "Complete Purchase",
      showCouponField: true,
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "checkout/OrderSummary",
    category: "checkout",
    name: "Order Summary",
    component: OrderSummary,
    defaultProps: {
      heading: "Order Summary",
      items: [
        { name: "Python for Data Science", price: "$59.99", quantity: 1 },
        { name: "Machine Learning A-Z", price: "$89.99", quantity: 1 },
      ],
      totalLabel: "Total",
      buttonText: "Confirm Order",
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "checkout/PaymentForm",
    category: "checkout",
    name: "Payment Form",
    component: PaymentForm,
    defaultProps: {
      heading: "Payment Details",
      items: [
        { name: "Annual Subscription", price: "$299.99", quantity: 1 },
      ],
      totalLabel: "Total",
      buttonText: "Pay Now",
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },

  // ─── Subscription ──────────────────────────────────
  {
    id: "subscription/PricingTable",
    category: "subscription",
    name: "Pricing Table",
    component: PricingTable,
    defaultProps: {
      heading: "Choose Your Plan",
      plans: [
        {
          name: "Starter",
          price: "$9",
          period: "/month",
          features: ["5 Courses", "Basic Support", "Certificate"],
          buttonText: "Get Started",
        },
        {
          name: "Professional",
          price: "$29",
          period: "/month",
          features: ["Unlimited Courses", "Priority Support", "Certificate", "1-on-1 Mentoring"],
          highlighted: true,
          buttonText: "Go Pro",
        },
        {
          name: "Enterprise",
          price: "$99",
          period: "/month",
          features: ["Everything in Pro", "Team Management", "Custom Paths", "API Access"],
          buttonText: "Contact Sales",
        },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "subscription/ComparisonPlan",
    category: "subscription",
    name: "Comparison Plan",
    component: ComparisonPlan,
    defaultProps: {
      heading: "Compare Plans",
      plans: [
        {
          name: "Free",
          price: "$0",
          period: "/month",
          features: ["3 Courses", "Community Forum"],
          buttonText: "Start Free",
        },
        {
          name: "Pro",
          price: "$19",
          period: "/month",
          features: ["3 Courses", "Community Forum", "Certificates", "Priority Support", "Offline Access"],
          highlighted: true,
          buttonText: "Go Pro",
        },
        {
          name: "Team",
          price: "$49",
          period: "/month",
          features: ["3 Courses", "Community Forum", "Certificates", "Priority Support", "Offline Access", "Team Analytics", "Admin Panel"],
          buttonText: "Start Team",
        },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "subscription/SinglePlan",
    category: "subscription",
    name: "Single Plan",
    component: SinglePlan,
    defaultProps: {
      heading: "Premium Access",
      plans: [
        {
          name: "Premium",
          price: "$49",
          period: "/month",
          features: ["Unlimited Courses", "1-on-1 Mentoring", "Certificates", "Priority Support", "Offline Access", "Career Coaching"],
          highlighted: true,
          buttonText: "Start Learning",
        },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "subscription/FeatureGrid",
    category: "subscription",
    name: "Feature Grid",
    component: FeatureGrid,
    defaultProps: {
      heading: "What's Included",
      plans: [
        {
          name: "Basic",
          price: "$9",
          period: "/month",
          features: ["Video Courses", "Quizzes", "Community"],
          buttonText: "Choose Basic",
        },
        {
          name: "Pro",
          price: "$29",
          period: "/month",
          features: ["Video Courses", "Quizzes", "Community", "Projects", "Mentoring", "Certificates"],
          highlighted: true,
          buttonText: "Choose Pro",
        },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },

  // ─── Login ──────────────────────────────────────────
  {
    id: "login/SimpleLogin",
    category: "login",
    name: "Simple Login",
    component: SimpleLogin,
    defaultProps: {
      heading: "Welcome Back",
      subheading: "Sign in to continue learning",
      buttonText: "Sign In",
      showRememberMe: true,
      forgotPasswordText: "Forgot password?",
      backgroundColor: "#f0fdf4",
      color: "#166534",
    },
  },
  {
    id: "login/SocialLogin",
    category: "login",
    name: "Social Login",
    component: SocialLogin,
    defaultProps: {
      heading: "Sign In",
      subheading: "Choose your preferred method",
      buttonText: "Sign In with Email",
      showSocialButtons: true,
      showRememberMe: true,
      forgotPasswordText: "Forgot password?",
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "login/SplitScreenLogin",
    category: "login",
    name: "Split Screen Login",
    component: SplitScreenLogin,
    defaultProps: {
      heading: "Welcome Back",
      subheading: "Sign in to your account",
      buttonText: "Sign In",
      showSocialButtons: true,
      showRememberMe: true,
      forgotPasswordText: "Forgot password?",
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "login/MinimalLogin",
    category: "login",
    name: "Minimal Login",
    component: MinimalLogin,
    defaultProps: {
      heading: "Login",
      buttonText: "Continue",
      showRememberMe: false,
      forgotPasswordText: "Reset password",
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },

  // ─── Registration ──────────────────────────────────
  {
    id: "registration/SimpleRegister",
    category: "registration",
    name: "Simple Register",
    component: SimpleRegister,
    defaultProps: {
      heading: "Create Account",
      subheading: "Start your learning journey today",
      buttonText: "Register",
      fields: [
        { label: "Full Name", type: "text", placeholder: "Enter your full name" },
        { label: "Email", type: "email", placeholder: "Enter your email" },
        { label: "Password", type: "password", placeholder: "Create a password" },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "registration/MultiStepRegister",
    category: "registration",
    name: "Multi-Step Register",
    component: MultiStepRegister,
    defaultProps: {
      heading: "Join LearnHub",
      subheading: "Complete your profile in 3 easy steps",
      buttonText: "Create Account",
      fields: [
        { label: "Full Name", type: "text", placeholder: "Enter your name" },
        { label: "Email", type: "email", placeholder: "Enter your email" },
        { label: "Password", type: "password", placeholder: "Create a password" },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "registration/AvatarRegister",
    category: "registration",
    name: "Avatar Register",
    component: AvatarRegister,
    defaultProps: {
      heading: "Create Your Profile",
      subheading: "Personalize your learning experience",
      buttonText: "Get Started",
      showAvatar: true,
      fields: [
        { label: "Full Name", type: "text", placeholder: "Enter your name" },
        { label: "Email", type: "email", placeholder: "Enter your email" },
        { label: "Password", type: "password", placeholder: "Create a password" },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
  {
    id: "registration/SocialRegister",
    category: "registration",
    name: "Social Register",
    component: SocialRegister,
    defaultProps: {
      heading: "Sign Up",
      subheading: "Create your account",
      buttonText: "Register",
      showSocialButtons: true,
      fields: [
        { label: "Full Name", type: "text", placeholder: "Enter your name" },
        { label: "Email", type: "email", placeholder: "Enter your email" },
        { label: "Password", type: "password", placeholder: "Create a password" },
      ],
      backgroundColor: "#ffffff",
      color: "#166534",
    },
  },
];
