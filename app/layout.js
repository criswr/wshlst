import '../styles/global.css';
import Header from "../components/Header"
import { Lato } from 'next/font/google'

export const metadata = {
  title: 'Wishlist',
  description: 'Crea tu wishlist',
}

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--lato-font',
})

export default function RootLayout({ children }) {

 return (
    <html lang="es">
      <body className={`container-fluid mx-auto bg-grey ${lato.variable}`}>
        <Header />
        <div className="container mx-auto">
          {children}
        </div>
      </body>
    </html>
  )
}
