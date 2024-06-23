<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<h1 align="center">Payment Microservice</h1>

## Dev

1. Clonar el repositorio
2. Instalar dependencias
3. Crear el archivo `.env` basado en el `.env.template`
4. Ejecutar `npm run start:dev`

## Stripe

Para poder realizar las pruebas en [Stripe](https://dashboard.stripe.com/test/dashboard) debemos configurar en [HookDeck](https://dashboard.hookdeck.com/) el forward ya que no podemos hacerlo de forma local mediante HTTP:

1. Primero debemos loguearnos en [HookDeck](https://dashboard.hookdeck.com/)

   ```bash
   hookdeck login
   ```

2. Luego debemos levantar el puerto

   ```bash
   hookdeck listen 3003 stripe-to-localhost
   ```
