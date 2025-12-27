import { useState } from 'react'
import './App.css'

// Icons (using emoji for MVP, can replace with proper icon library)
const icons = {
  dashboard: '📊',
  fisica: '💪',
  afectiva: '💖',
  cognitiva: '🧠',
  sociocultural: '🌍',
  moral: '⚖️',
  espiritual: '✨',
  idps: '📈',
  pfc: '🏛️',
  evaluacion: '📝',
  settings: '⚙️'
}

// Dimension data
const dimensions = [
  { id: 'fisica', name: 'Física', icon: icons.fisica, description: 'Autocuidado y vida saludable', color: 'var(--dimension-fisica)' },
  { id: 'afectiva', name: 'Afectiva', icon: icons.afectiva, description: 'Identidad, autoestima y vínculos', color: 'var(--dimension-afectiva)' },
  { id: 'cognitiva', name: 'Cognitivo-Intelectual', icon: icons.cognitiva, description: 'Pensamiento crítico y análisis', color: 'var(--dimension-cognitiva)' },
  { id: 'sociocultural', name: 'Sociocultural', icon: icons.sociocultural, description: 'Ciudadanía y participación', color: 'var(--dimension-sociocultural)' },
  { id: 'moral', name: 'Moral', icon: icons.moral, description: 'Juicio ético y derechos humanos', color: 'var(--dimension-moral)' },
  { id: 'espiritual', name: 'Espiritual', icon: icons.espiritual, description: 'Sentido, trascendencia y proyecto de vida', color: 'var(--dimension-espiritual)' }
]

// Education levels
const levels = [
  { id: 'parvularia', name: 'Parvularia' },
  { id: 'basica1', name: 'Básica 1°-6°' },
  { id: 'basica2', name: 'Básica 7°-8°' },
  { id: 'media', name: 'Media' }
]

// Sample activities
const sampleActivities = {
  fisica: [
    { title: 'Pausas Activas', description: 'Rutina de 5 minutos para activar el cuerpo durante clases' },
    { title: 'Proyecto Huerto Escolar', description: 'Planificación de huerto con seguimiento de cultivos' }
  ],
  afectiva: [
    { title: 'Diario de Reflexión', description: 'Preguntas guiadas de autoconocimiento y emociones' },
    { title: 'Círculo de Empatía', description: 'Dinámica grupal para fortalecer vínculos' }
  ],
  cognitiva: [
    { title: 'Debate Estructurado', description: 'Plantilla para organizar debates con roles y tiempos' },
    { title: 'Resolución de Casos', description: 'Escenarios para análisis y pensamiento crítico' }
  ],
  sociocultural: [
    { title: 'Proyecto Comunitario', description: 'Guía para campañas de reciclaje o limpieza' },
    { title: 'Simulación Democrática', description: 'Elección de directiva de curso con proceso real' }
  ],
  moral: [
    { title: 'Dilema Ético', description: 'Casos para discusión de valores y toma de decisiones' },
    { title: 'Análisis DDHH', description: 'Estudio de casos de derechos humanos' }
  ],
  espiritual: [
    { title: 'Proyecto de Vida', description: 'Constructor guiado de metas y aspiraciones' },
    { title: 'Diálogo Filosófico', description: 'Preguntas sobre propósito y felicidad' }
  ]
}

