# Wshlst (MGTA)

## Wshlst is a web app that allows the user to create a list of products that they would like to have, and share it on a public profile.

**Live at: [https://mgta.locu.cl](https://mgta.locu.cl)**

### ✨ Information
* Uses Next.js 13 with the experimental App folder.
* Uses React-based client and server components.
* Authentication with Google.
* User session management with NextAuth.
* Product data fetched from MercadoLibre's API (Amazon like eCommerce for Latin America).
* Connection to MongoDB noSQL database.
* Image storage with Firebase Storage.
* Images compression and adaptation with Compressor.js.

### ✨ Login
* Login with Google provider.
* Automatic registration when logging in for the first time, identified with email and paired with a generated UUID.

### ✨ Account
* Settings automatically saved when updated.
* Compression, resizing, renaming and reformatting of fit-for-purpose image as profile picture.
* Name and username validated with RegExp and exclusion of reserved or risk words.
* Date of birth with toggle to display information publicly.

### ✨ Categories and Search
* The items page renders the products results using the information obtained from the URL param, ether the category ID for categories, or the query params for searches.
* Reuse of the same component to render items from categories or user searches.
* Pagination of API results with infinite scroll, obtaining the following items when reaching the last one.
* Product cards conditionally show the add to favorites button if it is a simple product. If it is a variable product, goes to the item page to select variations.

### ✨ Item
* The item page renders the product using the ID obtained from the URL param.
* Variations are deactivated when selecting one that is not available in combination with these.
* If the set of variations only has one option, it is automatically selected.

### ✨ Profile
* Renders the username information obtained through the URL param.
* Buttons to edit profile or delete items from the list are rendered conditionally if the user identified with the URL param is the same authenticated.
* If the setting is enabled on the account, a countdown to the user's next birthday is displayed.

### ✨ Upcoming Features
* Authentication with more providers, different from Google.
* New sources for fetching products.


# Proyecto Wshlst (MGTA) - Español

## Wshlst es una web app que permite al usuario crear una lista de productos que le gustaría tener, y compartirla en un perfil público.

**Live en: [https://mgta.locu.cl](https://mgta.locu.cl)**

### ✨ Información
* Utiliza Next.js 13 con la carpeta experimental App.
* Utiliza componentes de cliente y de servidor basados en React.
* Autenticación con Google.
* Manejo de sesión de usuario con NextAuth.
* Obtención de datos de productos desde la API de MercadoLibre.
* Conexión a base de datos noSQL MongoDB.
* Almacenamiento de imágenes con Firebase Storage.
* Compresión y adecuación de imágenes con Compressor.js.

### ✨ Login
* Login con proveedor de Google.
* Registro automático al iniciar sesión por primera vez, identificado con email y emparejado con un UUID generado.

### ✨ Cuenta
* Actualización de ajustes guardada automáticamente al cambiar cualquiera.
* Compresión, redimensión, renombre y reformateo de imagen adecuada al propósito como foto de perfil.
* Nombre y nombre de usuario validados con RegExp y exclusión de palabras reservadas o de riesgo.
* Fecha de nacimiento con toggle para mostrar información públicamente.

### ✨ Categorías y Búsqueda
* La página de items muestra los resultados de productos utilizando la información obtenida del parámetro de URL, ya sea el ID de categoría para categorías o los parámetros de consulta para búsquedas.
* Reutilización del mismo componente para renderizar items de categorías o de búsquedas de usuario.
* Paginación de resultados de API con scroll infinito, obtención de siguientes items al llegar al último.
* Cards de producto muestran condicionalmente el botón para agregar a favoritos si es que es un producto simple. De ser un producto variable, lleva a la página de item para seleccionar variaciones.

### ✨ Item
* La página de item renderiza el producto utilizando el ID obtenido desde el parámetro de URL.
* Variaciones se desactivan al seleccionar alguna que no este disponible en combinación a estas.
* Si el conjunto de variaciones solamente tiene una opción, se selecciona automáticamente.

### ✨ Perfil
* Se renderiza la información del nombre de usuario obtenido a través del parámetro de URL.
* Botones para editar el perfil o borrar items de la lista se renderizan condicionalmente si el usuario identificado con el parámetro de URL es el mismo de la sesión.
* Si el ajuste está activado en la cuenta, se muestra una cuenta regresiva para el próximo cumpleaños del usuario.

### ✨ Próximas características
* Autenticación con más proveedores, diferentes a Google.
* Nuevas fuentes para la obtención de productos.