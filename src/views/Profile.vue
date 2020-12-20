<template>
  <div>
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="name"
            :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
        >
        <label for="description">{{'Name' | localize}}</label>
        <small 
        class="helper-text invalid"
        v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName' | localize}}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocal">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Update' | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<style scoped>
.switch{
  margin-bottom: 2rem;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    name: '',
    isRuLocal: true
  }),
  validations: {
    name: { required }
  },
  mounted() {
    this.name = this.info.name
    this.isRuLocal = this.info.local === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    })
  },
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.updateInfo({
          name: this.name,
          local: this.isRuLocal ? 'ru-RU' : 'en-US'
        })
      } catch (e) {}
    }
  }
}
</script>