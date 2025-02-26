<template>
  <div class="container mt-5">
    <h3>จัดการห้องเรียน</h3>

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
          <p class="card-text"><strong>ห้องเรียน:</strong> {{ classroom.room }}</p>

          <div class="d-flex align-items-center mb-3">
            <button @click="generateQRCode" class="btn btn-primary">แสดง QR Code </button>
            <div v-if="qrCodeUrl" class="ms-3">
              <img :src="qrCodeUrl" alt="QR Code" />
            </div>
          </div>

          <button @click="handleCheckin" class="btn btn-secondary">แสดงรายชื่อ</button>
          <button @click="goToAddcheckin" class="btn btn-secondary">เพิ่มการเช็คชื่อ</button>
        </div>
      </div>
    </div>

    <div v-if="showStudentList">
      <h4>รายชื่อนักเรียน</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>รหัสนักเรียน</th>
            <th>ชื่อ</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.stdid">
            <td>{{ student.cno }}</td>
            <td>{{ student.stdid }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.status === 1 ? 'ตรวจแล้ว' : 'ยังไม่ตรวจ' }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showCheckinHistory">
      <h4>ประวัติการเช็คชื่อ</h4>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>วัน-เวลา</th>
            <th>จำนวนคนเข้าเรียน</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(checkin, index) in checkinHistory" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ checkin.timestamp }}</td>
            <td>{{ checkin.studentCount }}</td>
            <td>{{ checkin.status }}</td>
            <td>
              <button @click="manageCheckin(checkin)" class="btn btn-info">เช็คเชื่อ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="alert alert-danger" v-if="!loading && !classroom">ไม่พบข้อมูลวิชา</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "../services/firebase";
import { doc, getDoc, collection, setDoc, onSnapshot } from "firebase/firestore";

import QRCode from "qrcode";

const route = useRoute();
const router = useRouter();

const cid = ref(route.params.cid);
const classroom = ref(null);
const loading = ref(true);
const qrCodeUrl = ref("");
const students = ref([]);
const showStudentList = ref(false);
const checkinHistory = ref([]);
const showCheckinHistory = ref(false);

watchEffect(async () => {
  if (!cid.value) return;
  loading.value = true;
  try {
    const classRef = doc(db, `classroom/${cid.value}`);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
      classroom.value = classSnap.data();
    } else {
      classroom.value = null;
    }
  } catch (error) {
    console.error("Error loading classroom:", error);
  } finally {
    loading.value = false;
  }
});

const generateQRCode = async () => {
  try {
    if (!cid.value) return;
    qrCodeUrl.value = await QRCode.toDataURL(cid.value);
  } catch (error) {
    console.error("Error generating QR Code:", error);
  }
};

const handleCheckin = async () => {
  if (!cid.value) return;
  showStudentList.value = !showStudentList.value;

  if (showStudentList.value) {
    students.value = [];

    try {
      const studentRef = collection(db, `classroom/${cid.value}/students`);
      onSnapshot(studentRef, async (snapshot) => {
        students.value = snapshot.docs.map((docSnap, index) => ({
          cno: index + 1,
          stdid: docSnap.data().stdid,
          name: docSnap.data().name,
          status: 0,
        }));

        for (const student of students.value) {
          const checkinRef = doc(db, `classroom/${cid.value}/checkin`, `${student.cno}`);
          await setDoc(checkinRef, {
            stdid: student.stdid,
            name: student.name,
            status: 0,
          });
        }
      });
    } catch (error) {
      console.error("Error loading students or creating checkin data:", error);
    }
  }
};

const loadCheckinHistory = async () => {
  try {
    if (!cid.value) return;
    const checkinRef = collection(db, `classroom/${cid.value}/checkin`);
    onSnapshot(checkinRef, (snapshot) => {
      checkinHistory.value = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          timestamp: new Date(data.timestamp.seconds * 1000).toLocaleString(),
          studentCount: data.studentCount,
          status: data.status === 1 ? 'กำลังเรียน' : 'ยังไม่เริ่ม',
        };
      });
    });
  } catch (error) {
    console.error("Error loading checkin history:", error);
  }
};

const goToAddcheckin = () => {
  if (cid.value) {
    router.push(`/webapp/addcn/${cid.value}`);
  }
};

watchEffect(() => {
  if (cid.value) {
    loadCheckinHistory();
  }
});
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
}
img {
  border-radius: 8px;
}
</style>
