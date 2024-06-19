"use client";
import { initializeApp } from 'firebase/app';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from "react"

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'));
    setTodos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    await addDoc(collection(db, 'todos'), { text: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const removeTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
    fetchTodos();
  };

  return (
      <div>
        <h1>Todo List</h1>
        <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
          {todos.map(todo => (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => removeTodo(todo.id)}>Delete</button>
              </li>
          ))}
        </ul>
      </div>
  );
};


export default function Page() {
  return (
      <div>
        <TodoList />
      </div>
  );
}