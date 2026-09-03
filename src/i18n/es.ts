import type { Content } from './types'

export const es: Content = {
  profile: {
    name: 'Rogelio Lizarraga',
    handle: 'rogelio',
    role: 'Ingeniero de IA y datos',
    oneLiner:
      'Llevo datos etiquetados a un almacén bien definido, entreno el modelo sin filtrar información del futuro y dejo predicciones con una confianza que alguien pueda revisar.',
    recentWork:
      'ByteAI, revisión de radiografías de tórax (cardiomegalia y derrame pleural), y un almacén de quejas CFPB con un clasificador de producto',
    location: 'Remoto',
    email: 'rogeliolzgaesc@gmail.com',
    github: 'https://github.com/roger-git-427',
    linkedin: 'https://www.linkedin.com/in/rogelio-lizarraga-escobar/',
    resumeUrl: '',
  },
  about: {
    summary:
      'Mi trabajo cubre el ciclo completo: diseñar tablas, entrenar con una evaluación seria y dejar una interfaz o una API donde se vea la confianza del modelo y una persona pueda decidir. Busco trabajo en ingeniería de inteligencia artificial y datos.',
    background:
      'Eso quedó hecho en dos sistemas. ByteAI revisa radiografías de tórax para cardiomegalia y derrame pleural, con ConvNeXt-Tiny, puntuaciones de confianza y mapas Grad-CAM. Con las quejas del CFPB armé un esquema en estrella y un modelo que, a partir del texto, indica el producto financiero y se evalúa en fechas posteriores al entrenamiento.',
    canDo: [
      'Definir la granularidad de los datos, pasar de bronce a plata a oro y consultar todo en SQL.',
      'Entrenar con clases desbalanceadas y sin fugas de información (separación por paciente o por fecha, pesos por clase).',
      'Elegir la métrica que importa en la práctica: precisión en un umbral, F1 macro, confianza — no solo una exactitud que se vea bien en una diapositiva.',
      'Montar FastAPI y React para que quien revise vea la predicción, la confianza y el contexto suficiente para decidir.',
    ],
  },
  skills: {
    data: ['SQL', 'Python', 'pandas', 'esquemas en estrella', 'PostgreSQL', 'DuckDB'],
    models: ['PyTorch', 'scikit-learn', 'MLflow', 'evaluación'],
    serve: ['FastAPI', 'React'],
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
      id: 'byteai',
      name: 'ByteAI · radiografías de tórax',
      tagline:
        'Revisión clínica de cardiomegalia y derrame pleural con ConvNeXt-Tiny, confianza, precisión en el umbral de revisión y Grad-CAM.',
      problem:
        'Una clínica necesita una segunda mirada a las placas de tórax para dos hallazgos frecuentes: una puntuación y un mapa de calor con los que el médico pueda estar de acuerdo o no.',
      result:
        'Dos clasificadores binarios, entrenados con separación por paciente y pesos por clase, integrados en una aplicación en español con confianza, Grad-CAM, roles e historial de auditoría. Apoya la decisión; no diagnostica.',
      stack: ['PyTorch', 'timm', 'FastAPI', 'React', 'PostgreSQL'],
      github: 'https://github.com/roger-git-427/chest_xray_AI',
      metric: { label: 'prueba', value: 'por paciente' },
      stages: {
        ingest:
          'Usé NIH ChestX-ray14 con las listas oficiales de entrenamiento y prueba por paciente. El conjunto trae catorce hallazgos; el producto salió con dos — cardiomegalia y derrame — porque se ven con claridad y hay suficientes casos para medir. Las imágenes no están en el repositorio público.',
        transform:
          'El mismo paciente no puede estar en entrenamiento y en prueba. Cada hallazgo es sí o no. Como son poco frecuentes, la función de pérdida lleva pesos por clase: si no, el modelo aprende a decir que todo está normal y parece bueno sin ser útil.',
        train:
          'ConvNeXt-Tiny preentrenado en ImageNet con timm, entrenado como un clasificador binario por hallazgo con AdamW. Me quedé con el modelo de mejor ROC-AUC en validación; los dos hallazgos salieron al producto en cuanto sus clasificadores pasaron esa validación.',
        evaluate:
          'Se evalúa en imágenes de prueba del NIH, medidas por separado para cada hallazgo. El ROC-AUC ordena los casos y la matriz de confusión describe el umbral de trabajo. La interfaz muestra una confianza calibrada y solo marca el hallazgo si pasa el umbral de esa condición. La pregunta de la clínica es sencilla: cuando pide revisión, ¿con qué frecuencia acierta?',
        serve:
          'Aplicación clínica en español donde se abre el estudio y se ve la confianza de cardiomegalia y derrame, el mapa Grad-CAM y un informe para exportar, con roles e historial de auditoría. Quien interpreta la imagen sigue siendo un lector con licencia.',
      },
    },
    {
      id: 'cfpb-intelligence',
      name: 'Quejas CFPB · producto a partir del texto',
      tagline:
        'Del texto de la queja al producto financiero, con TF-IDF, regresión logística, confianza y evaluación en fechas posteriores al entrenamiento.',
      problem:
        'Las quejas llegan en texto libre. Antes de que alguien lea la cola, conviene saber de qué producto habla el mensaje y qué tan seguro está el modelo, sin usar quejas futuras en el entrenamiento.',
      result:
        'Evaluado en fechas posteriores al entrenamiento: exactitud 0,80, F1 ponderado 0,80 y F1 macro 0,68. Hipoteca e informes de crédito van bien; clases pequeñas como transferencias de dinero, no. Cada predicción trae confianza y alternativas.',
      stack: ['Python', 'SQL', 'scikit-learn', 'MLflow', 'FastAPI', 'DuckDB'],
      metric: { label: 'prueba', value: '0,80 exact. · 0,68 F1 macro' },
      stages: {
        ingest:
          'Los datos vienen de la base de quejas del consumidor del CFPB. Hay muchos productos etiquetados; el modelo responde una sola cosa: de qué producto trata este texto. La compañía, el asunto, el estado y la fecha viven en el almacén para consultarlos en SQL, fuera del modelo.',
        transform:
          'Organizado en capas bronce, plata y oro con esquema de estrella. El corte entre entrenamiento y prueba es por fecha: lo que llega después no entrena. Los informes de crédito dominan el conjunto; un modelo que siempre predijera eso se vería bueno sin ser útil. Los productos con muy pocos casos se dejan fuera.',
        train:
          'TF-IDF (unigramas y bigramas) que alimenta una regresión logística con pesos por clase, registrada en MLflow y entrenada como un solo modelo multiclase. Me quedé con la corrida medida en fechas posteriores, en lugar de una mezcla aleatoria de las mismas semanas.',
        evaluate:
          'En fechas más recientes que el entrenamiento, la exactitud llega a 0,80 y el F1 ponderado también a 0,80. El F1 macro es 0,68: ese es el número que no esconde las clases con pocos ejemplos. Por producto, hipoteca e informes de crédito se sostienen; las transferencias de dinero no. El sistema devuelve una confianza y alternativas. La pregunta práctica es la misma que en la revisión de radiografías: cuando asigna un producto, ¿qué porcentaje de esas asignaciones son correctas?',
        serve:
          'Se pega el texto y se obtiene el producto, la confianza y las siguientes opciones, además de quejas parecidas encontradas con la misma representación del texto. Las preguntas de análisis van a SQL de solo lectura sobre la capa oro; si un modelo de lenguaje propone la consulta, igual tiene que pasar un filtro que solo permite lecturas. El clasificador ordena la cola; una persona cierra el caso.',
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
    sqlHint: 'SHOW TABLES · SELECT * FROM projects · HELP',
    sqlEditorLabel: 'Editor SQL',
    statusReady: 'listo',
    statusRunning: 'ejecutando',
    statusOk: 'listo — última consulta correcta',
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
    engineerHint: 'SELECT * FROM projects; — los dos proyectos están abajo',
    projectsHint:
      'Abre un proyecto para ver el problema, la separación de datos, la métrica y el despliegue.',
  },
}