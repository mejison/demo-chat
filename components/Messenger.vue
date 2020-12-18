<template>
    <div class="messanger">
        <users :items="users" />
        <messages :items="messages" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class Messanger extends Vue {
    name = 'Messanger'

    users = [
        {
            name: 'Alex Kovalchuk',
            avatar: '//placehold.it/100x100?text=AK'
        },
        {
            name: 'Jura Siroduk',
            avatar: '//placehod.it/100x100?text=JS'
        }
    ]

    messages = []
}
</script>

<style lang="scss">
    .messanger {
        display: flex;
        justify-content: space-between;
        min-width: 800px;
        margin: 0 auto;
        
        .users {
            
        }
    }
</style>