// IDPS connection data
const idpsData = [
  { indicator: 'Autoestima académica y motivación escolar', dimensions: ['afectiva', 'cognitiva'], description: 'Retroalimentación formativa y portafolio de logros' },
  { indicator: 'Clima de convivencia escolar', dimensions: ['sociocultural', 'moral'], description: 'Acuerdos de aula y mediación de conflictos' },
  { indicator: 'Participación y formación ciudadana', dimensions: ['sociocultural', 'cognitiva', 'moral'], description: 'Centro de alumnos y proyectos ciudadanos' },
  { indicator: 'Hábitos de vida saludable', dimensions: ['fisica', 'afectiva'], description: 'Actividades deportivas y educación para la salud' }
]

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedLevel, setSelectedLevel] = useState('basica1')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard dimensions={dimensions} />
      case 'idps':
        return <IDPSPanel data={idpsData} />
      case 'pfc':
        return <PFCPanel />
      case 'evaluacion':
        return <EvaluacionPanel />
      default:
        // Check if it's a dimension
        const dimension = dimensions.find(d => d.id === activeSection)
        if (dimension) {
          return <DimensionPanel dimension={dimension} activities={sampleActivities[dimension.id]} />
        }
        return <Dashboard dimensions={dimensions} />
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <span style={{ fontSize: '28px' }}>🇨🇱</span>
          <h1>OAT Chile</h1>
        </div>

        <nav className="sidebar-nav">
          {/* Dashboard */}
          <div
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <span className="nav-item-icon">{icons.dashboard}</span>
            <span>Dashboard</span>
          </div>

          {/* Dimensions */}
          <div className="nav-section-title">Dimensiones OAT</div>
          {dimensions.map(dim => (
            <div
              key={dim.id}
              className={`nav-item ${activeSection === dim.id ? 'active' : ''}`}
              data-dimension={dim.id}
              onClick={() => setActiveSection(dim.id)}
            >
              <span className="dimension-indicator"></span>
              <span className="nav-item-icon">{dim.icon}</span>
              <span>{dim.name}</span>
            </div>
          ))}

          {/* Tools */}
          <div className="nav-section-title">Herramientas</div>
          <div
            className={`nav-item ${activeSection === 'idps' ? 'active' : ''}`}
            onClick={() => setActiveSection('idps')}
          >
            <span className="nav-item-icon">{icons.idps}</span>
            <span>IDPS</span>
          </div>
          <div
            className={`nav-item ${activeSection === 'pfc' ? 'active' : ''}`}
            onClick={() => setActiveSection('pfc')}
          >
            <span className="nav-item-icon">{icons.pfc}</span>
            <span>Plan Ciudadanía</span>
          </div>
          <div
            className={`nav-item ${activeSection === 'evaluacion' ? 'active' : ''}`}
            onClick={() => setActiveSection('evaluacion')}
          >
            <span className="nav-item-icon">{icons.evaluacion}</span>
            <span>Evaluación</span>
          </div>
        </nav>
      </aside>

      {/* Header */}
      <header className="header">
        <button
          className="btn btn-secondary"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ marginRight: 'var(--space-4)' }}
        >
          ☰
        </button>
        <h2 className="header-title">
          {activeSection === 'dashboard' ? 'Dashboard Principal' :
            activeSection === 'idps' ? 'Indicadores IDPS' :
              activeSection === 'pfc' ? 'Plan de Formación Ciudadana' :
                activeSection === 'evaluacion' ? 'Evaluación Formativa' :
                  dimensions.find(d => d.id === activeSection)?.name || 'Dashboard'}
        </h2>
        <div className="header-actions">
          <div className="level-selector">
            {levels.map(level => (
              <button
                key={level.id}
                className={`level-option ${selectedLevel === level.id ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level.id)}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

// Dashboard Component
function Dashboard({ dimensions }) {
  return (
    <div className="animate-fade-in">
      <div className="dashboard-grid">
        {/* Stats */}
        <div className="card">
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">6</span>
            <span className="dashboard-stat-label">Dimensiones OAT</span>
          </div>
        </div>
        <div className="card">
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">4</span>
            <span className="dashboard-stat-label">Indicadores IDPS</span>
          </div>
        </div>
        <div className="card">
          <div className="dashboard-stat">
            <span className="dashboard-stat-value">12</span>
            <span className="dashboard-stat-label">Actividades Modelo</span>
          </div>
        </div>
      </div>

      {/* Dimension Cards */}
      <h3 style={{ marginBottom: 'var(--space-6)' }}>Dimensiones del Desarrollo</h3>
      <div className="dashboard-grid">
        {dimensions.map((dim, index) => (
          <div
            key={dim.id}
            className="card dimension-card animate-fade-in"
            data-dimension={dim.id}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="card-header">
              <span className="badge" style={{ background: `color-mix(in srgb, ${dim.color} 15%, white)`, color: dim.color }}>
                {dim.icon} {dim.name}
              </span>
            </div>
            <p className="text-muted">{dim.description}</p>
            <div className="progress-bar mt-4">
              <div className="progress-bar-fill" style={{ width: `${Math.random() * 50 + 30}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Dimension Panel Component
function DimensionPanel({ dimension, activities }) {
  return (
    <div className="animate-fade-in">
      <div className="card dimension-card mb-6" data-dimension={dimension.id}>
        <div className="flex items-center gap-4">
          <span style={{ fontSize: '48px' }}>{dimension.icon}</span>
          <div>
            <h2>Dimensión {dimension.name}</h2>
            <p className="text-muted">{dimension.description}</p>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: 'var(--space-4)' }}>Actividades Sugeridas</h3>
      <div className="activity-list">
        {activities?.map((activity, index) => (
          <div key={index} className="activity-item">
            <div
              className="activity-icon"
              style={{ background: `color-mix(in srgb, ${dimension.color} 15%, white)` }}
            >
              {dimension.icon}
            </div>
            <div className="activity-content">
              <div className="activity-title">{activity.title}</div>
              <div className="activity-description">{activity.description}</div>
            </div>
            <button className="btn btn-primary">Ver más</button>
          </div>
        ))}
      </div>

      <button className="btn btn-accent mt-6">+ Agregar Actividad</button>
    </div>
  )
}

// IDPS Panel Component
function IDPSPanel({ data }) {
  return (
    <div className="animate-fade-in">
      <div className="card mb-6">
        <h3>Vinculación OAT - IDPS</h3>
        <p className="text-muted">
          Conexión entre el trabajo formativo y los Indicadores de Desarrollo Personal y Social
          medidos por la Agencia de Calidad de la Educación.
        </p>
      </div>

      <div className="card">
        <table className="idps-table">
          <thead>
            <tr>
              <th>Indicador IDPS</th>
              <th>Dimensiones OAT</th>
              <th>Funcionalidad App</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td><strong>{row.indicator}</strong></td>
                <td>
                  <div className="flex gap-2">
                    {row.dimensions.map(dimId => {
                      const dim = dimensions.find(d => d.id === dimId)
                      return (
                        <span
                          key={dimId}
                          className={`badge badge-${dimId}`}
                        >
                          {dim?.icon} {dim?.name}
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="text-muted">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// PFC Panel Component (Plan de Formación Ciudadana)
function PFCPanel() {
  const pfcModules = [
    { id: 'digital', icon: '💻', title: 'Ciudadanía Digital', description: 'Uso responsable de TIC, ética digital, protección de datos' },
    { id: 'sustentabilidad', icon: '🌱', title: 'Sustentabilidad', description: 'Proyectos socioambientales, huella de carbono, cultura verde' },
    { id: 'democracia', icon: '🗳️', title: 'Democracia', description: 'Simulación de procesos democráticos, debates institucionales' },
    { id: 'genero', icon: '⚖️', title: 'Equidad de Género', description: 'Recursos para evitar estereotipos, análisis de roles sociales' }
  ]

  return (
    <div className="animate-fade-in">
      <div className="card mb-6">
        <h3>Plan de Formación Ciudadana</h3>
        <p className="text-muted">
          Cumplimiento Ley N°20.911 - Herramienta para diseño, ejecución y seguimiento del PFC.
        </p>
      </div>

      <div className="dashboard-grid">
        {pfcModules.map((module, index) => (
          <div key={module.id} className="card" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-center gap-4 mb-4">
              <span style={{ fontSize: '32px' }}>{module.icon}</span>
              <h4>{module.title}</h4>
            </div>
            <p className="text-muted">{module.description}</p>
            <button className="btn btn-outline mt-4">Explorar Recursos</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Evaluacion Panel Component
function EvaluacionPanel() {
  return (
    <div className="animate-fade-in">
      <div className="card mb-6">
        <h3>Evaluación Formativa</h3>
        <p className="text-muted">
          Evaluación cualitativa alineada con el Decreto 67. Sin calificaciones numéricas,
          enfocada en el acompañamiento del desarrollo formativo.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h4 className="mb-4">📋 Registro de Observación</h4>
          <p className="text-muted">Documentar conductas y actitudes observables</p>
          <button className="btn btn-primary mt-4">Nuevo Registro</button>
        </div>
        <div className="card">
          <h4 className="mb-4">📁 Portafolio Digital</h4>
          <p className="text-muted">Recopilar trabajos y reflexiones del estudiante</p>
          <button className="btn btn-primary mt-4">Ver Portafolios</button>
        </div>
        <div className="card">
          <h4 className="mb-4">✅ Autoevaluación</h4>
          <p className="text-muted">Herramientas para que estudiantes evalúen su progreso</p>
          <button className="btn btn-primary mt-4">Crear Pauta</button>
        </div>
        <div className="card">
          <h4 className="mb-4">📊 Informes Cualitativos</h4>
          <p className="text-muted">Generar reportes para apoderados y estudiantes</p>
          <button className="btn btn-primary mt-4">Generar Informe</button>
        </div>
      </div>
    </div>
  )
}

export default App
