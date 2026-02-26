# Optimización del Desperdicio de Alimentos en Microeconomías Universitarias: Un Análisis Multidimensional de TienditaCampus y el Método del Rango Intercuartílico

La problemática del desperdicio de alimentos a nivel global ha dejado de ser una preocupación meramente logística para transformarse en un desafío estructural de proporciones éticas, económicas y ambientales. En el contexto de las instituciones de educación superior en México, este fenómeno adquiere un matiz particular debido a la proliferación de microeconomías estudiantiles que operan en los márgenes de la formalidad. TienditaCampus surge como una propuesta tecnológica diseñada para profesionalizar la gestión de inventarios de alimentos perecederos mediante un Sistema de Soporte a la Decisión (SSD) que implementa el Método del Rango Intercuartílico (IQR) para la optimización de existencias. Este reporte analiza exhaustivamente los antecedentes de la crisis alimentaria, el estado del arte de las soluciones actuales, el marco normativo mexicano, la metodología estadística aplicada y la arquitectura tecnológica que sustenta el sistema, con el objetivo de demostrar la viabilidad de una reducción del 10% en las mermas operativas.

## 1. Antecedentes y Contextualización de la Crisis Alimentaria y el Emprendimiento Estudiantil

El desperdicio de alimentos representa una de las ineficiencias más críticas del sistema agroalimentario contemporáneo. Según estimaciones recientes de la Organización de las Naciones Unidas para la Agricultura y la Alimentación (FAO) y la Red de Bancos de Alimentos de México (BAMX), el país desperdicia aproximadamente 30 millones de toneladas de alimento al año, lo que representa cerca del 40% de la producción nacional total. Esta cifra no solo implica una pérdida masiva de nutrientes en un país donde 28.6 millones de personas viven en carencia alimentaria, sino que también conlleva un impacto económico devastador que supera los 490 mil millones de pesos anuales. El fenómeno se manifiesta con especial crudeza en los eslabones finales de la cadena de suministro: el sector minorista y el consumo final.

| Magnitud del Desperdicio en México | Estadísticas y Valoraciones |
| :--- | :--- |
| Volumen anual de desperdicio | 30,000,000 toneladas |
| Desperdicio por minuto | 38 toneladas |
| Desperdicio per cápita anual | 80 kg por persona |
| Porcentaje de producción desperdiciada | 40% |
| Costo económico estimado | 490,000,000,000 MXN |

La generación de residuos alimentarios está intrínsecamente ligada a deficiencias en la infraestructura logística y en la gestión de inventarios. La falta de redes de frío adecuadas, la ausencia de sistemas de pre-enfriamiento y las ineficiencias en el transporte refrigerado elevan las pérdidas de productos críticos como frutas, verduras y lácteos. Además, los patrones de consumo en México se caracterizan por una planificación deficiente de las compras y una rotación de inventarios subóptima, donde el desconocimiento de las diferencias entre la fecha de "consumo preferente" y la "fecha de caducidad" induce el descarte prematuro de alimentos aún seguros para la ingesta humana. Los productos de mayor consumo masivo son también los más afectados por esta dinámica; la tortilla presenta pérdidas de 2.8 millones de toneladas anuales, mientras que el pan alcanza los 2.6 millones de toneladas y la leche desperdiciada suma 4.5 millones de litros por año.

En este entorno de ineficiencia sistémica, los campus universitarios mexicanos se han convertido en laboratorios de resiliencia económica. El emprendimiento estudiantil es un fenómeno creciente, motivado en gran medida por la necesidad de complementar ingresos familiares y financiar la educación profesional. Se estima que el 39% de los estudiantes universitarios posee una alta capacidad emprendedora, aunque a menudo carecen de las herramientas estratégicas para transformar sus iniciativas informales en negocios sostenibles. Estos estudiantes suelen optar por la venta de alimentos perecederos debido a la baja barrera de entrada y la demanda constante dentro de la comunidad universitaria. No obstante, la naturaleza efímera de sus productos, sumada a la falta de sistemas de control, genera niveles de merma que erosionan sus ya limitados márgenes de beneficio.

