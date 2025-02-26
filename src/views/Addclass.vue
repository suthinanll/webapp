<template>
  <div class="container mt-5">
    <h2 class="text-center">เพิ่มวิชา</h2>
    <div class="card p-4 shadow-lg">
      <div class="mb-3">
        <label class="form-label">รหัสวิชา</label>
        <input v-model="classroom.code" type="text" class="form-control" placeholder="กรอกรหัสวิชา" />
      </div>

      <div class="mb-3">
        <label class="form-label">ชื่อวิชา</label>
        <input v-model="classroom.name" type="text" class="form-control" placeholder="กรอกชื่อวิชา" />
      </div>

      <div class="mb-3">
        <label class="form-label">ห้องเรียน</label>
        <input v-model="classroom.room" type="text" class="form-control" placeholder="กรอกชื่อห้องเรียน" />
      </div>

      <!-- ✅ ช่องกรอก URL รูปภาพ -->
      <div class="mb-3">
        <label class="form-label">ลิงก์รูปภาพ</label>
        <input v-model="classroom.imageUrl" type="text" class="form-control" placeholder="วางลิงก์รูปภาพที่นี่" />
      </div>

      <!-- ✅ แสดงตัวอย่างรูปภาพเมื่อมี URL -->
      <div class="text-center mb-3">
        <img v-if="classroom.imageUrl" :src="classroom.imageUrl" alt="Class Image" class="rounded shadow" width="200" height="150" />
      </div>

      <button @click="saveClassroom" class="btn btn-primary w-100">บันทึก</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 500px;
  margin: auto;
  border-radius: 15px;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../services/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const router = useRouter();
const user = ref(null);

const classroom = ref({
  code: "",
  name: "",
  room: "",
  imageUrl: "",
});

// ตรวจสอบสถานะผู้ใช้ก่อนให้ทำงาน
onMounted(() => {
  auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
    } else {
      router.push("/webapp/"); // ถ้าไม่ได้ล็อกอินให้เด้งไปหน้า login
    }
  });
});

// ✅ บันทึกข้อมูลไปที่ Firestore ตามโครงสร้างที่ถูกต้อง
const saveClassroom = async () => {
  if (!classroom.value.code || !classroom.value.name || !classroom.value.room) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  if (!user.value) {
    alert("กรุณาเข้าสู่ระบบก่อน");
    return;
  }

  try {
    // 🔥 สร้าง Document ใหม่ใน Collection `classroom` และรับ `cid`
    const classRef = doc(collection(db, "classroom"));
    const cid = classRef.id;

    console.log("📝 Creating Classroom with ID:", cid);

    // ✅ บันทึกข้อมูลของห้องเรียนที่ /classroom/{cid}
    const classData = {
      code: classroom.value.code,
      name: classroom.value.name,
      room: classroom.value.room,
      photo: classroom.value.imageUrl || "",
      owner: user.value.uid, // ✅ เก็บ uid เจ้าของใน document หลัก
    };
    await setDoc(classRef, classData);
    console.log("✅ Classroom info saved!");

    // ✅ บันทึกข้อมูลเจ้าของที่ /classroom/{cid}/owner/{user.uid}
    const ownerRef = doc(db, `classroom/${cid}/owner/${user.value.uid}`);
    await setDoc(ownerRef, { uid: user.value.uid });
    console.log("✅ Owner info saved!");

    // ✅ บันทึกข้อมูลใน /users/{uid}/classroom/{cid} พร้อม status = 1
    const userClassRef = doc(db, `users/${user.value.uid}/classroom/${cid}`);
    await setDoc(userClassRef, { status: 1 });
    console.log("✅ User class relation saved!");

    alert("บันทึกข้อมูลสำเร็จ");
    router.push("/webapp/home"); // กลับไปหน้าหลัก
  } catch (error) {
    console.error("🔥 Error Saving Classroom:", error);
    alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }
};
</script>
