<template>
  <button @click="showModal = true">Пройти регистрацию</button>
  <article class="modal-wrap" v-if="showModal === true">
    <div class="modal-container">
      <button class="icon-close" @click="showModal = false"></button>
      <form class="form">
        <h2 class="modal-header">Регистрация</h2>
        <label class="label" for="name">Имя:</label>
        <input class="input" id="name" type="text" v-model="username" />
        <p v-if="!name && submitted">Имя должно содержать латинские буквы</p>
        <label class="label" for="email">Электронная почта:</label>
        <input class="input" id="email" v-model="form.email" />
        <p v-if="!email && submitted">Введите корректный электронный адрес</p>
        <label class="label" for="password">Пароль:</label>
        <input
          class="input"
          type="password"
          id="password"
          v-model="form.password"
        />
        <p v-if="!password && submitted">Введите пароль</p>
        <label class="label" for="repeat-password">Подтвердите пароль:</label>
        <input
          class="input"
          type="password"
          id="repeat-password"
          v-model="repeatPassword"
        />
        <p v-if="(!repeatPassword && submitted) || noMatchesError">
          {{ noMatchesError }}
        </p>
        <button class="submit" type="submit" @click.prevent="handleSubmit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  </article>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      showModal: false,
      form: {
        email: null,
        password: null,
      },
      username: null,
      repeatPassword: null,
      submitted: false,
      noMatchesError: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.replace("/profile");
    }
  },
  methods: {
    checkForm() {
      if (
        this.username &&
        this.form.email &&
        this.form.password === this.repeatPassword
      ) {
        this.showModal = false;
        this.noMatchesError = "";
        return true;
      }

      if (this.form.password !== this.repeatPassword) {
        this.noMatchesError = "Пароли не совпадают";
      }
    },
    async handleSubmit() {
      this.submitted = true;
      this.checkForm();
      await this.$store.dispatch("signUp", this.form);
      await this.$store.dispatch(
        "getCurrentUser",
        localStorage.getItem("user")
      );
      console.log(this.$router);
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.modal-wrap {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
.form {
  display: flex;
  flex-direction: column;
}
.label {
  display: flex;
  flex-direction: column;
  margin: 12px 0 0;
}

.input {
  padding: 5px 15px;
  outline: none;
}
.modal-container {
  width: 500px;
  min-height: 575px;
  padding: 30px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border-radius: 14px;
  cursor: pointer;
}
.icon-close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: -25px;
  top: -25px;
}
.icon-close::after {
  width: 100%;
  display: inline-block;
  content: "";
  border: 1px solid white;
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  left: 0;
}
.icon-close::before {
  width: 100%;
  display: inline-block;
  content: "";
  border: 1px solid white;
  transform: rotate(-45deg);
  position: absolute;
  top: 50%;
  left: 0;
}

.submit {
  background-color: #512689;
  color: white;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 24px;
}
</style>
