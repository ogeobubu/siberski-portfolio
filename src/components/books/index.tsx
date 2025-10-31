import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Book {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  pages: number;
  format: string;
}

const books: Book[] = [
  {
    id: 1,
    title: "Mastering AML Compliance",
    subtitle: "A Comprehensive Guide to Anti-Money Laundering",
    description: "This definitive guide covers everything you need to know about AML compliance, from regulatory requirements to practical implementation strategies. Perfect for compliance officers, risk managers, and financial professionals.",
    price: 49.99,
    originalPrice: 79.99,
    image: "/book1.jpg", // You'll need to add this image
    features: [
      "Complete AML framework overview",
      "Regulatory compliance strategies",
      "Risk assessment methodologies",
      "Case studies and real-world examples",
      "Implementation checklists",
      "Regulatory updates and trends"
    ],
    pages: 320,
    format: "Digital PDF + Print"
  },
  {
    id: 2,
    title: "Financial Crime Prevention",
    subtitle: "Advanced Techniques for Modern Banking",
    description: "Learn advanced techniques for preventing financial crimes in today's digital banking environment. This book combines theoretical knowledge with practical tools for effective crime prevention.",
    price: 39.99,
    originalPrice: 59.99,
    image: "/book2.jpg", // You'll need to add this image
    features: [
      "Digital banking security",
      "Fraud detection algorithms",
      "Transaction monitoring systems",
      "Regulatory reporting requirements",
      "Risk-based approaches",
      "Technology integration strategies"
    ],
    pages: 280,
    format: "Digital PDF + Print"
  }
];

const Books: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const processPayment = () => {
    // Placeholder for payment processing
    alert(`Redirecting to payment for "${selectedBook?.title}" - Integration with payment processor needed`);
    closeModal();
  };

  // PayPal configuration - Replace with your actual PayPal client ID
  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID",
    currency: "USD",
    intent: "capture" as const,
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="books">
        <div className="booksContainer">
        <motion.div
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="headerTop">
            <Link href="/" className="backButton">
              ← Back to Home
            </Link>
          </div>
          <h1>My Books</h1>
          <p>Expert insights on AML compliance and financial crime prevention</p>
        </motion.div>

        <div className="booksGrid">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              className="bookCard"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="bookImage">
                <img src={book.image} alt={`${book.title} - ${book.subtitle} book cover`} loading="lazy" />
                {book.originalPrice && (
                  <div className="discountBadge">
                    SAVE ${(book.originalPrice - book.price).toFixed(2)}
                  </div>
                )}
              </div>

              <div className="bookContent">
                <h2>{book.title}</h2>
                <h3>{book.subtitle}</h3>
                <p className="description">{book.description}</p>

                <div className="bookDetails">
                  <div className="detail">
                    <span className="label">Pages:</span>
                    <span className="value">{book.pages}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Format:</span>
                    <span className="value">{book.format}</span>
                  </div>
                </div>

                <div className="features">
                  <h4>What's Inside:</h4>
                  <ul>
                    {book.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="pricing">
                  <div className="priceContainer">
                    <span className="currentPrice">${book.price}</span>
                    {book.originalPrice && (
                      <span className="originalPrice">${book.originalPrice}</span>
                    )}
                  </div>
                  <button
                    className="purchaseBtn"
                    onClick={() => handlePurchase(book)}
                  >
                    Purchase Now
                  </button>
                </div>

                {/* Internal Links */}
                <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
                  <Link href="/blog" style={{ color: '#666', textDecoration: 'none', marginRight: '15px' }}>
                    📝 Related Blog Posts
                  </Link>
                  <Link href="/#About" style={{ color: '#666', textDecoration: 'none' }}>
                    👤 About the Author
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedBook && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="modalContent">
            <div className="modalHeader">
              <h2>Complete Your Purchase</h2>
              <button className="closeBtn" onClick={closeModal}>×</button>
            </div>

            <div className="modalBody">
              <div className="selectedBook">
                <img src={selectedBook.image} alt={`${selectedBook.title} - ${selectedBook.subtitle} book cover`} />
                <div className="bookInfo">
                  <h3>{selectedBook.title}</h3>
                  <p>{selectedBook.subtitle}</p>
                  <div className="price">${selectedBook.price}</div>
                </div>
              </div>

              <div className="paymentForm">
                <h4>Complete Payment</h4>
                <p>Choose your payment method below:</p>

                <div className="paypalSection">
                  <PayPalButtons
                    createOrder={(_, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            amount: {
                              value: selectedBook.price.toString(),
                              currency_code: "USD",
                            },
                            description: `${selectedBook.title} - ${selectedBook.subtitle}`,
                          },
                        ],
                      });
                    }}
                    onApprove={async (_, actions) => {
                      if (actions.order) {
                        await actions.order.capture();
                        alert(`Payment successful! Thank you for purchasing "${selectedBook.title}". You will receive a download link via email.`);
                        closeModal();
                      }
                    }}
                    onError={(err) => {
                      console.error("PayPal error:", err);
                      alert("Payment failed. Please try again.");
                    }}
                  />
                </div>

                <div className="paymentNote">
                  <p>💳 Secure payment powered by PayPal</p>
                  <p>📧 Download link will be sent to your email after payment</p>
                </div>
              </div>
            </div>

            <div className="modalFooter">
              <button className="cancelBtn" onClick={closeModal}>
                Cancel
              </button>
              <button className="confirmBtn" onClick={processPayment}>
                Complete Purchase - ${selectedBook.price}
              </button>
            </div>
          </div>
        </motion.div>
      )}
      </div>
    </PayPalScriptProvider>
  );
};

export default Books;