import notesData from './notes.json';
import lodash from 'lodash'

let notes = notesData;

export default {
    //получение заметок
    getNotes: (id) => new Promise((resolve, reject) => {
        let clonedNotes = lodash.cloneDeep(notes);
        if (!id)
            resolve(clonedNotes);

        resolve(clonedNotes.find(el => el.id === id))
    }),
    //создание заметки
    createNote: (data) => new Promise((resolve, reject) => {
        notes.push(data);
        resolve(true);
    }),
    //удаление заметки
    deleteNote: (id) => new Promise((resolve, reject) => {
        notes = notes.filter(el => el.id !== id);
        resolve(true);
    }),
    //обновление заметки
    updateNote: (id, data) => new Promise((resolve, reject) => {
        let index = notes.findIndex(el => el.id === id);
        notes[index] = data;
        resolve(true);
    }),
}
