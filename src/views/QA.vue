<template>


  <head>
    <!-- ไอค่อน -->
    <link rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
  </head>

  <nav class="navbar navbar-light">
    <a class="navbar-brand" href="#">RoomClass</a>
    <button class="menu-toggler">
      <span class="material-symbols-rounded">menu</span>
    </button>
  </nav>

  <!-- sidebar-->

  <aside class="sidebar">
    <nav class="sidebar-nav">
      <ul class="nav-list primary-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="nav-icon material-symbols-rounded">home</span>
            <span @click="home">หน้าหลัก</span>

          </a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="nav-icon material-symbols-rounded">add</span>
            <!-- <span class="nav-label">เพิ่มห้องเรียน</span> -->
            <span @click="addSubject">เพิ่มวิชา</span>

          </a>
        </li>


        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="nav-icon material-symbols-rounded">person</span>
            <span @click="editProfile">แก้ไขข้อมูลส่วนตัว</span>

          </a>
        </li>
      </ul>
      <ul class="nav-list secondary-nav">
        <li class="nav-item">
          <a href="#" class="nav-link">
            <span class="nav-icon material-symbols-rounded">logout</span>
            <span @click="logout">ออกจากระบบ</span>

          </a>
        </li>

      </ul>
    </nav>
  </aside>
  <div class="content">
    <div class="container mt-5">
      <div class="header">
        <h5 class="card-title">{{ classroom.name }}</h5>
        <p class="card-text"><strong>รหัสวิชา:</strong> {{ classroom.code }}</p>
      </div>



      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <!-- ปุ่มเพิ่มคำถาม -->
        <div class="d-flex justify-content-start mb-3">
          <button @click="toggleAddQuestionForm" class="btn btn-primary">เพิ่มคำถาม</button>
        </div>

        <!-- ฟอร์มเพิ่มคำถามใหม่  -->
        <div v-if="showAddQuestionForm" class="mb-4">
          <div class="mb-4">
            <label for="questionNo" class="form-label">ข้อที่</label>
            <input v-model="questionNo" type="number" class="form-control" id="questionNo" placeholder="กรอกข้อที่">
          </div>
          <div class="mb-4">
            <label for="questionText" class="form-label">ข้อความคำถาม</label>
            <input v-model="questionText" type="text" class="form-control" id="questionText"
              placeholder="กรอกข้อความคำถาม">
          </div>
          <button @click="addNewQuestion" class="btn btn-success">เพิ่มคำถาม</button>
        </div>

        <!-- การแสดงคำถามที่มีสถานะเปิด -->
        <div v-if="questions.length" class="mt-4">
          <h4>คำถามทั้งหมด</h4>
          <ul class="list-group">
            <li v-for="(question, index) in questions" :key="index" class="list-group-item">
              <strong>ข้อที่: {{ question.question_no }}</strong> - {{ question.question_text }}
              <span v-if="question.question_show">[เปิด]</span>
              <span v-else>[ปิด]</span>
            </li>
          </ul>
        </div>

        <!-- ปุ่มเริ่มถาม/ปิดคำถาม -->
        <div class="d-flex gap-2 mt-4">
          <button @click="startQuestion" class="btn btn-success">เริ่มถาม</button>
          <button @click="closeQuestion" class="btn btn-danger">ปิดคำถาม</button>
        </div>

        <table class="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr class="bg-gray-200">
              <th class="border border-gray-300 px-4 py-2">ลำดับ</th>
              <th class="border border-gray-300 px-4 py-2">รหัสประจำตัว</th>
              <th class="border border-gray-300 px-4 py-2">คำตอบ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(answer, index) in answers" :key="index" class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2 text-center">{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ answer.student_id }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ answer.answer_text }}</td>
            </tr>
          </tbody>
        </table>


      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../services/firebase";
import {
  writeBatch,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  getDocs
} from "firebase/firestore";

const route = useRoute();
const router = useRouter();

