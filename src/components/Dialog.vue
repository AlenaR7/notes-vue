<template>
    <div v-if="isShow">
        <div class="dialog-content">
            <div class="dialog d-flex flex-column">
                <div class="header d-flex justify-end">
                    <i class="fas fa-times" @click="this.closeDialog"></i>
                </div>
                <div class="center">{{title}}</div>

                <slot></slot>

                <div class="d-flex justify-between footer">
                    <div class="disagree butt" @click="this.closeDialog"></div>
                    <div class="agree butt" @click="agreeDialog"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Dialog',
        props: ['value', 'title'],
        data() {
            return {
                noteName: '',
            };
        },

        computed: {
            isShow: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val)
                }
            }
        },

        methods: {
            agreeDialog() {
                this.$emit('agree');
            },
            closeDialog() {
                this.isShow = false;
            },
        },
    }
</script>

<style scoped lang="scss">
    .dialog-content {
        width: 100%;
        min-height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        overflow: hidden;
        position: fixed;
        z-index: 10000000000;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: baseline;
    }

    .dialog {
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        background-color: #fff;
        border-radius: 4px;
        width: 350px;
        padding: 20px;
        position: relative;
        margin-top: 300px;

        .header {
            i {
                &.fa-times {
                    color: #757575;
                    cursor: pointer;
                }
            }
        }

        .center {
            padding: 25px 0;
        }

        .title {
            padding: 10px 0;
        }
    }

    .butt {
        border-radius: 4px;
        padding: 10px;
        cursor: pointer;
        color: white;
        text-transform: uppercase;

        &:hover
        {
            opacity: 0.8;
        }
    }

    .disagree {
        background: gray;
        opacity: 0.9;

        &:before
        {
            content: 'отмена';
        }
    }

    .agree {
        background: #4CAF50;
        opacity: 0.9;

        &:before {
            content: 'продолжить';
        }
    }
</style>