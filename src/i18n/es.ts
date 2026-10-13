import type { Content } from './types'

export const es: Content = {
  profile: {
    name: 'Rogelio Lizarraga Escobar',
    handle: 'rogelio',
    role: 'Ingeniero de IA y datos',
    oneLiner:
      'Tomo datos operativos, construyo el pipeline alrededor, entreno sin filtrar información del futuro y dejo resultados que alguien pueda revisar y usar.',
    recentWork: 'Data Manager en Desarrollo Geomatico, ago 2025 a sep 2026.',
    location: 'Tijuana, Baja California, dispuesto a reubicarme',
    email: 'rogeliolzgaesc@gmail.com',
    github: 'https://github.com/roger-git-427',
    linkedin: 'https://www.linkedin.com/in/rogelio-lizarraga-escobar/',
    resumeUrl: '',
  },
  about: {
    summary:
      'Vivo en Tijuana; abierto a remoto o a reubicarme. Ingeniería en Ciencia de Datos y Matemáticas en el Tecnológico de Monterrey, Campus Monterrey (promedio 4.0; especialidad en IA avanzada), terminada en 2025. Mi trabajo más reciente fue como Data Manager en una empresa de geomática: datos de vuelo DJI a S3 y a un NAS, Azure/PostgreSQL, reportes y optimización de vuelos a estaciones. Español nativo, inglés C1 y francés básico. Busco roles de ingeniería de IA y datos donde alguien todavía tenga que confiar en el resultado.',
    background:
      'De ago 2025 a sep 2026 administré datos de vuelo e infraestructura en Desarrollo Geomatico. Antes construí pronósticos de ocupación hotelera con TCA Software Solutions, detección de productos mal acomodados para OXXO FEMSA y pronóstico de desempeño de productos nuevos con Arca Continental.',
    canDo: [
      'Construir cargas idempotentes, captura de cambios, orquestación programada y compuertas de conciliación sobre datos operativos.',
      'Definir la granularidad de los datos, pasar de bronce a plata a oro y consultar todo en SQL.',
      'Entrenar con clases desbalanceadas y sin fugas de información, usando cortes cronológicos y pesos por clase.',
      'Servir validaciones y predicciones con FastAPI y el contexto suficiente para decidir qué sigue.',
    ],
  },
  skills: {
    data: ['Python', 'SQL', 'PostgreSQL', 'DuckDB', 'MongoDB', 'Pandas', 'Airflow', 'n8n'],
    models: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'XGBoost', 'MLflow', 'Optuna'],
    serve: ['Linux', 'Bash', 'Docker', 'GitHub Actions', 'FastAPI', 'AWS S3', 'MinIO', 'Azure'],
  },
  skillDomains: {
    data: 'datos y orquestación',
    models: 'ML/DL',
    serve: 'infraestructura y despliegue',
  },
  stages: [
    { id: 'ingest', label: 'carga', hint: 'fuentes y granularidad' },
    { id: 'transform', label: 'transformación', hint: 'esquema y etiquetas' },
    { id: 'train', label: 'entrenamiento', hint: 'modelo y selección' },
    { id: 'evaluate', label: 'evaluación', hint: 'métricas y umbrales' },
    { id: 'serve', label: 'despliegue', hint: 'sistema en uso' },
  ],
  projects: [
    {
      id: 'retail-forecasting',
      name: 'Plataforma de datos retail y pronóstico de demanda',
      tagline:
        'Carga automática de pedidos, analítica, pronóstico de demanda y monitoreo de riesgo de inventario en una plataforma con Docker.',
      problem:
        'Los pedidos tienen que entrar una sola vez, mantenerse conciliados durante todo el pipeline y convertirse en un pronóstico para el día siguiente antes de que el inventario sea un problema.',
      result:
        'Una carga idempotente en n8n alimenta captura de cambios en PostgreSQL y una cadena programada de siete etapas en Airflow. Una compuerta bloqueante protege la conciliación; FastAPI revisa inventario y el modelo produce pronósticos del día siguiente y niveles de riesgo por días de inventario.',
      stack: ['Airflow', 'n8n', 'XGBoost', 'PostgreSQL', 'FastAPI', 'Docker'],
      metric: { label: 'prueba de 30 días', value: '-14,7 % MAE, -20,4 % RMSE' },
      stages: {
        ingest:
          'Los pedidos entran por una carga idempotente en n8n, así que un reintento no crea dos veces el mismo pedido. La captura de cambios en PostgreSQL lleva esas actualizaciones al resto de la plataforma.',
        transform:
          'Una cadena programada de siete etapas en Airflow prepara los datos y se detiene en una compuerta de conciliación si los registros no coinciden. CI prueba los contratos de los DAG antes de que lleguen al pipeline.',
        train:
          'Las variables por SKU y día, construidas sin fugas de información, alimentan un pronóstico cronológico con XGBoost. El corte sigue el tiempo: los pedidos futuros nunca ayudan a predecir el pasado.',
        evaluate:
          'En la prueba de 30 días, XGBoost redujo MAE 14,7 % y RMSE 20,4 % frente a persistencia. Esos son los errores que el pronóstico del día siguiente tiene que superar para ser útil.',
        serve:
          'La plataforma corre en Docker. FastAPI expone las revisiones de inventario; la salida es un pronóstico del día siguiente y niveles de riesgo por días de inventario para que quien revisa el stock vea dónde actuar primero.',
      },
    },
    {
      id: 'cfpb-intelligence',
      name: 'Quejas CFPB: lakehouse e inteligencia',
      tagline:
        'Lakehouse CFPB en DuckDB: clasificador de producto con corte por fecha, búsqueda MiniLM y SQL de solo lectura.',
      problem:
        'Las quejas llegan en texto libre. Antes de que alguien lea la cola, conviene saber de qué producto habla el mensaje y qué tan seguro está el modelo, sin usar quejas futuras en el entrenamiento. Quien analiza también necesita SQL sobre el almacén, no solo una puntuación.',
      result:
        'En fechas posteriores al entrenamiento: exactitud 0,80 y F1 macro 0,68. FastAPI sirve predicciones ordenadas, búsqueda de quejas parecidas con MiniLM y texto a SQL de solo lectura protegido sobre oro.',
      stack: ['Python', 'DuckDB', 'scikit-learn', 'MLflow', 'sentence-transformers', 'FastAPI'],
      github: 'https://github.com/roger-git-427/complaint_intelligence_v2.0',
      metric: { label: 'prueba', value: '0,80 exact., 0,68 F1 macro' },
      stages: {
        ingest:
          'Las narrativas de quejas CFPB llegan a una capa de bronce con una queja como granularidad. El clasificador ve la narrativa; los demás campos siguen disponibles para analítica.',
        transform:
          'Plata limpia y quita duplicados; oro es un esquema en estrella en DuckDB. Las pruebas automáticas revisan unicidad, nulos y llaves foráneas. Después de ordenar por fecha, las quejas posteriores forman la prueba y nunca entrenan.',
        train:
          'TF-IDF con pesos por clase alimenta una regresión logística registrada en MLflow. Un índice separado con MiniLM permite buscar narrativas de quejas parecidas.',
        evaluate:
          'En la prueba cronológica, el clasificador de producto llegó a 0,80 de exactitud y 0,68 de F1 macro. La API devuelve alternativas ordenadas además de la predicción principal.',
        serve:
          'FastAPI sirve predicciones ordenadas, búsqueda semántica con MiniLM y texto a SQL sobre oro. El SQL generado pasa por un filtro de solo lectura antes de llegar a DuckDB. El clasificador ordena la cola; una persona cierra el caso.',
      },
    },
  ],
  ui: {
    navAbout: 'Sobre mí',
    navWork: 'Proyectos',
    navContact: 'Contacto',
    projectsLink: 'Proyectos',
    aboutTitle: 'Sobre mí',
    aboutHeading: 'Quién soy',
    recentWork: 'Qué he hecho',
    whatICanDo: 'En qué soy bueno',
    skillsTitle: 'Herramientas',
    workTitle: 'Proyectos',
    workLede:
      'Dos sistemas. En cada uno están el problema, cómo se separó la prueba y lo que quedó listo.',
    problem: 'Problema',
    whatShipped: 'Resultado',
    demo: 'demo',
    contactTitle: 'Contacto',
    contactLede:
      'Busco roles de inteligencia artificial y datos. Lo más fácil es escribirme por correo o por GitHub; teléfono: +52 667 185 0986.',
    email: 'Correo',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    resume: 'Currículum',
    openPdf: 'Abrir PDF',
    top: 'Arriba',
    queryTitle: 'Consulta',
    tables: 'Tablas',
    run: 'Ejecutar',
    sqlHint: 'SHOW TABLES | SELECT * FROM projects | HELP',
    sqlEditorLabel: 'Editor SQL',
    statusReady: 'listo',
    statusRunning: 'ejecutando',
    statusOk: 'listo, última consulta correcta',
    resultsEmpty: 'Ejecuta la consulta o elige una tabla.',
    errorLabel: 'ERROR',
    hintLabel: 'PISTA',
    row: 'fila',
    rows: 'filas',
    schemaProfile: 'perfil',
    schemaWork: 'proyectos',
    schemaSkills: 'herramientas',
    schemaContact: 'contacto',
    schemaAbout: 'sobre mí',
  },
  query: {
    empty: 'La consulta está vacía.',
    emptyHint: 'Prueba SELECT * FROM engineer;',
    helpHint: 'Solo lectura.',
    helpRows: [
      ['SHOW TABLES', 'ver tablas'],
      ['DESCRIBE engineer', 'columnas de una tabla'],
      ['SELECT * FROM engineer', 'ir a sobre mí'],
      ['SELECT * FROM projects', 'ir a proyectos'],
      ['SELECT * FROM contact', 'ir a contacto'],
    ],
    permissionDenied: 'No se puede. Solo lectura.',
    permissionHint: 'Prueba SELECT * FROM contact;',
    readOnly: 'Desde el navegador esto es solo lectura.',
    readOnlyHint: 'Usa la sección de contacto más abajo.',
    selectNeedsFrom: 'Falta el FROM',
    engineerHint: 'SELECT * FROM projects;  los dos proyectos están abajo',
    projectsHint:
      'Abre un proyecto para ver el problema, la separación de datos, la métrica y el despliegue.',
  },
}
