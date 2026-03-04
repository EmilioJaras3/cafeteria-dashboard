# Guión de Exposición — TienditaCampus
### Marco Teórico, Marco Legal y Normativo, Población y Muestra

> Tiempo estimado: 12-15 minutos
> Expositores: Héctor, Emilio, Jesel

---

## SLIDE 1 — Portada (Héctor abre)

> "Buenos días/tardes, maestra y compañeros. Somos Héctor, Emilio y Jesel, y hoy les presentamos los fundamentos teóricos, legales y metodológicos de nuestro proyecto: **TienditaCampus** — una herramienta digital para los vendedores universitarios de nuestra universidad."

---

## SLIDE 2 — Agenda

> "La presentación se divide en tres bloques: primero el **Marco Teórico**, donde explicamos qué problema resolvemos y qué tecnologías usamos. Segundo, el **Marco Legal**, las leyes y normas que cumplimos. Y tercero, **Población y Muestra**, cómo definimos a quién va dirigido el sistema y cómo se calcula la muestra. Empecemos."

---

## SLIDE 3 — Comercio Electrónico Universitario (Héctor)

> "El comercio electrónico universitario es una realidad. Según datos de la ANUIES, casi el **38% de los universitarios** en México han vendido algo dentro de su campus — sándwiches, postres, botanas. El problema es que lo hacen **sin herramientas**: anotan en libretas o simplemente recuerdan cuánto compraron."
>
> "TienditaCampus nace para eso: es una PWA — una app web progresiva — que les permite gestionar su inventario, registrar ventas y, lo más importante, **predecir cuánto deben comprar** usando estadística."

---

## SLIDE 4 — Aplicaciones Similares (Héctor)

> "Investigamos qué herramientas ya existen y por qué **ninguna resuelve** el problema de fondo."
>
> "**Square y Toast** son terminales de pago que cobran 3% de comisión — un estudiante que vende tortas de 25 pesos no puede pagar eso."
>
> "**FáciLUNCH e Infood** son apps de pedidos. Ayudan a conectar comprador con vendedor, pero **no le dicen al vendedor cuánto producto comprar**."
>
> "**Too Good To Go** vende las sobras baratas — es una solución *reactiva*, el vendedor ya perdió dinero."
>
> "**TienditaCampus es diferente** porque ataca el problema **antes** de que suceda: analiza las ventas pasadas con el Método IQR y sugiere cuánto comprar la siguiente vez. Es preventivo, no reactivo."

---

## SLIDE 5 — PWA y Stack (Emilio)

> "Gracias, Héctor. Ahora hablemos de la tecnología. TienditaCampus es una **PWA** — Progressive Web App. ¿Qué significa? Que se puede instalar en el celular directamente desde el navegador, **sin pasar por la Play Store**, funciona offline y es muy liviana."
>
> "El stack tecnológico que usamos es: **Next.js 14** en el frontend, **NestJS** en el backend, **PostgreSQL** como base de datos relacional, **MongoDB** para logs, todo empaquetado con **Docker** y desplegado en **AWS EC2** con **Nginx** como proxy."

---

## SLIDE 6 — Arquitectura 3-Tier (Emilio)

> "Nuestro sistema está desplegado en una **arquitectura de 3 niveles** en Amazon Web Services. Cada capa corre en una instancia EC2 separada:"
>
> "La **capa de presentación** es el frontend con Next.js e Nginx. La **capa de lógica** es la API REST con NestJS que maneja autenticación JWT, validación y toda la lógica de negocio. Y la **capa de datos** son PostgreSQL para los datos del negocio y MongoDB para auditoría."
>
> "Esta separación nos da escalabilidad: si el frontend necesita más recursos, escalamos solo esa instancia sin tocar la base de datos."

---

## SLIDE 7 — Inventarios Perecederos (Emilio)

