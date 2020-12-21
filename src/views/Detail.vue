<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{'Menu_History' | localize}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="
            record.type === 'outcome' ? 'red' : 'green'
            ">
            <div class="card-content white-text">
              <p>{{'Detail_description' | localize}}: {{ record.description }}</p>
              <p>{{'Detail_amount' | localize}}: {{ record.amount }}</p>
              <p>{{'Detail_category' | localize}}: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{'DetailNotFaondMessage1' | localize}}={{$route.params.id}} {{'DetailNotFaondMessage2' | localize}}</p>
  </div>
</template>
<script>
export default {
  name: 'Detail',
  metaInfo() {
    return {
      title: this.$title('Detail_Title')
    }
  },
  data: () => ({
    recprd: null,
    loading: true
  }),
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch('fetchedCategoryById', record.categoryId) 

    this.record = {
      ...record,
      categoryName: category.title
    }

    this.loading = false
  }
}
</script>
