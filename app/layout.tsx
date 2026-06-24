import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700', '900']
});

const bodyFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: 'Igba Lode Fashion | Everyday Luxury for the Classy Woman',
  description: 'Premium, stylish ready-to-wear fashion and wholesale collections curated in Lagos for contemporary women.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable} bg-[#4A001F] text-[#FAF5F5] antialiased`}>
        {children}
      </body>
    </html>
  );
}