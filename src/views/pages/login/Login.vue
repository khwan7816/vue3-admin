<template>
  <div id="wrapper" class="layout-wrapper">
    <div class="page login">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="" loading="lazy" />
      </div>

      <div class="form">
        <form>
          <fieldset>
            <div class="input input-id">
              <InputText type="text" v-model="id" placeholder="ID" />
            </div>
            <div class="input input-passowrd">
              <Password
                v-model="password"
                toggleMask
                placeholder="Password"
                @keyup.enter="onSubmit"
              />
            </div>

            <div class="actions">
              <Button label="로그인" @click="onSubmit" />
            </div>

            <div class="sub-actions">
              <Checkbox id="checked" v-model="checked" :binary="true" />
              <label for="checked">아이디 저장하기</label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "admin",
      password: "q1w2e3r4",
      checked: false,
    };
  },
  methods: {
    onSubmit() {
      if (this.$data.id === "admin" && this.password === "q1w2e3r4") {
        this.$router.replace({
          name: "Main",
        });
      }
    },
  },
};
</script>

<style></style>
