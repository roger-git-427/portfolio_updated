import type { Content } from './types'

export const es: Content = {
  profile: {
    name: 'Rogelio Lizarraga',
    handle: 'rogelio',
    role: 'Ingeniero de IA y datos',
    oneLiner:
      'Llevo datos etiquetados a un almacén bien definido, entreno el modelo sin filtrar información del futuro y dejo predicciones con una confianza que alguien pueda revisar.',
    recentWork: 'CXR AI Analyzer y un lakehouse CFPB, los dos están abajo.',
    location: 'Tijuana, Baja California, dispuesto a reubicarme',
    email: 'rogeliolzgaesc@gmail.com',
    github: 'https://github.com/roger-git-427',
    linkedin: 'https://www.linkedin.com/in/rogelio-lizarraga-escobar/',
    resumeUrl: '',
  },
  about: {
    summary:
      'Vivo en Tijuana; abierto a remoto o a reubicarme. Licenciatura en Ciencia de Datos y Matemáticas en el Tecnológico de Monterrey (especialidad en IA avanzada). Ahora soy Data Manager en una empresa de geomática: datos de vuelo a S3 y a un NAS, Azure/PostgreSQL, reportes. Busco roles de ingeniería de IA y datos donde alguien todavía tenga que confiar en la puntuación.',
    background:
      'Dos sistemas en esta página: CXR AI Analyzer para tamizaje de radiografías de tórax, y un lakehouse de quejas CFPB con clasificador de producto, búsqueda MiniLM y SQL de solo lectura.',
    canDo: [
      'Definir la granularidad de los datos, pasar de bronce a plata a oro y consultar todo en SQL.',
      'Entrenar con clases desbalanceadas y sin fugas de información (separación por paciente o por fecha, pesos por clase).',
      'Elegir la métrica que importa en la práctica: precisión en un umbral, F1 macro, confianza, no solo una exactitud que se vea bien en una diapositiva.',
      'Montar FastAPI y React para que quien revise vea la predicción, la confianza y el contexto suficiente para decidir.',
    ],
  },
  skills: {
    data: ['SQL', 'Python', 'pandas', 'esquemas en estrella', 'PostgreSQL', 'DuckDB'],
    models: ['PyTorch', 'scikit-learn', 'MLflow', 'sentence-transformers'],
    serve: ['FastAPI', 'React', 'Docker'],
  },
  skillDomains: {
    data: 'datos',
    models: 'modelos',
    serve: 'despliegue',
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
      id: 'cxrai',
      name: 'CXR AI Analyzer: radiografías de tórax',
      tagline:
        'Revisión clínica de cardiomegalia y derrame pleural con ConvNeXt-Tiny, confianza, Grad-CAM y cuentas multi-clínica.',
      problem:
        'Una clínica necesita una segunda mirada a las placas de tórax para dos hallazgos frecuentes: una puntuación y un mapa de calor con los que el médico pueda estar de acuerdo o no.',
      result:
        'Dos clasificadores binarios, entrenados con separación por paciente y pesos por clase, en una aplicación multi-clínica en español: confianza, Grad-CAM, informe PDF, sesiones (master / admin / paciente) e historial de auditoría. Apoya la decisión; no diagnostica.',
      stack: ['PyTorch', 'timm', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
      github: 'https://github.com/roger-git-427/chest_xray_AI',
      metric: { label: 'prueba', value: 'por paciente' },
      stages: {
        ingest:
          'Usé NIH ChestX-ray14 con las listas oficiales de entrenamiento y prueba por paciente. El conjunto trae catorce hallazgos; el producto salió con dos, cardiomegalia y derrame, porque se ven con claridad y hay suficientes casos para medir. Los pesos solo se cargan si el checkpoint está en disco. Las imágenes no están en el repositorio.',
        transform:
          'El mismo paciente no puede estar en entrenamiento y en prueba. Cada hallazgo es sí o no. Como son poco frecuentes, la función de pérdida lleva pesos por clase: si no, el modelo aprende a decir que todo está normal y parece bueno sin ser útil. PNG, JPG y DICOM siguen el mismo camino de tamizaje.',
        train:
          'ConvNeXt-Tiny preentrenado en ImageNet con timm, entrenado como un clasificador binario por hallazgo con AdamW. Me quedé con el modelo de mejor ROC-AUC en validación; los dos hallazgos salieron al producto en cuanto sus clasificadores pasaron esa validación.',
        evaluate:
          'Se evalúa en imágenes de prueba del NIH, medidas por separado para cada hallazgo. El ROC-AUC ordena los casos y la matriz de confusión describe el umbral de trabajo. La interfaz muestra una confianza y solo marca el hallazgo si pasa el umbral de esa condición (0,3 cardiomegalia, 0,4 derrame). La pregunta de la clínica es sencilla: cuando pide revisión, ¿con qué frecuencia acierta?',
        serve:
          'Docker Compose levanta Postgres, FastAPI y nginx; en local se usa SQLite. Se abre el estudio y se ve la confianza de cardiomegalia y derrame, el mapa Grad-CAM y un informe para exportar. Las clínicas están aisladas; los roles son master, admin y paciente, con sesiones e historial de auditoría. Quien interpreta la imagen sigue siendo un lector con licencia.',
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
        'En fechas posteriores al entrenamiento (nov a dic 2024): exactitud 0,80, F1 ponderado 0,80 y F1 macro 0,68 en ocho productos. Hipoteca e informes de crédito se sostienen; transferencias de dinero, no. FastAPI sirve producto y confianza, quejas parecidas con MiniLM, y SQL de solo lectura sobre oro.',
      stack: ['Python', 'DuckDB', 'scikit-learn', 'MLflow', 'sentence-transformers', 'FastAPI'],
      github: 'https://github.com/roger-git-427/complaint_intelligence_v2.0',
      metric: { label: 'prueba', value: '0,80 exact., 0,68 F1 macro' },
      stages: {
        ingest:
          'Los datos se bajan de la base de quejas del CFPB por API, zip masivo o un snapshot de Hugging Face, y se cortan a narrativas de 2024 (~8 mil filas). La granularidad es una queja. El clasificador solo ve el texto; la compañía, el asunto, el estado y la fecha viven en el almacén para SQL.',
        transform:
          'Bronce es parquet tal como llega. Plata tipa fechas, pasa sí/no a booleanos y quita duplicados por complaint_id. Oro es un esquema en estrella (fact_complaints; compañía, producto, asunto, geografía, canal, calendario). Hay chequeos de unicidad y de llaves foráneas de compañía. Los productos con menos de 40 casos se dejan fuera. Después de ordenar por date_received, el último 20 % es prueba: lo que llega después no entrena.',
        train:
          'TF-IDF (unigramas y bigramas, 40 mil rasgos) que alimenta una regresión logística con pesos por clase, registrada en MLflow. Me quedé con la corrida medida en fechas posteriores, no con una mezcla de las mismas semanas. El entrenamiento también ajusta un modelo de respuesta a tiempo (la narrativa es una señal débil) y arma un índice MiniLM sobre plata, con TF-IDF de respaldo.',
        evaluate:
          'En fechas posteriores (2024-11-19 a 2024-12-24): exactitud 0,80, F1 ponderado 0,80, F1 macro 0,68. Hipoteca F1 0,89 e informes de crédito 0,86; transferencias de dinero 0,29. El modelo de respuesta a tiempo da ROC-AUC 0,81 y F1 macro 0,50: la exactitud se ve alta porque casi todas las respuestas son a tiempo, así que no es el número que importa. Cada llamada de producto trae confianza y alternativas.',
        serve:
          'FastAPI: /predict devuelve producto, confianza y alternativas; /search encuentra quejas parecidas con MiniLM; /sql y /chat convierten preguntas analíticas a DuckDB sobre oro. Si un modelo de lenguaje propone SQL, igual tiene que pasar un filtro de solo SELECT (sin DML/DDL ni varias sentencias). Docker Compose sirve la API sobre el parquet de oro y los artefactos entrenados. El clasificador ordena la cola; una persona cierra el caso.',
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
      'Busco roles de inteligencia artificial y datos. Lo más fácil es escribirme por correo o por GitHub.',
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
