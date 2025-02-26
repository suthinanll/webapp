<template>
  <div class="container mt-5">
    <h3>เพิ่มการเช็คชื่อ</h3>

    <!-- ตรวจสอบสถานะการโหลด -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="classroom">
      <div class="card mb-4 shadow-sm">
        <img :src="classroom.photo || 'https://via.placeholder.com/600x200'" class="card-img-top" alt="Class Image" />
        <div class="card-body">
          <h5 class="card-title">{{ classroom.name }}</h5>
          <p class="card-text"><strong>รหัสวิชา:</strong> {{ classroom.code }}</p>
          <p class="card-text"><strong>ชื่อวิชา:</strong> {{ classroom.name }}</p>

          <!-- ปุ่มต่าง ๆ -->
          <div class="d-flex gap-2 mt-3">
            <button 
              @click="toggleCheckin" 
              class="btn" 
              :class="checkinStatus ? 'btn-success' : 'btn-secondary'">
              {{ checkinStatus ? 'ปิดเช็คชื่อ' : 'เปิดเช็คชื่อ' }}
            </button>
            <button @click="generateQRCode" class="btn btn-primary">แสดง QR Code</button>
            <button @click="goToQnA" class="btn btn-warning">ถาม-ตอบ</button>
            <button @click="goBack" class="btn btn-danger ms-2">ออก</button>
          </div>

          <!-- แสดงรหัสเช็คชื่อ -->
          <div v-if="checkinStatus" class="mt-3">
            <h4>กรอกรหัสเช็คชื่อ</h4>
            <input 
              v-model="newCheckinCode" 
              type="text" 
              class="form-control" 
              placeholder="กรอกรหัสเช็คชื่อ" 
            />
            <button @click="saveCheckinCode" class="btn btn-primary mt-2">บันทึกรหัสเช็คชื่อ</button>
          </div>

          <!-- แสดงรหัสเช็คชื่อของห้อง -->
          <div v-if="checkinCodeSaved" class="mt-3">
            <h4>รหัสเช็คชื่อห้อง:</h4>
            <p>{{ savedCheckinCode }}</p>
          </div>

          <!-- แสดงรายชื่อผู้ที่เช็คชื่อ -->
          <div class="mt-4">
            <h4>รายชื่อผู้ที่เช็คชื่อ</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รหัส</th>
                  <th>ชื่อ</th>
                  <th>หมายเหตุ</th>
                  <th>วันเวลา</th>
                  <th>ลบ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(student, index) in students" :key="student.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ student.studentId }}</td>
                  <td>{{ student.name }}</td>
                  <td>{{ student.note }}</td>
                  <td>{{ student.timestamp }}</td>
                  <td>
                    <button @click="deleteStudent(student.id)" class="btn btn-danger">ลบ</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- ปุ่มบันทึกการเช็คชื่อ -->
          <div class="mt-4">
            <button @click="saveCheckinData" class="btn btn-success">บันทึกการเช็คชื่อ</button>
          </div>

          <!-- แสดงคะแนน -->
          <div class="mt-4">
            <h4>แสดงคะแนน</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>ลำดับ</th>
                  <th>รหัส</th>
                  <th>ชื่อ</th>
                  <th>หมายเหตุ</th>
                  <th>วันเวลา</th>
                  <th>คะแนน</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(score, index) in scores" :key="score.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ score.studentId }}</td>
                  <td>{{ score.name }}</td>
                  <td>
                    <input v-model="score.note" class="form-control" />
                  </td>
                  <td>{{ score.timestamp }}</td>
                  <td>
                    <input v-model="score.grade" type="number" class="form-control" />
                  </td>
                  <td>
                    <select v-model="score.status" class="form-select">
                      <option value="0">รอการเช็คชื่อ</option>
                      <option value="1">เช็คชื่อแล้ว</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <button @click="saveScores" class="btn btn-success">บันทึกข้อมูล</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-danger" v-if="!loading && !classroom">ไม่พบข้อมูลวิชา</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../services/firebase";
import { doc, getDoc, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";

const route = useRoute();
const router = useRouter();
const cid = ref(route.params.cid);
const classroom = ref(null);
const students = ref([]);
const scores = ref([]);
const loading = ref(true);
const qrCodeUrl = ref("");
const checkinStatus = ref(false);
const newCheckinCode = ref("");
const savedCheckinCode = ref("");
const checkinCodeSaved = ref(false);

// ดึงข้อมูลห้องเรียน
watchEffect(async () => {
  if (!cid.value) return;
  loading.value = true;
  try {
    const classRef = doc(db, `classroom/${cid.value}`);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
      classroom.value = classSnap.data();
      fetchStudents();
      fetchScores();
    } else {
      classroom.value = null;
    }
  } catch (error) {
    console.error("Error loading classroom:", error);
  } finally {
    loading.value = false;
  }
});

// ฟังก์ชันดึงรายชื่อนักเรียนที่เช็คชื่อ
const fetchStudents = () => {
  const studentRef = doc(db, `classroom/${cid.value}/checkin/${classroom.value.code}/students`);
  onSnapshot(studentRef, (snapshot) => {
    students.value = snapshot.docs.map(doc => doc.data());
  });
};

// ฟังก์ชันดึงคะแนนจาก Firestore
const fetchScores = () => {
  const scoreRef = doc(db, `classroom/${cid.value}/checkin/${classroom.value.code}/scores`);
  onSnapshot(scoreRef, (snapshot) => {
    scores.value = snapshot.docs.map(doc => doc.data());
  });
};

// ฟังก์ชันเปิด/ปิดการเช็คชื่อ
const toggleCheckin = () => {
  checkinStatus.value = !checkinStatus.value;
};

// ฟังก์ชันบันทึกรหัสเช็คชื่อ
const saveCheckinCode = async () => {
  const checkinCodeRef = doc(db, `classroom/${cid.value}/checkin/${classroom.value.code}`);
  await setDoc(checkinCodeRef, {
    checkinCode: newCheckinCode.value,
  });
  savedCheckinCode.value = newCheckinCode.value;
  checkinCodeSaved.value = true;
};

// ฟังก์ชันบันทึกคะแนน
const saveScores = async () => {
  for (const score of scores.value) {
    const scoreRef = doc(db, `classroom/${cid.value}/checkin/${classroom.value.code}/scores/${score.id}`);
    await setDoc(scoreRef, score);
  }
};

// ฟังก์ชันไปหน้า Q&A
const goToQnA = () => {
  if (cid.value) {
    router.push(`/webapp/qa/${cid.value}`);
  }
};
</script>

<style scoped>
.card {
  max-width: 80%;
  margin: auto;
}
</style>