El concepto de economía informal en México, a menudo ignorado en los análisis académicos tradicionales, representa una arista fundamental del desarrollo inclusivo. La informalidad no siempre es una elección voluntaria; frecuentemente es el resultado de políticas públicas excluyentes o de la falta de inserción en el mercado laboral formal para los jóvenes, quienes enfrentan crisis cíclicas y una tendencia histórica hacia la precariedad del empleo. En este contexto, TienditaCampus no solo se propone como un software de gestión, sino como un modelo de inclusión tecnológica que busca dotar al estudiante de competencias digitales y herramientas de decisión informada para gestionar la incertidumbre y mitigar riesgos económicos.

La relevancia de este proyecto se alinea con los Objetivos de Desarrollo Sostenible (ODS) de la Organización de las Naciones Unidas, específicamente con la Meta 12.3, la cual busca reducir a la mitad el desperdicio de alimentos per cápita mundial en la venta al por menor y a nivel de los consumidores para el año 2030. Lograr esta meta requiere una transición desde métodos de gestión reactivos hacia estrategias proactivas basadas en datos, donde la cuantificación precisa del desperdicio permita establecer líneas base y medir el progreso de las intervenciones. TienditaCampus se posiciona como una respuesta a escala micro para este desafío global, transformando la gestión informal de alimentos en una práctica basada en la eficiencia estadística.

## 2. Estado del Arte: Sistemas de Gestión de Inventarios y Soluciones para el Desperdicio

La evolución de las herramientas de gestión para micro y pequeñas empresas ha transitado desde los registros manuales y hojas de cálculo hacia sistemas de punto de venta (POS) integrados y plataformas de optimización basadas en datos. Sin embargo, la brecha entre la funcionalidad ofrecida por las soluciones comerciales líderes y las necesidades específicas del micro-vendedor universitario sigue siendo amplia, particularmente en lo que respecta a la gestión de productos perecederos y la estructura de costos.

### Análisis de Sistemas de Punto de Venta (POS) Comerciales

El mercado actual está dominado por sistemas como Square POS, Toast y Poster POS, los cuales ofrecen funcionalidades robustas para el seguimiento de ventas e inventarios en tiempo real. Square, por ejemplo, destaca por su facilidad de uso y la eliminación de contratos a largo plazo, permitiendo a los negocios pequeños acceder a informes de existencias y alertas de stock bajo. No obstante, el modelo de negocio de estas plataformas se basa en comisiones por transacción y suscripciones mensuales que pueden resultar onerosas para un emprendedor estudiantil.

| Plataforma | Modelo de Costo | Comisiones (Presencial) | Limitaciones para Estudiantes |
| :--- | :--- | :--- | :--- |
| **Square POS** | Gratis / $49 USD (Plus) | 2.6% + 15¢ | Comisiones elevadas para volúmenes bajos |
| **Toast POS** | $0 a $165+ USD | Variables | Requiere hardware específico y contratos largos |
| **Poster POS**| $42 USD mensuales | N/A | Costo fijo mensual restrictivo |
| **Too Good To Go** | Comisión por venta | N/A | Enfoque solo en excedentes, no en inventario base |

Square aplica una comisión estándar de 2.6% más 15 centavos de dólar por cada transacción procesada con tarjeta, una cifra que puede escalar significativamente si se consideran tarjetas internacionales o ingresos manuales de datos. Para un estudiante cuya venta promedio es baja, estos costos fijos por transacción representan una porción sustancial de su utilidad. Además, las funciones avanzadas de gestión de inventario, como el seguimiento de recetas o el análisis de márgenes detallado, suelen estar reservadas para planes de pago (Square Plus o Premium) que inician en los 49 dólares mensuales.

