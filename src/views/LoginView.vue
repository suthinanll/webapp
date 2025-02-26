<template>
  <div class="login-container">
    <h2>เข้าสู่ระบบด้วย Google</h2>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth, provider, signInWithPopup } from "../services/firebase";

export default {
  setup() {
    const router = useRouter();
    const user = ref(null);

    const loginWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        user.value = result.user;
        console.log("✅ Login Success:", user.value);
        localStorage.setItem("user", JSON.stringify(user.value)); // 👉 เก็บข้อมูลไว้
        router.push("/webapp/home"); // ไปหน้า Home หลัง Login สำเร็จ
      } catch (error) {
        console.error("❌ Login Error:", error);
      }
    };

    return { loginWithGoogle };
  },
};
</script>

<style scoped>
.login-container {
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #357ae8;
}
</style>