> "El corazón del problema es el **inventario perecedero**. La FAO reporta que hasta el 30% del inventario en micronegocios de alimentos se pierde por falta de control."
>
> "Nuestra solución incluye registro diario de entradas y salidas, alertas de caducidad, análisis de rentabilidad real — cuánto invertiste vs. cuánto ganaste — y un historial de mermas para identificar patrones."
>
> "Todo esto se conecta en un modelo de datos que va desde los productos, pasando por los registros de inventario, hasta las ventas diarias."

---

## SLIDE 8 — Protección de Datos (Jesel)

> "Gracias, Emilio. Ahora el Marco Legal. El primero es la **LFPDPPP** — la Ley Federal de Protección de Datos Personales. Esta ley exige que los datos se traten de forma lícita, con consentimiento, y que exista un aviso de privacidad."
>
> "¿Cómo cumplimos? Las contraseñas se hashean con **Argon2**, que es el algoritmo ganador del Password Hashing Competition. Las sesiones usan **JWT** sin almacenar datos sensibles. La autenticación con Google es **delegada** — nosotros nunca vemos la contraseña de Google del usuario. Y todas las credenciales están en variables de entorno, nunca en el código."

---

## SLIDE 9 — Normativas (Jesel)

> "También cumplimos con la **Ley de Protección al Consumidor**, que exige informar la identidad del proveedor en transacciones electrónicas. La **NOM-151** sobre conservación de mensajes de datos — MongoDB funciona como nuestro sistema de auditoría. Y la **NOM-251** de higiene alimentaria: el sistema obliga el orden **FIFO** — lo primero que entra es lo primero que se vende."
>
> "Todo esto se alinea con el **Modelo Educativo Basado en Competencias** de la UPChiapas."

---

## SLIDE 10 — Caso Práctico (Jesel)

> "Pasamos ahora a Población y Muestra. Nuestro caso práctico integrador se centra en la **gestión del comercio informal de snacks** en la UPChiapas."
>
> "El diseño es **cuasi-experimental**, con mediciones antes y después de implementar la plataforma, con enfoque cuantitativo."
>
> "La población son todos los vendedores estudiantiles de snacks de nuestra universidad. Y la muestra se selecciona por **muestreo intencional**: vendedores que preparan productos perecederos y venden al menos **3 días a la semana**."

---

## SLIDE 11 — Criterios (Jesel)

> "Para ser parte del estudio, el vendedor debe ser estudiante activo, vender snacks dentro del campus, tener al menos un mes de experiencia, vender 3 o más días por semana y estar dispuesto a usar la plataforma durante el periodo de prueba."
>
> "Se excluyen vendedores de comidas completas como desayunos o comidas formales, vendedores ambulantes sin punto fijo, personas ajenas a la universidad, y negocios que ya tengan sistemas contables."

---

## SLIDE 12 — Cálculo de Muestra (Jesel)

> "Para calcular el tamaño de muestra usamos la fórmula para poblaciones finitas. Con una población estimada de 150 vendedores, nivel de confianza del 95%, proporción de 0.5 y margen de error del 5%, obtenemos una muestra de **aproximadamente 108 vendedores** a encuestar."
>
> "El método de muestreo es **intencional**, complementado con bola de nieve: cada vendedor identificado nos recomienda a otros vendedores."

---

## SLIDE 13 — Cierre (Héctor cierra)

> "Con esto concluimos nuestra presentación. TienditaCampus no es solo una app: es un sistema completo con arquitectura en la nube, predicción estadística, cumplimiento legal y una metodología rigurosa de investigación. Estamos a sus órdenes para cualquier pregunta. ¡Gracias!"

---

## Tips para la exposición

1. **No leer** — usa el guión como referencia, no lo leas textual
2. **Contacto visual** con la maestra y compañeros
3. **Señalar la pantalla** cuando menciones tecnologías o datos
4. **Pausas** después de datos importantes (38%, 30%, n≈108)
5. **Transiciones naturales** — "Gracias, Héctor" / "Pasamos ahora a..."
6. Si preguntan algo que no sepas: *"Excelente pregunta, permítame verificar y le confirmo"*