Por otro lado, sistemas como Toast POS están diseñados exclusivamente para la industria alimentaria, integrando pedidos en línea, gestión de mesas y análisis de ventas. A pesar de su potencia, estas soluciones presentan barreras como la necesidad de hardware propietario y compromisos contractuales de hasta dos años con penalizaciones por terminación temprana. Para el entorno dinámico y a menudo estacional de un campus universitario, donde la actividad comercial se interrumpe durante vacaciones y periodos de exámenes, este tipo de rigidez operativa es inviable.

### Plataformas Especializadas en la Reducción de Desperdicio

En el ámbito específico de la reducción de desperdicio, han surgido plataformas como "Too Good To Go", que permiten a los establecimientos vender sus excedentes de comida a precios reducidos al final de la jornada. Si bien este modelo es efectivo para el rescate de alimentos, no aborda la raíz del problema: la sobreproducción o el exceso de inventario causado por pronósticos inexactos. Los usuarios han reportado limitaciones en estas aplicaciones, como la falta de filtros precisos para preferencias alimentarias (vegano/vegetariano) y la sobrecarga de información sobre establecimientos sin disponibilidad real, lo que sugiere que una herramienta de gestión debe ser preventiva y no solo reactiva.

La verdadera innovación en el sector está siendo impulsada por el análisis predictivo. Empresas de mayor envergadura están implementando soluciones basadas en inteligencia artificial (IA) para optimizar el reabastecimiento de perecederos. Por ejemplo, OrderGrid utiliza algoritmos de demanda que consideran variables como el clima, tendencias regionales y vida útil del producto, logrando reducciones de hasta el 37% en el desperdicio de productos frescos. Sin embargo, la implementación de estos modelos requiere grandes volúmenes de datos históricos de alta calidad y una infraestructura computacional sofisticada, recursos que son inaccesibles para el micro-comercio informal.

### El Nicho de TienditaCampus: Simplicidad y Robustez Estadística

Frente a la complejidad de la IA y el costo de los sistemas POS tradicionales, TienditaCampus propone un enfoque intermedio. Al prescindir de la inteligencia artificial en favor del Método del Rango Intercuartílico (IQR), el sistema logra una robustez estadística capaz de manejar la alta volatilidad de la demanda universitaria sin las demandas técnicas de los modelos de aprendizaje profundo. La literatura académica respalda que, en situaciones donde los datos son escasos o ruidosos —característica común de la venta informal—, los métodos no paramétricos como el IQR son superiores a las regresiones lineales simples, ya que estas últimas son extremadamente sensibles a los valores atípicos y a la multicolinealidad.

## 3. Marco Normativo en México: Sanidad Alimentaria y Privacidad de Datos

La operación de una plataforma digital dedicada a la gestión de alimentos perecederos en territorio mexicano está sujeta a un entramado legal que garantiza tanto la salud pública como el derecho fundamental a la privacidad de los datos personales. TienditaCampus se fundamenta en el cumplimiento estricto de la NOM-251-SSA1-2009 y la LFPDPPP.

### NOM-251-SSA1-2009: Prácticas de Higiene para el Proceso de Alimentos

Esta Norma Oficial Mexicana es el pilar regulatorio para cualquier establecimiento físico o móvil dedicado a la preparación o venta de alimentos y bebidas en México. Su objetivo es establecer los requisitos mínimos de buenas prácticas de higiene para evitar la contaminación cruzada y garantizar la inocuidad de los productos destinados al consumidor nacional.

Para los micro-vendedores universitarios que integran la red de TienditaCampus, la norma impone obligaciones críticas que el sistema ayuda a supervisar:

