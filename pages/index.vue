<template>
    <div>
       <!-- <nuxt-content :document="page" /> -->
       <ul class="pages">
        <li class="chat page">
            <div class="chatArea">
            <ul ref="messages" class="messages">
                <li v-for="(msg, index) in messages" :key="index" class="message">
                <i :title="msg.date">
                    {{ msg.date.split('T')[1].slice(0, -2) }}
                </i>: {{ msg.text }}
                </li>
            </ul>
            </div>
            <input v-model="message" class="inputMessage" type="text" placeholder="Type here..." @keyup.enter="sendMessage">
        </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import socket from '~/plugins/socket.io.js'

@Component({})
export default class Index extends Vue {
    message = ''
    messages = []

    head() {
        return {
            title: 'test',
        }
    }

    watch: {
        messages: 'scrollToBottom'
    }

    beforeMount () {
        socket.on('new-message', (message) => {
           this.messages.push(message)
        })
    }

    mounted () {
        this.scrollToBottom()
    }

    sendMessage () {
            if (!this.message.trim()) { return }
            const message = {
                date: new Date().toJSON(),
                text: this.message.trim()
            }
            this.messages.push(message)
            this.message = ''
            socket.emit('send-message', message)
    }
    
    scrollToBottom () {
        this.$nextTick(() => {
            this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
        })
    }

    async asyncData({ $content, params }) {
        const page = await $content('index').fetch();

        const messages = socket.emit('last-messages', messages => { messages })

        return {
            page
        }
    }
}
</script>

<style lang="scss">
</style>