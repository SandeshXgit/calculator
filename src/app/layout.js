import './globals.css';

export const metadata = {
  title: 'Calculator – Next.js 15',
  description: 'Modern calculator built with Next.js and Tailwind',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}