- **Mantenimiento de Instalaciones:** Las áreas de preparación deben contar con superficies lisas, lavables y sin grietas. Los techos, paredes y pisos deben mantenerse limpios para evitar el refugio de plagas.
- **Control de Temperatura:** Los equipos de refrigeración para productos perecederos deben mantenerse a una temperatura máxima de 7°C para evitar la proliferación bacteriana. La plataforma incluye módulos de registro para documentar el monitoreo térmico diario.
- **Gestión de Insumos y Residuos:** El sistema debe facilitar el seguimiento de la rotación de inventarios bajo el principio de "primeras entradas, primeras salidas" (PEPS/FIFO). Asimismo, se deben implementar medidas estrictas para el control de plagas y la disposición frecuente de residuos en recipientes identificados y con tapa.
- **Capacitación del Personal:** Es mandatorio que todo manipulador de alimentos reciba capacitación en higiene al menos una vez al año. TienditaCampus puede funcionar como un repositorio de constancias de capacitación y guías de buenas prácticas para los usuarios.

El incumplimiento de estas disposiciones puede derivar en sanciones administrativas severas por parte de las autoridades sanitarias, lo que subraya la importancia de contar con un sistema que no solo optimice ventas, sino que asegure el cumplimiento normativo.

### Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)

En el ámbito digital, la recolección de información de los usuarios (estudiantes vendedores y compradores) activa las obligaciones establecidas en la LFPDPPP. Esta ley protege los datos de los ciudadanos frente a tratamientos no autorizados y garantiza los derechos ARCO (Acceso, Rectificación, Cancelación y Oposición).

TienditaCampus implementa las siguientes medidas de cumplimiento legal:

- **Aviso de Privacidad Obligatorio:** Antes de recabar cualquier dato personal, como el correo electrónico o el nombre a través de Google OAuth, la plataforma presenta un aviso de privacidad detallando las finalidades del tratamiento y los medios para ejercer derechos ARCO.
- **Consentimiento del Titular:** El uso de protocolos de autenticación como Google OAuth 2.0 garantiza que el usuario otorga un consentimiento expreso y específico para que la aplicación acceda a ciertos alcances (scopes) de su información de perfil.
- **Seguridad de la Información:** El artículo 19 de la ley obliga a implementar medidas técnicas y administrativas para proteger los datos contra accesos no autorizados, daño o pérdida. La arquitectura basada en Docker y el cifrado de comunicaciones en NestJS aseguran la integridad de los tokens de acceso y la información sensible de las transacciones.

| Obligación LFPDPPP | Implementación en TienditaCampus | Referencia Legal |
| :--- | :--- | :--- |
| **Aviso de Privacidad** | Visible en el pie de página y formularios de registro | Art. 15 |
| **Consentimiento** | Gestionado a través de la pantalla de consentimiento de Google | Art. 8 |
| **Derechos ARCO** | Canal habilitado vía formulario de contacto específico | Art. 22 |
| **Seguridad** | Cifrado de datos en tránsito y almacenamiento seguro de tokens | Art. 19 |

## 4. Metodología: Optimización de Inventarios mediante el Rango Intercuartílico (IQR)

La piedra angular del Sistema de Soporte a la Decisión de TienditaCampus es el uso del Método del Rango Intercuartílico (IQR) para la detección de anomalías en la demanda y el suavizado de inventarios. Esta elección metodológica se justifica por la necesidad de una técnica robusta ante distribuciones de datos sesgadas, típicas en entornos de venta con alta variabilidad.

### Fundamentos Matemáticos del IQR

El IQR es una medida de dispersión estadística no paramétrica que captura la variabilidad del 50% central de los datos. A diferencia de la desviación estándar, que es influenciada de manera desproporcionada por los valores extremos, el IQR se basa en percentiles, lo que lo hace inherentemente más resistente al ruido. El proceso de cálculo sigue los siguientes pasos:

