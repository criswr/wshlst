import '../styles/global.css';
import Header from "../components/Header"
import { Lato } from 'next/font/google'
import Footer from '../components/Footer'
import UserContextProvider from '../components/context/context';

export const metadata = {
  title: 'MGTA',
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
        <div className='min-h-screen flex flex-col'>
          <UserContextProvider>
            <Header />
            <div className="container mx-auto flex flex-1">
              {children}
            </div>
            <Footer />
          </UserContextProvider>
        </div>
      </body>
    </html>
  )
}
