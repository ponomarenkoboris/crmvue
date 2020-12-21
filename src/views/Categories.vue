<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit v-if="categories.length" :categories="categories" @updated="updateCategories" :key="categories.length + updateCount"/>
        <p v-else class="center">{{'Category_emptyMessage' | localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
export default {
  name: 'categories',
  metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchedCategories')
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory(category) {
      console.log(this.categories);
      this.categories.push(category)
    },
    updateCategories(category) {
      const indx = this.categories.findIndex(c => c.id === category.id)
      this.categories[indx].title = category.title
      this.categories[indx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>
