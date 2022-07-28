<template>
    <div class="notes-ui wrap">
        <div class="content d-flex flex-column">
            <div class="header-table d-flex justify-between">
                <div class="header">
                    <h1>Заметки</h1>
                </div>
                <div class="create-note button background-blue d-flex align-center" @click="openCreateModal()">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
            <div class="content-table">
                <table border="1" width="100%">
                    <tr>
                        <th v-for="header in headerTable">{{ header.text }}</th>
                    </tr>
                    <tr v-for="data in notes" :key="data.id">
                        <td>{{ data.header }}</td>
                        <td class="d-flex justify-center">
                            <ul>
                                <li v-for="todoContent in filterTodo(data.todo)" :key="data.todo.id">
                                    <span>{{ todoContent.name}}</span>
                                </li>
                            </ul>
                        </td>
                        <td>
                            <router-link :to="{name: 'ChangeNotesUI', params: {id: data.id}}">
                                <i class="action fas fa-edit green"
                                   data-tooltip="Изменить">
                                </i>
                            </router-link>
                            <i class="action far fa-trash-alt red"
                               data-tooltip="Удалить"
                               @click="openDeleteModal(data)">
                            </i>
                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <Dialog v-model="isCreateModal"
                title="Добавить заметку"
                @agree="createNote"
        >
            <div class="center">
                <input type="text" v-model="noteName" placeholder="Введите название"/>
            </div>
        </Dialog>
        <Dialog v-model="isDeleteModal"
                title="Вы действительно хотите удалить заметку?"
                @agree="deleteNote"
        >
        </Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog';
    import {v4} from 'uuid';
    import request from '../api/request.js'

    export default {
        name: 'NotesUI',
        components: {
            Dialog,
        },

        data() {
            return {
                headerTable: [
                    {text: 'Заголовок', value: 'header'},
                    {text: 'Задачи', value: 'todo'},
                    {text: 'Действия', value: 'actions'},
                ],
                note: '',
                noteName: '',
                notes: [],
                limitNotes: 10,
                isDeleteModal: false,
                isCreateModal: false,
            }
        },

        created() {
            this.getNotes();
        },

        methods: {
            getNotes() {
                request.getNotes().then(notes => {
                    this.notes = notes;
                })
            },
            createNote() {
                let generateId = v4();
                let obj = {
                    id: generateId,
                    header: this.noteName,
                    todo: [],
                };

                this.isCreateModal = false;

                request.createNote(obj).then(notes => {
                    this.$router.push({name: 'ChangeNotesUI', params: {id: generateId}});
                })
            },
            deleteNote() {
                request.deleteNote(this.note.id).then(notes => {
                    this.getNotes();
                    this.isDeleteModal = false;
                    this.note = '';
                })
            },
            openDeleteModal(note) {
                this.isDeleteModal = true;
                this.note = note;
            },
            openCreateModal() {
                this.isCreateModal = true;
                this.noteName = '';
            },
            filterTodo(todo) {
                return this.limitNotes ? todo.slice(0, this.limitNotes) : todo;
            }
        },
    }
</script>

<style scoped lang="scss">
    .create-note {
        &:after {
            content: 'Новая заметка';
        }
    }
</style>