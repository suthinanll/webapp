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
          <div class="d-flex align-items-center mb-3">
            <button @click="generateQRCode" class="btn btn-primary">แสดง QR Code </button>
            <div v-if="qrCodeUrl" class="ms-3">
              <img :src="qrCodeUrl" alt="QR Code" />
            </div>
          </div>

          <div class="d-flex gap-2 mt-3">
            <button @click="toggleCheckin" class="btn" :class="checkinStatus ? 'btn-success' : 'btn-secondary'">
              {{ checkinStatus ? 'ปิดเช็คชื่อ' : 'เปิดเช็คชื่อ' }}
            </button>
            <button @click="goToQnA" class="btn btn-warning">ถาม-ตอบ</button>
          </div>

          <!-- ป๊อปอัปกรอกรหัสเช็คชื่อ -->
          <div v-if="showModal" class="modal-backdrop">
            <div class="modal-content">
              <h4>กรอกรหัสเช็คชื่อ</h4>
              <input v-model="newCheckinCode" type="text" class="form-control" placeholder="กรอกรหัสเช็คชื่อ" />
              <button @click="saveCheckinCode" class="btn btn-primary mt-2">บันทึกรหัส</button>
              <button @click="showModal = false" class="btn btn-secondary mt-2">ยกเลิก</button>
            </div>
          </div>

          <!-- แสดงรหัสเช็คชื่อ -->
          <div v-if="checkinCodeSaved" class="mt-3">
            <h4>รหัสเช็คชื่อห้อง:</h4>
            <p>{{ savedCheckinCode }}</p>
          </div>
          <br>

          <button @click="showstudentlist" class="btn btn-primary">แสดงรายชื่อ</button>

          <!-- ตารางรายชื่อนักเรียน -->
          <table v-if="showTable" class="table mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>รหัส</th>
                <th>ชื่อ</th>
                <th>หมายเหตุ</th>
                <th>วันเวลา</th>
                <th>ลบ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(student, index) in studentList" :key="student.id">
                <td>{{ index + 1 }}</td>
                <td>{{ student.stdid }}</td>
                <td>{{ student.name }}</td>
                <td>{{ student.remark || '-' }}</td>
                <td>{{ student.date ? student.date.toDate().toLocaleString() : '-' }}</td>
                <td>
                  <button @click="deleteStudent(student.id)" class="btn btn-danger btn-sm">ลบ</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- ปุ่มบันทึกการเช็คชื่อ -->
          <button v-if="showTable" @click="saveCheckinToScores" class="btn btn-success mt-3">บันทึกการเช็คชื่อ</button>

          <br><br>

          <button @click="showscore" class="btn btn-primary">แสดงคะแนน</button>


          <table v-if="showTable" class="table table-bordered mt-3">
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
              <tr v-for="(score, index) in scoreList" :key="score.id">
                <td>{{ index + 1 }}</td>
                <td>{{ score.stdid }}</td>
                <td>{{ score.name }}</td>
                <td>
                  <input v-model="score.remark" placeholder="เพิ่มหมายเหตุ" class="form-control" />
                </td>
                <td>{{ formatTimestamp(score.date) }}</td>
                <td>
                  <input type="number" v-model="score.score" min="0" max="100" class="form-control" />
                </td>
                <td>
                  <select v-model="score.status" class="form-select">
                    <option value="1"> เช็คชื่อแล้ว</option>
                    <option value="0"> ไม่ได้เช็คชื่อ</option>
                  </select>
                </td>

              </tr>
            </tbody>

          </table>

          <button @click="updateAllScores" class="btn btn-success">บันทึก</button>



        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db, auth } from "../services/firebase";
import {
  doc, getDoc, setDoc, onSnapshot, collection,
  query, orderBy, limit, getDocs, addDoc,deleteDoc
} from "firebase/firestore";

import QRCode from "qrcode";


const route = useRoute();
const router = useRouter();
const cid = ref(route.params.cid);
const classroom = ref(null);
const loading = ref(true);
const checkinStatus = ref(false);
const newCheckinCode = ref("");
const savedCheckinCode = ref("");
const checkinCodeSaved = ref(false);
const showModal = ref(false); // ใช้เปิด/ปิดป๊อปอัป
const cno = ref(""); // ค่า check-in number
const studentList = ref([]); // เก็บข้อมูลรายชื่อนักเรียน
const showTable = ref(false); // ควบคุมการแสดง/ซ่อนตาราง
const scoreList = ref([]);
const qrCodeUrl = ref(""); // ถ้าใช้ Composition API


