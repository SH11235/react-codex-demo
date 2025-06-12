import { useState } from 'react'
import './App.css'

interface Task {
  id: number
  text: string
  tags: string[]
  completed: boolean
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [filterTag, setFilterTag] = useState('')

  const addTask = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTask: Task = {
      id: Date.now(),
      text: trimmed,
      tags: tags
        .split(/\s+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      completed: false,
    }
    setTasks([...tasks, newTask])
    setText('')
    setTags('')
  }

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const uniqueTags = Array.from(new Set(tasks.flatMap((t) => t.tags)))
  const visibleTasks = filterTag
    ? tasks.filter((t) => t.tags.includes(filterTag))
    : tasks

  return (
    <div className="todo-app">
      <h1>ToDo List</h1>
      <div className="add-task">
        <input
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          placeholder="Tags (space separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="filter">
        <label>
          Filter by tag:
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
          >
            <option value="">All</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul className="task-list">
        {visibleTasks.map((task) => (
          <li
            key={task.id}
            className={task.completed ? 'completed' : undefined}
          >
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              {task.text}
            </label>
            {task.tags.map((tag) => (
              <span key={tag} className="tag">
                #{tag}
              </span>
            ))}
            <button className="delete" onClick={() => removeTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
