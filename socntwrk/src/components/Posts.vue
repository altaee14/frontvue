<template>
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
    >
        <Column field="id" header="ID"/>
        <Column field="text" header="Text"/>
        <Column field="likes" header="Likes"/> 
    </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useMessagesStore } from '@/stores/dataStore'; 
export default {
    name: "Posts",
    components: { DataTable, Column },
    data() {
        return {
            postsStore: useMessagesStore(), 
            perpage: 5,
            offset: 0,
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
        }
    }
}
</script>