const generateQRCode = async () => {
  try {
    if (!cid.value) return;
    qrCodeUrl.value = await QRCode.toDataURL(cid.value);
  } catch (error) {
    console.error("Error generating QR Code:", error);
  }
};

const getLastCno = async () => {
  if (!cid.value) {
    alert("ยังไม่มีข้อมูลรหัสวิชา");
    return null;
  }

  try {
    const checkinRef = collection(db, `classroom/${cid.value}/checkin`);
    const snapshot = await getDocs(checkinRef);

    if (!snapshot.empty) {
      // ดึง cno ที่มากที่สุด (เลขล่าสุด)
      const latestCno = Math.max(...snapshot.docs.map((doc) => Number(doc.id))).toString();
      console.log("cno ล่าสุด:", latestCno);
      return latestCno;
    } else {
      alert("ไม่มีข้อมูลการเช็คชื่อ");
      return null;
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูล checkin:", error);
    return null;
  }
};

const showstudentlist = async () => {
  const latestCno = await getLastCno(); // ดึง cno ล่าสุด

  if (!cid.value || !latestCno) {
    alert("ยังไม่มีการเช็คชื่อ");
    return;
  }

  console.log("cid:", cid.value, "cno:", latestCno); // ตรวจสอบค่าที่ได้

  const studentsCollectionRef = collection(db, `classroom/${cid.value}/checkin/${latestCno}/students`);

  onSnapshot(studentsCollectionRef, (snapshot) => {
    studentList.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    showTable.value = true; // แสดงตาราง
  });
};


const updateAllScores = async () => {
  if (!cid.value) return alert("❌ กรุณาระบุรหัสห้อง");

  // ✅ ดึง cno ล่าสุด ถ้ายังไม่มีค่า
  if (!cno.value) {
    cno.value = await getLastCno();
    if (!cno.value) return alert("❌ ไม่พบรหัสเช็คชื่อ");
  }

  try {
    if (!scoreList.value || scoreList.value.length === 0) {
      return alert("❌ ไม่มีข้อมูลที่ต้องอัปเดต");
    }
    for (const student of scoreList.value) {
      if (!student.id) {  // ✅ ใช้ id แทน uid
        console.warn("🚨 ข้ามนักเรียนที่ไม่มี ID:", student);
        continue;
      }
      const scoreDocPath = `classroom/${cid.value}/checkin/${cno.value}/scores/${student.id}`;
      console.log("📌 Updating Path:", scoreDocPath, student);

      const scoreDocRef = doc(db, scoreDocPath);

      await setDoc(
        scoreDocRef,
        {
          remark: student.remark || "",
          score: Number(student.score) || 0,
          status: Number(student.status) || 0,
        },
        { merge: true }
      );
    }


    alert("✅ บันทึกคะแนนสำเร็จ!");
  } catch (error) {
    console.error("❌ Error updating score:", error);
    alert("เกิดข้อผิดพลาดในการบันทึกคะแนน");
  }
};




const saveCheckinToScores = async () => {
  if (!cid.value) return alert("❌ ยังไม่มีข้อมูลห้อง");

  // ✅ ดึง `cno` ล่าสุด
  const latestCno = await getLastCno();
  if (!latestCno) return alert("❌ ยังไม่มีข้อมูลเช็คชื่อ");

  const studentsRef = collection(db, `classroom/${cid.value}/checkin/${latestCno}/students`);
  const scoresRef = collection(db, `classroom/${cid.value}/checkin/${latestCno}/scores`);

  try {
    const snapshot = await getDocs(studentsRef);
    console.log("📌 นักเรียนทั้งหมด:", snapshot.size);

    if (snapshot.empty) {
      return alert("❌ ไม่มีข้อมูลนักเรียนให้บันทึก");
    }

    for (const studentDoc of snapshot.docs) {
      const studentData = studentDoc.data();
      const studentId = studentDoc.id;

      console.log(`👨‍🎓 นักเรียน: ${studentId}`, studentData);

      const scoreDocRef = doc(scoresRef, studentId);
      const scoreData = {
        stdid: studentData.stdid || studentId,
        name: studentData.name || "ไม่ระบุชื่อ",
        remark: studentData.remark || "",  // ✅ คัดลอก remark ถ้ามี
        date: studentData.date || new Date().toISOString(), // ✅ คัดลอก date หรือใช้ timestamp ปัจจุบัน
        status: 1, // ✅ เปลี่ยนสถานะเป็น 1 (เช็คชื่อแล้ว)
        score: 1,  // ✅ กำหนดค่า score เป็น 1
      };

      await setDoc(scoreDocRef, scoreData);
      console.log(`✅ บันทึกคะแนนสำหรับ: ${studentId}`);
    }

    alert("✅ บันทึกการเช็คชื่อสำเร็จ!");
    console.log("✅ ข้อมูลถูกคัดลอกไปยัง `scores` สำเร็จ");
  } catch (error) {
    console.error("❌ Error saving check-in to scores:", error);
  }
};



const deleteStudent = async (studentId) => {
  if (!cid.value) {
    alert("ไม่สามารถลบนักเรียนได้ เพราะไม่มีข้อมูลรหัสวิชา");
    return;
  }

  const confirmDelete = confirm("คุณต้องการลบรายชื่อนักเรียนนี้ใช่หรือไม่?");
  if (!confirmDelete) return;

  try {
    // ดึง cno ล่าสุด
    const latestCno = await getLastCno();
    if (!latestCno) {
      alert("ไม่สามารถดึงรอบเช็คชื่อล่าสุดได้");
      return;
    }

    // ลบข้อมูลนักเรียนจาก Firestore
    await deleteDoc(doc(db, `classroom/${cid.value}/checkin/${latestCno}/students/${studentId}`));
    console.log("✅ ลบนักเรียนสำเร็จ:", studentId);
  } catch (error) {
    console.error("❌ Error deleting student:", error);
  }
};



// 📌 แสดงตารางคะแนน
const showscore = async () => {
  const latestCno = await getLastCno();
  if (!cid.value || !latestCno) {
    alert("ยังไม่มีการเช็คชื่อ");
    return;
  }

  console.log("📌 CID:", cid.value, "CNO:", latestCno);

  const scoresRef = collection(db, `classroom/${cid.value}/checkin/${latestCno}/scores`);

  onSnapshot(scoresRef, (snapshot) => {
    scoreList.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    showTable.value = true;
  });
};



// 📌 แปลง timestamp เป็นรูปแบบอ่านง่าย
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "-";
  const date = new Date(timestamp.seconds * 1000);
  return date.toLocaleString();
};



