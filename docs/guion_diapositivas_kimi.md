# Guion Escénico para Diapositivas Finales (TienditaCampus)
*(Este guion está mapeado exactamente a las 8 diapositivas HTML que generaste. Léanlo con seguridad, sin prisa, cambiando de diapositiva justo donde se indica).*

---

## Diapositiva 1: Portada (TienditaCampus)
**[El Orador 1 pasa al frente y muestra la diapositiva del título con los logos de Next.js, NestJS, etc.]**
> **Orador 1:** "Buenos días a todos. Hoy les presentamos **TienditaCampus**, una plataforma tecnológica construida con React, NestJS y PostgreSQL, diseñada específicamente para resolver un problema crítico en las microeconomías y el comercio informal dentro de las universidades. Nuestro objetivo: reducir drásticamente el desperdicio de comida."

---

## Diapositiva 2: El Problema Real
**[Cambio a Diapositiva 2 - Muestra el '30M toneladas', 'Control Manual' y 'Dinero Perdido']**
> **Orador 1:** "Para entender por qué hicimos esto, veamos los datos. En México se desperdician 30 millones de toneladas de alimento al año. En nuestra universidad, los compañeros que venden sándwiches o postres para pagar sus pasajes se enfrentan a este mismo problema a pequeña escala. ¿Por qué? Porque llevan su control de ventas en una libreta o 'al tanteo'. Al tratar con productos perecederos, un mal cálculo significa comida echada a perder y, por lo tanto, dinero de su propia bolsa tirado a la basura."

---

## Diapositiva 3: Lo Existente No Sirve (La Competencia)
**[Cambio a Diapositiva 3 - Muestra la comparación 'POS Tradicionales' vs 'Apps de Rescate']**
> **Orador 2:** "Seguro se preguntan: *¿Y por qué no usan las aplicaciones que ya existen?* Investigamos el mercado en México y vimos que la competencia falla en dos formas:
> 
> *   Primero están los **Sistemas de Punto de Venta Tradicionales** como *Square* o *Toast*. Estos sistemas cobran comisiones por tarjeta altísimas (del 3% para arriba) y mensualidades que un estudiante vendedor no puede pagar.
> *   Por otro lado están las **Apps Universitarias y de Rescate de Comida**, como *FáciLUNCH*, *Infood* (del Tec de Monterrey), o internacionales como *Too Good To Go*. El problema de estas apps es que son solo de 'Delivery' o se basan en vender las sobras mucho más baratas. Te ayudan a rematar lo que ya se echó a perder, pero **no previenen** el desperdicio desde la raíz."

---

## Diapositiva 4: La Diferencia - Método IQR
**[Cambio a Diapositiva 4 - Muestra los cuadros verdes de Q1, Q3, el Algoritmo TypeScript y el Gráfico de Boxplot]**
> **Orador 2:** "Es ahí donde **TienditaCampus** es completamente distinta a la competencia. Nosotros atacamos el problema de inventario usando **Estadística**.
>
> Programamos en el sistema el *Método del Rango Intercuartílico (IQR)*. Lo que ven en pantalla es cómo, mediante código TypeScript, el sistema analiza el historial de ventas del estudiante, detecta y elimina los 'outliers' o ventas atípicas. Así, el sistema genera sugerencias de reabastecimiento perfectas, reduciendo las mermas pre-caducidad en un margen proyectado del 10%."

---

## Diapositiva 5: Cumplimiento Legal (NOM-251 y LFPDPPP)
**[Cambio a Diapositiva 5 - Muestra los cuadros de NOM-251 e Higiene, y LFPDPPP de Privacidad]**
> **Orador 3:** "Al ser software que maneja alimentos y datos de estudiantes, la arquitectura tiene que ser responsable legalmente.
> 
> *   Para cumplir la Ley de Sanidad (**NOM-251**), la base de datos de TienditaCampus fuerza la metodología de inventario 'FIFO' (lo primero en entrar, es lo primero en salir). Así el sistema te obliga a vender siempre lo que está próximo a caducar.
> *   Para cumplir la Ley de Privacidad (**LFPDPPP**), no guardamos contraseñas. Integramos **Google Single Sign-On (SSO)**, para que Google verifique la identidad de forma segura, evitando cualquier filtración de datos local."

---

## Diapositiva 6: Stack Tecnológico
**[Cambio a Diapositiva 6 - Muestra el Frontend, Backend, Infraestructura y el Flujo SSR -> API -> SQL]**
> **Orador 4 (Idealmente el perfil más técnico):** "Construimos todo con una arquitectura Enterprise, empaquetada en un Monorepo de **Docker Compose** para garantizar su despliegue en cualquier servidor.
> *   En el **Frontend** usamos *Next.js 14* con React. Elegimos Renderizado del Lado del Servidor (SSR) para que, aunque el estudiante tenga mala señal en el campus, la app cargue rapidísimo.
> *   En el **Backend** usamos *NestJS* y *Node.js* con el tipado estricto de TypeScript. Una API REST robusta encargada de calcular todo el modelo matemático IQR sin lag."

---

## Diapositiva 7: Infraestructura PostgreSQL + BigQuery
**[Cambio a Diapositiva 7 - Muestra el Esquema de Base de datos y BigQuery Auditable]**
> **Orador 4:** "Finalmente, la persistencia de datos ocurre en **PostgreSQL 16**. Diseñamos desde cero la estructura relacional con las tablas de usuarios, manejo de stock (`inventory_records`), y transacciones en cascada (`orders` y `order_items`).
>
> Pero lo que eleva el proyecto en esta evaluación práctica, es nuestro puente de auditoría nativo: Creamos la vista `v_daily_export` usando la extensión `pg_stat_statements` para medir qué tanto CPU gastaban las consultas. Y mediante un cliente en nuestro servidor, estos reportes se suben instantáneamente a **Google BigQuery** en la nube. Somos cien por ciento auditables en tiempo real."

---

## Diapositiva 8: Resultado (Cierre)
**[Cambio a Diapositiva 8 - Muestra el cohete verde y "Código Limpio, Bases Robustas..."]**
> **Orador 1 o Líder del Proyecto:** "En conclusión, crear TienditaCampus requirió fusionar Ingeniería de Software, Estadística, y Bases de Datos Avanzadas. 
> 
> Hemos demostrado que usando código limpio y conectando infraestructura local con herramientas Cloud como BigQuery, podemos entregar tecnología de alto nivel directamente en las manos de nuestros emprendedores universitarios, formalizando su economía e impactando positivamente al medio ambiente.
> 
> *[Momento de Presentarse]* Somos [Nombres de Equipo], y abrimos este espacio para cualquier pregunta técnica. Gracias."
