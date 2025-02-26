<template>
  <div class="container mt-5">
    <div v-if="user" class="card shadow-sm mb-4 p-3 d-flex flex-row align-items-center">
      <img :src="user.photoURL" alt="User Avatar" class="rounded-circle me-3" width="60" height="60" />
      <div>
        <h5 class="card-title mb-1">{{ user.displayName }}</h5>
        <p class="text-muted mb-0">{{ user.email }}</p>
      </div>
    </div>

    <!-- ปุ่มต่างๆ -->
    <div class="d-grid gap-2 d-md-flex mb-4">
      <button @click="addSubject" class="btn btn-success">เพิ่มวิชา</button>
      <button @click="editProfile" class="btn btn-primary">แก้ไขข้อมูลส่วนตัว</button>
      <button @click="logout" class="btn btn-danger">ออกจากระบบ</button>
    </div>

    <!-- ✅ แสดงรายชื่อวิชา -->
    <h4 class="mb-3">รายชื่อวิชาของคุณ</h4>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="classrooms.length > 0">
      <div class="row">
        <div v-for="classroom in classrooms" :key="classroom.id" class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <img :src="classroom.photo || 'https://via.placeholder.com/150'" class="card-img-top" alt="Class Image" />
            <div class="card-body">
              <h5 class="card-title">{{ classroom.name }}</h5>
              <p class="card-text"><strong>รหัสวิชา:</strong> {{ classroom.code }}</p>
              <p class="card-text"><strong>ห้องเรียน:</strong> {{ classroom.room }}</p>
              <!-- ปุ่มจัดการห้องเรียน -->
              <button @click="goToClassroom(classroom.id)" class="btn btn-primary w-100 mt-2">จัดการห้องเรียน</button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-else class="alert alert-warning">ยังไม่มีรายวิชา</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const router = useRouter();
const user = ref(null);
const classrooms = ref([]);
const loading = ref(true);

// โหลดข้อมูลผู้ใช้จาก LocalStorage
onMounted(async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
    await loadUserClassrooms();
  } else {
    router.push("/webapp/");
  }
});

// ✅ โหลดรายวิชาของผู้ใช้
const loadUserClassrooms = async () => {
  if (!user.value) return;

  try {
    classrooms.value = [];
    loading.value = true;

    // ดึงข้อมูลจาก `/users/{uid}/classroom`
    const userClassroomsRef = collection(db, `users/${user.value.uid}/classroom`);
    const userClassroomsSnap = await getDocs(userClassroomsRef);

    const fetchClassroomPromises = userClassroomsSnap.docs.map(async (docSnap) => {
      const cid = docSnap.id;
      const classRef = doc(db, `classroom/${cid}`);
      const classSnap = await getDoc(classRef);

      if (classSnap.exists()) {
        return { id: cid, ...classSnap.data() };
      }
      return null;
    });

    // รอโหลดข้อมูลทั้งหมด
    const classData = await Promise.all(fetchClassroomPromises);
    classrooms.value = classData.filter((c) => c !== null);
  } catch (error) {
    console.error("Error loading classrooms:", error);
  } finally {
    loading.value = false;
  }
};

// ไปหน้าเพิ่มวิชา
const addSubject = () => {
  router.push("/webapp/addclass");
};

// ไปหน้าแก้ไขข้อมูล
const editProfile = () => {
  router.push("/webapp/edit-profile");
};


const goToClassroom = (cid) => {
  router.push(`/webapp/mclass/${cid}`); // ไปยังหน้าจัดการห้องเรียน
};


// ออกจากระบบ
const logout = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem("user");
    router.push("/webapp/");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
}

img {
  border: 2px solid #ddd;
}
</style>
