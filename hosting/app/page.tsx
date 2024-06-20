"use client";
import {useEffect, useState} from "react";
import {initializeApp} from 'firebase/app';
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from 'firebase/firestore';

function getEnv(name) {
    let val = process.env[name];
    if ((val === undefined) || (val === null)) {
        throw ("missing env var for " + name);
    }
    return val;
}
console.log(getEnv(NEXT_PUBLIC_COUCOU))
// Firebase configuration
const firebaseConfig = {
    apiKey: getEnv("NEXT_PUBLIC_API_KEY"),
    authDomain: getEnv("NEXT_PUBLIC_AUTH_DOMAIN"),
    projectId: getEnv("NEXT_PUBLIC_PROJECT_ID"),
    storageBucket: getEnv("NEXT_PUBLIC_STORAGE_BUCKET"),
    messagingSenderId: getEnv("NEXT_PUBLIC_MESSAGING_SENDER_ID"),
    appId: getEnv("NEXT_PUBLIC_APP_ID"),
    measurementId: getEnv("NEXT_PUBLIC_MEASUREMENT_ID")
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// TodoList component
const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const fetchTodos = async () => {
        const querySnapshot = await getDocs(collection(db, 'todos'));
        setTodos(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = async () => {
        if (newTodo.trim() === '') return;
        await addDoc(collection(db, 'todos'), {text: newTodo});
        setNewTodo('');
        fetchTodos();
    };

    const removeTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
        fetchTodos();
    };

    return (
        <div>
            <h1>QOOOOLLLL {process.env.NEXT_PUBLIC_COUCOU} {process.env.KIKI}</h1>
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

// Main page component
export default function Page() {
    return (
        <div>
            <TodoList/>
        </div>
    );
}
