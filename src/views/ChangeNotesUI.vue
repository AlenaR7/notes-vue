<template>
    <div class="change-notes-ui wrap">
        <div class="content d-flex flex-column">
            <div class="header-table d-flex justify-between align-center">
                <div class="header" v-if="note">
                    {{note.header}}
                </div>
                <div class="d-flex">
                    <div class="button d-flex align-center background-green" v-if="isChanged" @click="saveManual">
                        <i class="action far fa-check-square transform"></i>
                        сохранить изменения
                    </div>
                    <div class="button background-blue d-flex align-center" @click="openCreateTodoModal()">
                        <i class="action far fa-plus-square"></i>
                        добавить задачу
                    </div>
                    <div class="button d-flex align-center background-red" @click="openDeleteModal()">
                        <i class="action far fa-trash-alt"></i>
                        удалить заметку
                    </div>
                </div>
            </div>
            <div class="content-table" v-if="filteredNotesTodo">
                <table border="1" width="100%" cellpadding="5">
                    <tr>
                        <th>Выполнено</th>
                        <th>Задачи</th>
                        <th>Действия</th>
                    </tr>
                    <tr v-for="todo in filteredNotesTodo" :key="todo.id">
                        <td>
                            <input type="checkbox" v-model="todo.done" @change="setChanged"/>
                        </td>
                        <td>
                            {{todo.name}}
                        </td>
                        <td>
                            <i class="action far fa-trash-alt red"
                               data-tooltip="удалить"
                               @click="openModalDeleteTodo(todo)">
                            </i>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="d-flex justify-between">
            <router-link :to="{name: 'NotesUI'}">
                <div class="back button d-flex align-center">
                    <i class="fas fa-arrow-left"></i>
                </div>
            </router-link>
            <div class="d-flex filters" v-if="note.todo && note.todo.length">
                <div class="button background-gray d-flex align-center" :class="{active: isActive === 0}" @click="statusNote = '', isActive = 0">
                    Все
                </div>
                <div class="button background-red d-flex align-center" :class="{active: isActive === 1}" @click="statusNote = 'active', isActive = 1">
                    Активные
                </div>
                <div class="button background-green d-flex align-center" :class="{active: isActive === 2}" @click="statusNote = 'done', isActive = 2">
                    Выполненные
                </div>
            </div>
        </div>
        <Dialog v-model="isDeleteModal"
                title="Вы действительно хотите удалить заметку?"
                @agree="deleteNote"
        >
        </Dialog>
        <Dialog v-model="isDeleteTodoModal"
                title="Вы действительно хотите удалить Todo?"
                @agree="deleteTodo"
        >
        </Dialog>
        <Dialog v-model="isCreateModal"
                title="Добавить Todo"
                @agree="addTodo"
        >
            <div class="center">
                <input
                        type="text"
                        v-model="todoName"
                        placeholder="Введите название"/>
            </div>
        </Dialog>
    </div>
</template>

<script>
    import Dialog from '../components/Dialog';
    import request from '../api/request.js'
    import {v4} from 'uuid';
    import _ from 'lodash';

    export default {
        name: 'ChangeNotesUI',
        components: {
            Dialog,
        },
        data() {
            return {
                note: null,
                currentTodo: "",
                todoName: "",
                isChanged: false,
                isDeleteModal: false,
                isDeleteTodoModal: false,
                isCreateModal: false,
                statusNote: '',
                isActive: 0,
            }
        },

        async created() {
            await this.getNotes();
        },

        methods: {
            getNotes() {
                request.getNotes(this.$route.params.id).then(note => {
                    this.note = note;
                })
            },
            async saveNote() {
                let newNote = _.cloneDeep(this.note); //клон данных с бэка

                this.filteredNotesTodo.forEach(elem => {
                    const task = newNote.todo.find(obj => obj.id === elem.id);

                    if(task)
                        task.done = elem.done;
                });

                await request.updateNote(this.note.id, newNote);
                //обновляем список заметок
                await this.getNotes();
                this.isChanged = false;
            },
            async deleteNote() {
                await request.deleteNote(this.note.id);
                await this.getNotes();
                this.isDeleteModal = false;
                await this.$router.push({name: 'NotesUI'});
            },
            addTodo() {
                let newTodo = {
                    "id": v4(),
                    "name": this.todoName,
                    "done": false,
                };

                this.note.todo.push(newTodo);
                this.isCreateModal = false;
            },
            deleteTodo() {
                this.note.todo = this.note.todo.filter(el => el.id !== this.currentTodo.id);
                this.isDeleteTodoModal = false;
            },
            //устанавливаем флаг изменения состояния
            setChanged() {
                this.isChanged = true;
            },
            saveManual() {
                this.saveNote();
            },
            openDeleteModal() {
                this.isDeleteModal = true;
            },
            openModalDeleteTodo(todo) {
                this.isDeleteTodoModal = true;
                this.currentTodo = todo;
            },
            openCreateTodoModal() {
                this.isCreateModal = true;
                this.todoName = "";
            },
            show: function() {
                this.isActive = true
            }
        },
        computed: {
            filteredNotesTodo: function () {
                let filterNote = _.cloneDeep(this.note?.todo) || [];

                if(this.statusNote)//если установлен фильтр
                    filterNote = filterNote.filter(elem => {
                        return (this.statusNote === 'active' && !elem.done) || (this.statusNote === 'done' && elem.done);
                    });

                return filterNote;
            }
        }
    }
</script>

<style scoped lang="scss">
    .content-table {
        input[type="checkbox"] {
            height: 15px;
            width: 15px;
        }
    }

    .back {
        background: gray;
        display: flex;
        max-width: 130px;
        margin-top: 20px;
        margin-left: 0;

        &:after {
            content: 'на главную';
        }
    }
</style>