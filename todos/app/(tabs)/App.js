import React, { useState } from 'react';
import {
 StyleSheet,
 Text,
 View,
 TextInput,
 TouchableOpacity,
 FlatList
} from 'react-native';
export default function App() {
 const [task, setTask] = useState('');
 const [todos, setTodos] = useState([]);
 const [filter, setFilter] = useState('All');
 const handleSubmit = () => {
   if (task.trim()) {
     setTodos([...todos, { id: Date.now().toString(), text: task, done: false }]);
     setTask('');
   }
 };
 const handleToggleDone = (id) => {
   setTodos(
     todos.map(todo =>
todo.id === id ? { ...todo, done: !todo.done } : todo
     )
   );
 };
 const handleDelete = (id) => {
   setTodos(todos.filter(todo => todo.id !== id));
 };
 const filteredTodos = todos.filter(todo => {
   if (filter === 'Active') return !todo.done;
   if (filter === 'Complete') return todo.done;
   return true;
 });
 return (
<View style={styles.container}>
<Text style={styles.title}>todos</Text>
<TextInput
       style={styles.input}
       placeholder="What needs to be done?"
       placeholderTextColor="#888"
       value={task}
       onChangeText={setTask}
     />
<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
<Text style={styles.submitText}>Submit</Text>
</TouchableOpacity>
<FlatList
       data={filteredTodos}
       keyExtractor={item => item.id}
       style={styles.list}
       renderItem={({ item }) => (
<View style={styles.todoItem}>
<Text
             style={[
               styles.todoText,
               item.done && { textDecorationLine: 'line-through', color: 'gray' }
             ]}
>
             {item.text}
</Text>
<View style={styles.actions}>
<TouchableOpacity onPress={() => handleToggleDone(item.id)}>
<Text style={styles.doneText}>Done</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => handleDelete(item.id)}>
<Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>
</View>
</View>
       )}
     />
<View style={styles.filters}>
       {['All', 'Active', 'Complete'].map(f => (
<TouchableOpacity key={f} onPress={() => setFilter(f)}>
<Text
             style={[
               styles.filterText,
               filter === f && styles.activeFilter
             ]}
>
             {f}
</Text>
</TouchableOpacity>
       ))}
</View>
</View>
 );
}
const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f6f6f6',
   padding: 20,
   paddingTop: 60,
 },
 title: {
   fontSize: 48,
   fontWeight: '300',
   color: '#b3a3a3',
   textAlign: 'center',
   marginBottom: 20,
 },
 input: {
   height: 50,
   borderColor: '#ddd',
   borderWidth: 1,
   borderRadius: 4,
   paddingHorizontal: 15,
   fontSize: 16,
   backgroundColor: '#fff',
 },
 submitButton: {
   backgroundColor: '#eaeaea',
   height: 50,
   borderRadius: 4,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: 10,
 },
 submitText: {
   fontSize: 18,
   color: '#333',
 },
 list: {
   marginTop: 20,
 },
 todoItem: {
   backgroundColor: '#fff',
   padding: 15,
   marginBottom: 10,
   borderRadius: 4,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 todoText: {
   fontSize: 16,
   fontWeight: '500',
 },
 actions: {
   flexDirection: 'row',
   gap: 10,
 },
 doneText: {
   color: 'green',
   fontWeight: 'bold',
   marginRight: 10,
 },
 deleteText: {
   color: 'brown',
   fontWeight: 'bold',
 },
 filters: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   marginTop: 20,
 },
 filterText: {
   fontSize: 16,
   color: '#888',
 },
 activeFilter: {
   fontWeight: 'bold',
   color: '#000',
 },
});