import Header from "../components/Header"
/* import initAuth from "../modules/initAuth"


initAuth()
 */
export const metadata = {
  title: 'Wishlist',
  description: 'Crea tu wishlist',
}

 
export default function RootLayout({ children }) {
 return (
    <html lang="es">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