1.  **Ordenamiento y Clasificación:** Se ordenan los datos de demanda histórica de menor a mayor.
2.  **Cálculo de Cuartiles:** Se identifica el primer cuartil (Q1 o percentil 25) y el tercer cuartil (Q3 o percentil 75). La mediana (Q2) divide el conjunto de datos a la mitad.
3.  **Determinación del Rango:** El IQR se calcula como la diferencia entre los cuartiles superior e inferior: `IQR = Q3 - Q1`
4.  **Establecimiento de Vallas (Fences):** Se definen los límites para identificar valores atípicos mediante un factor de escala k, convencionalmente fijado en 1.5 para "outliers" moderados y en 3.0 para "outliers" extremos:
    *   Valla Inferior = Q1 - (1.5 * IQR)
    *   Valla Superior = Q3 + (1.5 * IQR)

En el contexto de TienditaCampus, cualquier registro de ventas diario que caiga fuera de estas vallas es flaggeado como una anomalía. Por ejemplo, un pico de ventas inusual provocado por un evento deportivo en el campus no debe ser interpretado como una tendencia de crecimiento sostenida, ya que induciría al vendedor a sobre-abastecerse en los días siguientes, generando mermas por caducidad cuando la demanda regrese a su media normal.

### Aplicación al Suavizado de Demanda y Reducción de Mermas

Una vez detectadas las anomalías, el sistema aplica un algoritmo de suavizado. Los valores atípicos son reemplazados por el valor de la valla más cercana o por la mediana móvil, lo que genera una serie de tiempo más estable para el cálculo del reabastecimiento. Esta técnica mejora la precisión de los pronósticos de corto plazo sin requerir modelos de regresión complejos que a menudo fallan en conjuntos de datos pequeños.

El impacto directo en la reducción de mermas se logra a través de la optimización de las existencias de seguridad (SS). El nivel de inventario óptimo se define por la ecuación fundamental de balance de masa para inventarios:

`Inventario Final(t) = Compras(t) - Ventas(t) - Mermas(t) + Inventario Final(t-1)`

Al reducir la variabilidad artificial de la demanda (ruido), el sistema permite a los estudiantes mantener inventarios más magros. Un inventario que se ajusta estrechamente a la demanda real disminuye el tiempo de permanencia de los productos perecederos en almacenamiento, minimizando el riesgo de caducidad y asegurando una rotación fresca del producto. La meta del 10% en la reducción de mermas se fundamenta en estudios longitudinales que demuestran que la simple transición de una gestión manual basada en la intuición a una basada en datos puede generar ahorros de entre el 15% y el 40% en costos de desperdicio.

### Diseño de Validación: Estudio Cuasiexperimental Longitudinal

Para validar científicamente la eficacia de TienditaCampus, se implementa un diseño cuasiexperimental longitudinal de series temporales interrumpidas. Debido a la naturaleza del campus universitario, no es factible realizar una asignación aleatoria pura de grupos; por tanto, se opta por comparar el desempeño de los emprendedores antes y después de la adopción de la herramienta.

El estudio se divide en tres etapas principales:

1.  **Línea de Base (Control):** Registro manual de ventas y mermas durante 13 días (periodo estándar de repetición de ciclos de consumo en comedores escolares).
2.  **Intervención:** Introducción de TienditaCampus. El sistema comienza a proporcionar sugerencias de compra basadas en el IQR después de los primeros 7 días de datos acumulados.
3.  **Evaluación de Impacto:** Re-evaluación del volumen de mermas y análisis estadístico mediante SPSS o R para determinar la significancia de los cambios observados. Se espera que el uso del SSD reduzca no solo el volumen físico de desperdicio, sino también la huella hídrica y de carbono asociada a la producción de esos alimentos no consumidos.

## 5. Arquitectura del Proyecto: ¿Cómo lo desarrollamos?

Para llevar TienditaCampus de una idea a un producto de software real, adoptamos una arquitectura de **Monorepo** dividida en tres servicios principales, todos orquestados mediante **Docker** y `docker-compose` para asegurar que el sistema corra exactamente igual en cualquier computadora sin problemas de compatibilidad.

