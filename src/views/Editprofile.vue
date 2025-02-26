<template>
    <div class="container mt-5">
      <h2>แก้ไขข้อมูลส่วนตัว</h2>
      <div class="card p-3">
        <div class="mb-3 text-center">
          <img :src="form.photoURL" alt="User Avatar" class="rounded-circle" width="100" height="100" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">ชื่อ</label>
          <input v-model="form.displayName" type="text" class="form-control" />
        </div>
  
        <div class="mb-3">
          <label class="form-label">อีเมล</label>
          <input v-model="form.email" type="email" class="form-control" disabled />
        </div>
  
        <div class="mb-3">
          <label class="form-label">รูปโปรไฟล์ (URL)</label>
          <input v-model="form.photoURL" type="text" class="form-control" />
        </div>
  
        <button @click="saveProfile" class="btn btn-primary">บันทึก</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const form = ref({
    displayName: "",
    email: "",
    photoURL: "",
  });
  
  // โหลดข้อมูลจาก LocalStorage
  onMounted(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      form.value.displayName = userData.displayName;
      form.value.email = userData.email;
      form.value.photoURL = userData.photoURL;
    } else {
      router.push("/webapp/");
    }
  });
  
  // บันทึกข้อมูลและกลับไป Home
  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(form.value)); // อัปเดตข้อมูล
    router.push("/webapp/home"); // กลับหน้า Home
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 500px;
    margin: auto;
  }
  </style>
  