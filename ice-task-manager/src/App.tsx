import { useState } from 'react';
import './App.css';
import { useTasks } from './hooks/useTasks';

const taskTwoChecklist = [
  'Hook useTasks centraliza la lógica de estado',
  'Gestión de tareas en memoria',
  'Acciones para crear y actualizar tareas',
  'API clara y reutilizable para componentes',
];

function App() {
  const { tasks, selectedTaskId, createTask, updateIceValues, selectTask, getSelectedTask } = useTasks();
  const [demoName, setDemoName] = useState('');
  const [demoDescription, setDemoDescription] = useState('');

  const handleCreateDemoTask = () => {
    if (demoName.trim()) {
      createTask(demoName, demoDescription);
      setDemoName('');
      setDemoDescription('');
    }
  };

  const handleUpdateIce = (impact: number, confidence: number, ease: number) => {
    if (selectedTaskId) {
      updateIceValues(selectedTaskId, { impact, confidence, ease });
    }
  };

  const selectedTask = getSelectedTask();

  return (
    <div className="app-shell">
      <header className="hero-section">
        <span className="badge">MVP ICE · Tarea 2</span>
        <h1>Gestor de tareas inteligente con ICE</h1>
        <p className="lead">
          Hook useTasks centraliza la lógica, preparando componentes UI para las próximas
          iteraciones.
        </p>
      </header>

      <main className="content-grid">
        <section className="panel panel-accent">
          <h2>Estado actual</h2>
          <p>
            useTasks gestiona el estado de tareas, selección y modal. Los componentes UI
            consumirán este hook sin mezclar responsabilidades.
          </p>
        </section>

        <section className="panel">
          <h2>Demo: Crear tarea</h2>
          <input
            type="text"
            placeholder="Nombre de la tarea"
            value={demoName}
            onChange={(e) => setDemoName(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            value={demoDescription}
            onChange={(e) => setDemoDescription(e.target.value)}
          />
          <button onClick={handleCreateDemoTask}>Crear tarea</button>
        </section>

        <section className="panel">
          <h2>Tareas ({tasks.length})</h2>
          {tasks.length === 0 ? (
            <p>No hay tareas aún.</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} onClick={() => selectTask(task.id)}>
                  <strong>{task.name}</strong> - {task.description}
                  {task.iceScore && <span> (ICE: {task.iceScore})</span>}
                </li>
              ))}
            </ul>
          )}
        </section>

        {selectedTask && (
          <section className="panel">
            <h2>Editar ICE: {selectedTask.name}</h2>
            <div>
              <label>
                Impact (1-10):
                <input
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={selectedTask.impact ?? 5}
                  onChange={(e) => handleUpdateIce(parseInt(e.target.value), selectedTask.confidence ?? 5, selectedTask.ease ?? 5)}
                />
              </label>
              <label>
                Confidence (1-10):
                <input
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={selectedTask.confidence ?? 5}
                  onChange={(e) => handleUpdateIce(selectedTask.impact ?? 5, parseInt(e.target.value), selectedTask.ease ?? 5)}
                />
              </label>
              <label>
                Ease (1-10):
                <input
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={selectedTask.ease ?? 5}
                  onChange={(e) => handleUpdateIce(selectedTask.impact ?? 5, selectedTask.confidence ?? 5, parseInt(e.target.value))}
                />
              </label>
            </div>
            {selectedTask.iceScore && <p>ICE Score: {selectedTask.iceScore}</p>}
          </section>
        )}

        <section className="panel">
          <h2>Alcance de la Tarea 2</h2>
          <ul className="checklist">
            {taskTwoChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
