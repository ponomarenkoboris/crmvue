<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{'HomeBookkeeping' | localize}}</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small 
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >{{'EmailFieldWarning' | localize}}</small>
        <small 
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'EmailIsNotCorrect' | localize}}</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">{{'Password' | localize}}</label>
        <small class="helper-text invalid"
        v-if="$v.password.$dirty && !$v.password.required"
        >{{'EntryPassword' | localize}}</small>
        <small class="helper-text invalid"
        v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'PasswordDontCorrect' | localize}} {{$v.password.$params.minLength.min}})</small>
      </div>
    </div>
    <div class="card-action">
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocal">
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <div style="margin-top: 2rem">
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{'Entry' | localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'DontHaveTheAcc' | localize}}
        <router-link to="/register">{{'Registration' | localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utilus/messages.js'

  export default {
    name: 'login',
    metaInfo() {
    return {
      title: this.$title('ProfileTitle')
    }
  },
    data: () => ({
      email: '',
      password: '',
      isRuLocal: true
    }),
    validations: {
      email: {email, required},
      password: {required, minLength: minLength(8)}
    },
    mounted() {
      if (messages[this.$route.query.message]){
        this.$message(messages[this.$route.query.message])
      }
    },
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          email: this.email,
          password: this.password,
          local: this.isRuLocal ? 'ru-RU' : 'en-US'
        }

        try {
          await this.$store.dispatch('login', formData)         
          this.$router.push('/')
        } catch (e) {}
      }
    }
  }
</script>
