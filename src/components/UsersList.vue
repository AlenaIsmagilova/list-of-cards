<template>
  <section class="section">
    <header class="header">
      <button type="button" class="exit-button" @click.prevent="exitClick">
        Выход
      </button>
      <div class="desc-container">
        <h1 class="title">Наша команда</h1>
        <h5 class="desc">
          Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые
          ложатся на их плечи, и умеющие находить выход из любых, даже самых
          сложных ситуаций.
        </h5>
      </div>
    </header>
    <ul class="cards">
      <li v-for="user in $store.state.users" class="card-item">
        <img :src="user.avatar" class="avatar" />
        <p>{{ `${user.first_name} ${user.last_name}` }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getUsers");
  },
  methods: {
    exitClick() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.title {
  font-size: 64px;
  font-weight: 400;
  line-height: 75px;
  margin-bottom: 16px;
}

.desc {
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  text-align: center;
}
.exit-button {
  width: 81px;
  height: 38px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  background-color: transparent;
  color: #ffffff;
  margin: 32px 80px 0 0;
  align-self: flex-end;
}
.desc-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 846px;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 265px;
  background-color: #512689;
  color: white;
  margin-bottom: 48px;
}
.section {
  width: 100%;
}
.card-item {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 305px;
  min-height: 263px;
  margin: 0 20px 20px 0;
  border: 1px solid rgba(51, 51, 51, 0.15);
  border-radius: 10px;
}

.cards {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.avatar {
  width: 124px;
  height: 124px;
  border-radius: 50%;
  margin-bottom: 16px;
}
</style>
