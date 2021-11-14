<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    @import "~@fortawesome/fontawesome-free/css/all.css";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    a {
        text-decoration: none;
    }

    input, textarea {
        width: 100%;
        max-width: 500px;
        word-break: break-all;
        padding: 12px 15px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 1px solid #00000099;
        border-radius: 4px;
    }

    [data-tooltip] {
        position: relative;

        &::after
        {
            content: attr(data-tooltip);
            position: absolute;
            left: 0;
            top: 0;
            background: lightgray;
            color: #fff;
            padding: 0.5em;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
            pointer-events: none;
            opacity: 0;
            transition: 1s;
            font-family: Avenir, Helvetica, Arial, sans-serif;
            font-weight: normal;
            font-size: 15px;
        }

        &:hover
        {
            &::after
            {
                top: 2em;
                opacity: 0.9;
            }
        }
    }

    .d-flex {
        display: flex;
    }

    .flex-column {
        flex-direction: column;
    }

    .justify-between {
        justify-content: space-between;
    }

    .justify-end {
        justify-content: end;
    }

    .justify-center {
        justify-content: center;
    }

    .align-center {
        align-items: center;
    }

    .green {
        color: #4CAF50;
    }

    .red {
        color: #f44336;
    }

    .gray {
        color: #0000008a;
    }

    .wrap {
        margin: 0 auto;
        padding: 200px;
    }

    .header {
        h1 {
            margin: 0;
            text-transform: uppercase;
            font-weight: normal;
        }
    }

    .button {
        color: #FFFFFF;
        text-transform: uppercase;
        line-height: 1;
        letter-spacing: 1.5px;
        border-radius: 5px;
        cursor: pointer;
        padding: 10px;
        margin-left: 15px;
        font-size: 11px;

        &:hover {
            opacity: 0.8;
        }

        i {
            font-size: 14px;
            padding-right: 9px;

        }

        &.background-blue {
            background-color: #1976d2;
        }

        &.background-red {
            background-color: #f44336;
        }

        &.background-green {
            background-color: #4CAF50;
        }

        &.background-gray {
            background-color: #0000008a;
        }
    }

    i {
        &.action {
            cursor: pointer;
            font-size: 19px;
            padding-right: 15px;

            &.transform-svg {
                transform: scale(-1, 1);
                padding-left: 15px;
                padding-right: 0;
            }
        }

        &.transform {
            transform: translateY(-4%);
        }
    }

    .content-table {
        table {
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
            border-radius: 4px;
            background-color: #FFFFFF;
            color: black;
            border: none;
            margin-top: 20px;

            th, td {
                border: none;
                border-bottom: thin solid rgba(0, 0, 0, 0.12);
                padding: 15px 0;

                i {
                    &:first-child {
                        padding-right: 15px;
                    }
                }

                ul {
                    padding-left: 10px;
                    max-width: 500px;
                    word-break: break-all;

                    li {
                        text-align: left;
                        color: #1976d2;
                        line-height: 1.7;

                        span {
                            color: black;
                        }
                    }
                }
            }

            th {
                color: #00000099;
            }

            td {
                font-size: 14px;
            }
        }
    }
</style>