// เปิดเช็คชื่อ -> แสดงป๊อปอัปให้กรอกโค้ด
const toggleCheckin = async () => {
  if (!cid.value) return;

  if (!checkinStatus.value) {
    showModal.value = true; // เปิดป๊อปอัป
  } else {
    try {
      // 🔹 ดึงเอกสารล่าสุดของการเช็คชื่อ
      const checkinCollectionRef = collection(db, `classroom/${cid.value}/checkin`);
      const querySnapshot = await getDocs(
        query(checkinCollectionRef, orderBy("cno", "desc"), limit(1))
      );

      if (!querySnapshot.empty) {
        const lastDoc = querySnapshot.docs[0]; // ดึงเอกสารล่าสุด
        console.log("📌 เอกสารล่าสุด:", lastDoc.data()); // Debug: ดูข้อมูลเอกสารล่าสุด

        const lastDocId = lastDoc.id; // ดึง ID ของเอกสาร
        const lastDocRef = doc(db, `classroom/${cid.value}/checkin/${lastDocId}`); // อ้างอิงเอกสารล่าสุด

        await setDoc(lastDocRef, { status: 2 }, { merge: true }); // อัปเดต status เป็น 2
        console.log("✅ อัปเดตสำเร็จ: ", lastDocId); // Debug: เช็คว่าอัปเดตสำเร็จ

      } else {
        console.warn("⚠️ ไม่พบเอกสารเช็คชื่อที่ต้องอัปเดต");
      }

      checkinStatus.value = false; // ปิดเช็คชื่อ
      location.reload(); // รีโหลดหน้าเว็บ

    } catch (error) {
      console.error("❌ Error closing check-in:", error);
    }
  }
};

