import '../styles/global.css';
import Header from "../components/Header"


export const metadata = {
  title: 'Wishlist',
  description: 'Crea tu wishlist',
}


export default function RootLayout({ children }) {

 return (
    <html lang="es">
      <body className="container mx-auto bg-grey">
        <div className="container">

        <Header />
        {children}
        </div>
      </body>
    </html>
  )
}
