<template>
    <div class="container mt-5">
      <h3>หน้าจอถาม-ตอบ</h3>
      
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <div v-else>
        <!-- ฟอร์มตั้งคำถาม -->
        <div class="mb-4">
          <label for="questionNo" class="form-label">ข้อที่</label>
          <input v-model="questionNo" type="number" class="form-control" id="questionNo" placeholder="กรอกข้อที่">
        </div>
        <div class="mb-4">
          <label for="questionText" class="form-label">ข้อความคำถาม</label>
          <input v-model="questionText" type="text" class="form-control" id="questionText" placeholder="กรอกข้อความคำถาม">
        </div>
  
        <!-- ปุ่มเริ่มถาม/ปิดคำถาม -->
        <div class="d-flex gap-2">
          <button @click="startQuestion" class="btn btn-success">เริ่มถาม</button>
          <button @click="closeQuestion" class="btn btn-danger">ปิดคำถาม</button>
        </div>
  
        <!-- การแสดงคำถาม -->
        <div v-if="questionShow" class="mt-4">
          <h4>คำถามที่: {{ questionNo }}</h4>
          <p>{{ questionText }}</p>
        </div>
  
        <!-- การแสดงคำตอบแบบ Realtime -->
        <div v-if="answers.length" class="mt-4">
          <h5>คำตอบ</h5>
          <ul class="list-group">
            <li v-for="(answer, index) in answers" :key="index" class="list-group-item">
              <strong>{{ answer.studentId }}</strong>: {{ answer.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { db } from "../services/firebase";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const route = useRoute();
const cid = route.params.cid;
const cno = route.params.cno;
const loading = ref(true);
const questionNo = ref(null);
const questionText = ref("");
const questionShow = ref(false);
const answers = ref([]);

// โหลดข้อมูลคำถามและคำตอบจาก Firebase
onMounted(() => {
  // ติดตามคำถามจาก Firebase
  const questionRef = doc(db, `classroom/${cid}/checkin/${cno}`);
  
  // ติดตามสถานะการแสดงคำถามและข้อมูลคำถาม
  onSnapshot(questionRef, (docSnapshot) => {
    const data = docSnapshot.data();
    if (data) {
      questionNo.value = data.question_no;
      questionText.value = data.question_text;
      questionShow.value = data.question_show;
    }
  });

  // ติดตามคำตอบจาก Firebase
  const answersRef = doc(db, `classroom/${cid}/checkin/${cno}/answers`);
  onSnapshot(answersRef, (snapshot) => {
    answers.value = snapshot.docs.map(doc => doc.data());
  });

  loading.value = false;
});

// เริ่มคำถาม
const startQuestion = async () => {
  if (questionNo.value && questionText.value) {
    const questionRef = doc(db, `classroom/${cid}/checkin/${cno}`);
    await setDoc(questionRef, {
      question_no: questionNo.value,
      question_text: questionText.value,
      question_show: true
    }, { merge: true });
  }
};

// ปิดคำถาม
const closeQuestion = async () => {
  const questionRef = doc(db, `classroom/${cid}/checkin/${cno}`);
  await updateDoc(questionRef, {
    question_show: false
  });
};

// ฟังก์ชันไปหน้าถัดไป (QnA)
const goToQnA = () => {
  // ทำการเปลี่ยนเส้นทางไปยังหน้าถามตอบ
};
</script>

<style scoped>
  .list-group-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
