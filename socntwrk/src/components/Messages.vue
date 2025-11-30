<template>
  <DataTable
    :value="messages"
    :lazy="true"
    :loading="messagesStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[10, 20, 30]"
    :totalRecords="messages_total"
    @page="onPageChange"
    responsiveLayout="scroll"
    :first="offset"
  >
    <Column field="id" header="ID" />
    <Column field="messageText" header="Сообщение" />
    <Column field="dateMessage" header="Дата" />
  </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useMessagesStore } from '@/stores/dataStore'
import Button from 'primevue/button'

export default {
  name: 'MEssages',
  components: { DataTable, Column, Button },
  data() {
    return {
      messagesStore: useMessagesStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    messages() {
      return this.messagesStore.messages
    },
    messages_total() {
      return this.messagesStore.messages_total
    },
  },
  mounted() {
    console.log('Messages component MOUNTED!')
    this.messagesStore.get_messages()
    this.messagesStore.get_messages_total()
    console.log('Messages-', this.messages)
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first
      this.perpage = event.rows
      this.messagesStore.get_messages(this.offset / this.perpage, this.perpage)
    },
  },
}
</script>

<style scoped></style>
