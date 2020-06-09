<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
        <div class="position-relative image-side flex">
          <b-row>
            <div class="">
              <p class="align-image-text text-white h2">{{ $t('pages.magic-is-in-the-details') }}</p>
            </div>
          </b-row>
        </div>
        <div class="form-side">
          <router-link tag="a" to="/">
            <div class='logo-main'>
              <span class="logo-single" />
            </div>
          </router-link>
          <h6 class="mb-4">{{ $t('user.register')}}</h6>
          <b-form @submit.prevent="formSubmit">
            <label class="form-group has-float-label mb-4">
              <input type="text" class="form-control" v-model="fullname">
              <span>{{ $t('user.fullname') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="email" class="form-control" v-model="email">
              <span>{{ $t('user.email') }}</span>
            </label>
            <label class="form-group has-float-label mb-4">
              <input type="password" class="form-control" v-model="password">
              <span>{{ $t('user.password') }}</span>
            </label>
            <div class="d-flex align-items-center">
              <b-button type="submit" variant="primary" size="lg" class="btn-shadow btn-margin">{{ $t('user.register-button')}}</b-button>
            </div>
            <div class="login d-flex justify-content-center align-items-center">
              <div class="login-inner">
                <router-link tag="a" to="/user/login">{{ $t('user.login-here')}}</router-link>
              </div>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import {
  mapActions
} from "vuex";
export default {
  data () {
    return {
      fullname: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(["register"]),
    formSubmit () {
      this.register({
        fullName: this.fullname,
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    margin-top: 2rem;

    &-inner {
      font-size: 1rem;
    }
  }
  .logo-main{
    text-align: center;
  }
  .align-image-text{
    text-align: center;
  }
  @media only screen and (max-device-width: 769px) {
    .align-image-text {
      text-align: initial;
      width: 50%;
      word-wrap: break-word;
      font-size: 18px !important;
    }
    .btn-margin {
      margin: 0 auto;
    }
  }
</style>