1.  **El Frontend (La cara del usuario):**
    *   Desarrollado con **React y Next.js 14**. Elegimos Next.js porque nos permite hacer *Server-Side Rendering*, haciendo que la app cargue rapidísimo incluso en los celulares de los estudiantes que solo tienen datos móviles dentro del campus.
    *   Para el diseño usamos TailwindCSS, dándole un aspecto de *"Dark Luxury"* muy moderno que rompe con el diseño aburrido de los sistemas universitarios tradicionales.
    *   Integramos **Google SSO (Single Sign-On)** con OAuth2, así los alumnos pueden iniciar sesión con un solo clic usando su correo institucional, sin tener que memorizar otra contraseña más.

2.  **El Backend (El cerebro lógico):**
    *   Construido en Node.js usando **NestJS** con TypeScript. NestJS nos obligó a mantener un código súper ordenado y modular (usando Controladores, Servicios y Módulos).
    *   Aquí implementamos toda la lógica de validación, la creación de JWTs (JSON Web Tokens) para mantener la sesión segura, y la lógica pesada del Método IQR para calcular las estadísticas sin congelar el celular del usuario.

3.  **La Base de Datos (PostgreSQL):**
    *   Elegimos **PostgreSQL 16** alojado en un contenedor Docker.
    *   Usamos **TypeORM** en el backend para comunicarnos con la base de datos mediante objetos de TypeScript, evitando escribir SQL crudo y previniendo ataques de Inyección SQL.

## 6. Estructura de la Base de Datos

Nuestra base de datos relacional está diseñada para soportar ventas concurrentes y mantener un historial perfecto para los reportes administrativos. Las tablas principales son:

*   **`users`**: Guarda la información de compradores y vendedores, controlando roles y el estado de la verificación por Google.
*   **`projects` y `queries`**: Tablas administrativas para documentar qué equipo está haciendo las pruebas de la Unidad 2 y qué consultas SQL se están ejecutando.
*   **`products`**: El catálogo central. Registra precios, imágenes, costos y el flag `is_perishable` (es perecedero) que activa las alertas rápidas.
*   **`inventory_records`**: Gestiona las existencias en tiempo real usando el principio FIFO (Primeras Entradas, Primeras Salidas).
*   **`orders` y `order_items`**: Relación maestro-detalle donde guardamos cada venta, quién la hizo, qué productos compró y si ya se entregó el pedido.
*   **`daily_sales`**: Una tabla de consolidación donde, al final del día, calculamos la ganancia neta, la inversión total y preparamos los datos para los gráficos del dashboard sin tener que recalcular todo desde cero cada vez.

Para la evaluación práctica reciente, activamos la extensión `pg_stat_statements` en PostgreSQL. Esto nos permite rastrear el consumo de hardware de cada consulta SQL y exportar un *Snapshot* a la nube de Google BigQuery (a través de la vista `v_daily_export`) para auditar el rendimiento del sistema en tiempo real.

## 7. Equipo de Desarrollo

Este proyecto fue planeado, diseñado y programado desde cero por nuestro equipo, combinando conocimientos de Bases de Datos Avanzadas, Programación Web Full-Stack y Análisis Estadístico.

*   **[Tu Nombre / Apellido]** - *[Tu Rol, ej. Líder de Proyecto / Frontend Developer]*
*   **[Nombre Compañero 1]** - *[Su Rol, ej. Backend Developer / DBA]*
*   **[Nombre Compañero 2]** - *[Su Rol, ej. Documentación / Testing]*
*   *(Añadir más miembros si es necesario)*

> **Mensaje de Cierre:** TienditaCampus no es solo un gestor de bases de datos; es una herramienta real para formalizar el comercio estudiantil, proteger la inversión de nuestros compañeros y reducir el impacto ambiental del desperdicio de comida en nuestra universidad. ¡Gracias!
