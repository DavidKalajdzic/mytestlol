"use client";
import { useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';

// Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCsP4G2Q3c-d8Xi6ngH8w0Y7AkFuvXJwRc",
//     authDomain: "unprojettest-cb8ed.firebaseapp.com",
//     projectId: "unprojettest-cb8ed",
//     storageBucket: "unprojettest-cb8ed.appspot.com",
//     messagingSenderId: "153996520538",
//     appId: "1:153996520538:web:4b586893b8b1ebb7ad7c63",
//     measurementId: "G-N9JYWTX36Q"
// };
const firebaseConfig = {
    apiKey: "AIzaSyCD_bB8seL_PBQX7EpJm_JYi1B1lFqhHs0",
    authDomain: "deuxieme-projet-test.firebaseapp.com",
    projectId: "deuxieme-projet-test",
    storageBucket: "deuxieme-projet-test.appspot.com",
    messagingSenderId: "341887412320",
    appId: "1:341887412320:web:1a439c885ea328b6d37b05",
    measurementId: "G-581H4RZ9K9"
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
            <TodoList />
        </div>
    );
}
