<template>
    <div class="change-notes-ui wrap">
        <div class="content d-flex flex-column">
            <div class="header-table d-flex justify-between align-center">
                <div class="header">
                    <input
                            type="text"
                            placeholder="Введите название заметки"
                            v-if="note"
                            v-model="note.header"
                            @input="setChanged"/>
                </div>
                <div class="d-flex">
                    <div class="button d-flex align-center background-green" v-if="isChanged" @click="saveManual">
                        <i class="action far fa-check-square transform"></i>
                        сохранить изменения
                    </div>
                    <div class="button background-gray d-flex align-center" @click="clearChanges" v-if="isChanged">
                        <i class="action fas fa-history"></i>
                        отменить редактирование
                    </div>
                    <div class="button background-gray d-flex align-center" @click="cancelChanges" v-if="lastNote">
                        <i class="action fas fa-history"></i>
                        отменить внесенное изменение
                    </div>
                    <div class="button background-gray d-flex align-center" @click="repeatChanges" v-if="cancelledNote">
                        <i class="action fas fa-history transform-svg"></i>
                        повторить отменённое изменение
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
            <div class="content-table" v-if="note">
                <table border="1" width="100%" cellpadding="5">
                    <tr>
                        <th>Выполнено</th>
                        <th>Задачи</th>
                        <th>Действия</th>
                    </tr>
                    <tr v-for="todo in note.todo" :key="todo.id">
                        <td>
                            <input type="checkbox" v-model="todo.done" @change="setChanged"/>
                        </td>
                        <td>
                            <textarea v-model="todo.name" @input="setChanged">
                            </textarea>
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
        <router-link :to="{name: 'NotesUI'}">
            <div class="back button">
                <i class="fas fa-arrow-left"></i>
            </div>
        </router-link>

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
    import lodash from 'lodash';

    export default {
        name: 'ChangeNotesUI',
        components: {
            Dialog,
        },
        data() {
            return {
                requestedNote: null,
                note: null,
                lastNote: null,
                cancelledNote: null,
                currentTodo: "",
                todoName: "",
                isChanged: false,
                isDeleteModal: false,
                isDeleteTodoModal: false,
                isCreateModal: false,
            }
        },

        async created() {
            await this.getNotes();
            this.setFromRequested();
        },

        methods: {
            getNotes() {
                request.getNotes(this.$route.params.id).then(note => {
                    this.requestedNote = note;
                })
            },
            async saveNote() {
                this.lastNote = lodash.cloneDeep(this.requestedNote);
                await request.updateNote(this.note.id, this.note);
                //обновляем список заметок
                this.getNotes();
                this.isChanged = false;
            },
            async deleteNote() {
                await request.deleteNote(this.note.id);
                this.getNotes();
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
                this.setChanged();
            },
            deleteTodo() {
                this.note.todo = this.note.todo.filter(el => el.id !== this.currentTodo.id);
                this.isDeleteTodoModal = false;
                this.setChanged();
            },
            //устанавливаем флаг изменения состояния
            setChanged() {
                this.isChanged = true;
            },
            //создаем клон обьекта заметки
            setFromRequested() {
                this.note = lodash.cloneDeep(this.requestedNote);
            },
            saveManual() {
                this.cancelledNote = "";
                this.saveNote();
            },
            clearChanges() {
                this.setFromRequested();
                this.isChanged = false;
            },
            async cancelChanges() {
                this.cancelledNote = lodash.cloneDeep(this.note);
                //записываем заметку с предыдущими изменениями как текущую
                this.note = lodash.cloneDeep(this.lastNote);
                await this.saveNote();
                this.lastNote = "";
            },
            async repeatChanges() {
                //записываем заметку с отмененными изменениями как текущую
                this.note = lodash.cloneDeep(this.cancelledNote);
                await this.saveNote();
                this.lastNote = "";
                this.cancelledNote = "";
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
        },
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
        max-width: 120px;
        margin-top: 20px;
        margin-left: 0;

        &:after {
            content: 'на главную';
        }
    }
</style>