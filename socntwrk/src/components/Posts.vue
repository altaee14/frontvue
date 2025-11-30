<template>
  <div class="max-w-7xl mx-auto px-4">
    <DataTable
        :value="posts"
        :lazy="true"
        :loading="postsStore.loading"
        :paginator="true"
        :rows="perpage"
        :rowsPerPageOptions="[10, 20, 30]"
        :totalRecords="posts_total"
        @page="onPageChange"
        responsiveLayout="scroll"
        :first="offset"
        class="w-full"
    >
        <Column field="id" header="ID" style="min-width: 80px"/>
        <Column field="text" header="Text" style="min-width: 200px; max-width: 400px"/>
        <Column header="Image" style="min-width: 100px; max-width: 150px">
            <template #body="slotProps">
                <img
                    v-if="slotProps.data.post_img"
                    :src="slotProps.data.post_img"
                    alt="Post image"
                    class="w-full max-w-46 h-auto max-h-46 object-cover rounded"
                />
                <span v-else class="text-gray-400">No image</span>
            </template>
        </Column>
        <Column field="likes" header="Likes" style="min-width: 100px"/>

        <template #footer>
            <div class="text-end">
            <Button
                type="button"
                @click="this.$router.push('/createPost')"
                icon="pi pi-plus"
                label="Добавить сообщение"
            />
            </div>
        </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useMessagesStore } from '@/stores/dataStore';
import Button from 'primevue/button'

export default {
  name: "Posts",
  components: { DataTable, Column, Button },
  data() {
      return {
          postsStore: useMessagesStore(),
          perpage: 5,
          offset: 0,
          imageLoaded: false,
          imageError: false
      }
  },
  computed: {
      posts() {
          return this.postsStore.posts || [];
      },
      posts_total() {
          return this.postsStore.posts_total || 0;
      }
  },
  async mounted() {
      console.log('Posts component MOUNTED!');
      await this.postsStore.get_posts(0, this.perpage);
      await this.postsStore.get_posts_total();
      console.log('Posts data:', this.posts);
  },
  methods: {
      async onPageChange(event) {
          this.offset = event.first;
          this.perpage = event.rows;
          const page = Math.floor(this.offset / this.perpage);
          await this.postsStore.get_posts(page, this.perpage);
      },

  }
}
</script>