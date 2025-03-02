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
            <tr v-for="(answer, index) in answers" :key="answer.id" class="hover:bg-gray-100">
              <td class="border border-gray-300 px-4 py-2 text-center">{{ index + 1 }}</td>
              <td class="border border-gray-300 px-4 py-2 text-center">{{ answer.stdid }}</td>
              <td class="border border-gray-300 px-4 py-2">{{ answer.text }}</td>
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
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  getDoc
} from "firebase/firestore";

const route = useRoute();
const router = useRouter();

const cid = ref(route.params.cid || null);
const cno = ref(route.params.cno || null);
const loading = ref(true);
const classroom = ref({});
const qno = ref(null); // ✅ เพิ่มตัวแปร qno
const questionText = ref("");
const questions = ref([]);
const answers = ref([]);
const showAddQuestionForm = ref(false);

// ✅ ฟังก์ชันดึง `cno` ล่าสุด
const getLastCno = async () => {
  if (!cid.value) return null;

  try {
    const checkinRef = collection(db, `classroom/${cid.value}/checkin`);
    const snapshot = await getDocs(checkinRef);

    if (!snapshot.empty) {
      const latestCno = Math.max(...snapshot.docs.map((doc) => Number(doc.id))).toString();
      console.log("📌 cno ล่าสุด:", latestCno);
      return latestCno;
    }
  } catch (error) {
    console.error("❌ ดึง cno ไม่สำเร็จ:", error);
  }
  return null;
};

const fetchQuestionNo = async () => {
  if (!cid.value || !cno.value) return;

  try {
    const questionDoc = doc(db, `classroom/${cid.value}/checkin/${cno.value}`); // ✅ สร้าง DocumentReference
    const questionSnap = await getDoc(questionDoc); // ✅ ใช้ getDoc() แทน getDocs()

    if (questionSnap.exists()) {
      const questionData = questionSnap.data();
      qno.value = questionData.question_no || "1"; // ✅ ใช้ค่าเริ่มต้นเป็น "1" ถ้าไม่มี
      console.log("📌 ดึง question_no สำเร็จ:", qno.value);
    } else {
      console.warn("❌ ไม่มีข้อมูล question_no ใน Firestore");
    }
  } catch (error) {
    console.error("❌ ดึง question_no ไม่สำเร็จ:", error);
  }
};

// ✅ โหลดข้อมูลเริ่มต้น
onMounted(async () => {
  if (!cno.value) {
    cno.value = await getLastCno();
  }
  
  if (!cid.value || !cno.value) {
    console.error("❌ ข้อมูล cid หรือ cno ไม่สมบูรณ์");
    return;
  }

  // ดึง question_no ก่อน
  await fetchQuestionNo();

  // ✅ โหลดคำถามจาก Firestore
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

  // ✅ โหลดคำตอบที่ถูกตอบแล้ว
  loadAnswers();

  loading.value = false;
});

// ✅ โหลดคำตอบจาก Firestore
const loadAnswers = async () => {
  if (!cid.value || !cno.value || !qno.value) {
    console.warn("⚠️ ขาดค่า cid, cno หรือ qno");
    return;
  }

  const studentsCollection = collection(
    db,
    `classroom/${cid.value}/checkin/${cno.value}/answers/${qno.value}/students`
  );

  onSnapshot(studentsCollection, (snapshot) => {
    if (snapshot.empty) {
      console.warn("❌ ไม่มีข้อมูลใน students");
    } else {
      answers.value = snapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("📌 ข้อมูลเอกสาร Firestore:", data);

        return {
          id: doc.id,
          text: data.text || "ไม่มีข้อมูล",
          stdid: data.stdid,
        };
      });

      console.log("✅ ข้อมูลคำตอบที่โหลดมา:", answers.value);
    }
  });
};

// ✅ ใช้ watchEffect() เพื่อโหลดคำตอบเมื่อ qno เปลี่ยนแปลง
watchEffect(() => {
  if (qno.value) {
    console.log("📌 เรียก loadAnswers() เมื่อ qno เปลี่ยน:", qno.value);
    loadAnswers();
  }
});

// ✅ ฟังก์ชันเพิ่มคำถามใหม่
const addNewQuestion = async () => {
  if (!cid.value || !cno.value || !questionText.value) return;

  try {
    const checkinRef = doc(db, `classroom/${cid.value}/checkin/${cno.value}`);
    await updateDoc(checkinRef, {
      question_no: qno.value,
      question_text: questionText.value,
      question_show: true,
      timestamp: new Date(),
    });

    questionText.value = "";
    showAddQuestionForm.value = false;
  } catch (error) {
    console.error("❌ เพิ่มคำถามไม่สำเร็จ:", error);
  }
};

// ✅ ฟังก์ชันเปิด/ปิดฟอร์มเพิ่มคำถาม
const toggleAddQuestionForm = () => {
  showAddQuestionForm.value = !showAddQuestionForm.value;
};

// ✅ ฟังก์ชันปิดคำถาม
const closeQuestion = async () => {
  if (!cid.value || !cno.value) return;
  try {
    const checkinRef = doc(db, `classroom/${cid.value}/checkin/${cno.value}`);
    await updateDoc(checkinRef, { question_show: false });
  } catch (error) {
    console.error("❌ ปิดคำถามไม่สำเร็จ:", error);
  }
};

// ✅ ฟังก์ชันนำทางไปหน้าต่าง ๆ
const home = () => router.push("/webapp/home");
const addSubject = () => router.push("/webapp/addclass");
const editProfile = () => router.push("/webapp/edit-profile");
const goToClassroom = (cid) => router.push(`/webapp/mclass/${cid}`);


</script>
<style scoped src="../assets/qa.css"></style>