const saveCheckinCode = async () => {
  if (!newCheckinCode.value) return alert("กรุณากรอกรหัสเช็คชื่อ");

  const checkinCollectionRef = collection(db, `classroom/${cid.value}/checkin`);

  try {
    // 🔹 ดึงข้อมูลทั้งหมดจาก Firestore และเรียงตาม `cno` แบบมากไปน้อย
    const querySnapshot = await getDocs(
      query(checkinCollectionRef, orderBy("cno", "desc"), limit(1))
    );

    // 🔹 กำหนดค่า `cno` ใหม่
    let newCno = 1; // ค่าเริ่มต้น ถ้ายังไม่มีข้อมูลใน Firestore
    if (!querySnapshot.empty) {
      const lastDoc = querySnapshot.docs[0].data(); // ดึงเอกสารที่มี cno มากที่สุด
      newCno = lastDoc.cno + 1; // เพิ่ม cno ทีละ 1
    }

    const sessionData = {
      cno: newCno,  // ✅ เพิ่ม cno ลงในข้อมูลที่จะบันทึก
      code: newCheckinCode.value,
      date: new Date().toISOString(),
      status: 1, // 1 = เปิดเช็คชื่อ
    };

    // 🔹 ใช้ `setDoc()` และกำหนด `document ID` เป็น `newCno`
    const newDocRef = doc(db, `classroom/${cid.value}/checkin/${newCno}`);
    await setDoc(newDocRef, sessionData);

    // ✅ คัดลอกรายชื่อนักเรียนไปยัง `/scores`
    await copyStudentsToScores(newCno);

    savedCheckinCode.value = newCheckinCode.value;
    checkinCodeSaved.value = true;
    checkinStatus.value = true;
    showModal.value = false; // ปิดป๊อปอัป

    console.log("✅ เช็คชื่อถูกสร้างใหม่:", sessionData);

  } catch (error) {
    console.error("❌ Error saving check-in code:", error);
  }
};


const copyStudentsToScores = async (cno) => {
  const studentsCollectionRef = collection(db, `classroom/${cid.value}/students`);
  const scoresCollectionRef = collection(db, `classroom/${cid.value}/checkin/${cno}/scores`);

  try {
    // 🔹 ดึงรายชื่อนักเรียนทั้งหมดจาก `students`
    const studentsSnapshot = await getDocs(studentsCollectionRef);

    if (studentsSnapshot.empty) {
      console.warn("⚠️ ไม่มีนักเรียนในห้องเรียนนี้");
      return;
    }

    // 🔹 วนลูปเพิ่มข้อมูลนักเรียนไปที่ `scores`
    const batchPromises = studentsSnapshot.docs.map(async (studentDoc) => {
      const studentData = studentDoc.data();
      const studentId = studentDoc.id; // ใช้ student ID เดิม
      const scoreDocRef = doc(scoresCollectionRef, studentId);

      const scoreData = {
        student_id: studentId,
        name: studentData.name || "ไม่ระบุชื่อ",
        status: 0, // 0 = ยังไม่เช็คชื่อ
      };

      return setDoc(scoreDocRef, scoreData);
    });

    await Promise.all(batchPromises);
    console.log("✅ คัดลอกรายชื่อนักเรียนไปยัง `scores` สำเร็จ");

  } catch (error) {
    console.error("❌ Error copying students to scores:", error);
  }
};




// โหลดข้อมูลห้องเรียนและเช็คชื่อนักเรียน
watchEffect(async () => {
  if (!cid.value) return;
  loading.value = true;
  try {
    const classRef = doc(db, `classroom/${cid.value}`);
    const classSnap = await getDoc(classRef);
    if (classSnap.exists()) {
      classroom.value = classSnap.data();
      fetchCheckinSessions();
    } else {
      classroom.value = null;
    }
  } catch (error) {
    console.error("Error loading classroom:", error);
  } finally {
    loading.value = false;
  }
});



// การนำทางไปยังหน้าต่าง ๆ
const goToQnA = () => router.push(`/webapp/qa/${cid.value}`);
const home = () => router.push("/webapp/home");
const addSubject = () => router.push("/webapp/addclass");
const editProfile = () => router.push("/webapp/edit-profile");

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
<style scoped src="../assets/style.css"></style>