const cid = ref(route.params.cid || null);  // ตรวจสอบว่ามีค่า cid หรือไม่
const cno = ref(route.params.cno || null);  // ตรวจสอบว่า cno ถูกกำหนดมาหรือไม่
const loading = ref(true);
const classroom = ref({});
const questionNo = ref(null);
const questionText = ref("");
const questions = ref([]);  // เก็บคำถามทั้งหมด
const answers = ref([]);
const showAddQuestionForm = ref(false);  // ใช้สำหรับควบคุมการแสดงฟอร์มคำถามใหม่

// ฟังก์ชันดึง cno ล่าสุด
const getLastCno = async () => {
  if (!cid.value) {
    console.warn("ยังไม่มีข้อมูลรหัสวิชา");
    return null;
  }

  try {
    const checkinRef = collection(db, `classroom/${cid.value}/checkin`);
    const snapshot = await getDocs(checkinRef);

    if (!snapshot.empty) {
      const latestCno = Math.max(...snapshot.docs.map((doc) => Number(doc.id))).toString();
      console.log("cno ล่าสุด:", latestCno);
      return latestCno;
    } else {
      console.warn("ไม่มีข้อมูลการเช็คชื่อ");
      return null;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล checkin:", error);
    return null;
  }
};

// โหลดข้อมูลห้องเรียนจาก Firebase
onMounted(async () => {
  if (!cno.value) {
    cno.value = await getLastCno(); // ถ้าไม่มี cno ให้ดึง cno ล่าสุดมาใช้
  }

  if (!cid.value || !cno.value) {
    console.error("ข้อมูล cid หรือ cno ไม่สมบูรณ์");
    return;
  }

  // โหลดข้อมูลห้องเรียน
  const checkinRef = doc(db, `classroom/${cid.value}/checkin/${cno.value}`);
  onSnapshot(checkinRef, (docSnapshot) => {
    const data = docSnapshot.data();
    if (data) {
      questions.value = [{
        question_no: data.question_no,
        question_text: data.question_text,
        question_show: data.question_show
      }];
    }
  });

  // โหลดคำถามจาก Firebase
  const questionsRef = collection(db, `classroom/${cid.value}/checkin/${cno.value}/questions`);
  onSnapshot(questionsRef, (snapshot) => {
    questions.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  });

  // โหลดคำตอบที่ถูกตอบแล้ว
  const answersRef = collection(db, `classroom/${cid.value}/checkin/${cno.value}/answers`);
  const q = query(answersRef, where("answered", "==", true));
  onSnapshot(q, (snapshot) => {
    answers.value = snapshot.docs.map(doc => doc.data());
  });

  loading.value = false;
});

// ฟังก์ชันเริ่มคำถาม
const startQuestion = async () => {
  if (!cid.value || !cno.value) return;
  try {
    const checkinRef = doc(db, `classroom/${cid.value}/checkin/${cno.value}`);
    await updateDoc(checkinRef, { question_show: true });
  } catch (error) {
    console.error("Error starting question: ", error);
  }
};

// ฟังก์ชันปิดคำถาม
const closeQuestion = async () => {
  if (!cid.value || !cno.value) return;
  try {
    const checkinRef = doc(db, `classroom/${cid.value}/checkin/${cno.value}`);
    await updateDoc(checkinRef, { question_show: false });
  } catch (error) {
    console.error("Error closing question: ", error);
  }
};



// ฟังก์ชันเพิ่มคำถามใหม่
const addNewQuestion = async () => {
  if (!cid.value || !cno.value) return;
  if (questionNo.value && questionText.value) {
    try {
      const checkinRef = doc(db, `classroom/${cid.value}/checkin/${cno.value}`);
      await updateDoc(checkinRef, {
        question_no: questionNo.value,
        question_text: questionText.value,
        question_show: true,
        timestamp: new Date(),
      });

      // ล้างค่า input หลังเพิ่มสำเร็จ
      questionNo.value = null;
      questionText.value = "";
      showAddQuestionForm.value = false;  // ปิดฟอร์ม
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  }
};

// ฟังก์ชันเปิด/ปิดฟอร์มเพิ่มคำถาม
const toggleAddQuestionForm = () => {
  showAddQuestionForm.value = !showAddQuestionForm.value;
};









const home = () => {
  router.push("/webapp/home");
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
    router.push("/login");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};


</script>
<style scoped src="../assets/qa.css"></style>