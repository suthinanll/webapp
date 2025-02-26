<template>

  <head>
    <!-- ไอค่อน -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0">
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
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  img {
    border-radius: 8px;
  }
   .btn{
  margin: 2px;}
  
  
  .container {
    width: 70%;
    margin-left: 280px; 
    padding-bottom: 80px; 
  
  }
  .container h3 {
    margin: 50px 0 50px 0;
    text-align: center;
  }
  
  
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 260px;
    height: calc(100vh - 60px);
    background: #ffffff;
    transition: all 0.4s ease;
    z-index: 999;
    padding: 10px;
  }
  
  .sidebar.collapsed {
    width: 85px;
  }
  
  
  img {
    border: 2px solid #ddd;
  }
  
  
  /* Navbar styles */
  .navbar {
    width: 100%;
    height: 60px;
    background-color: white;
    padding: 0 20px;
    font-weight: 600;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .navbar-brand {
    margin-left: 15px;
    text-decoration: none;
    color: #333;
  }
  
  .menu-toggler {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  /* Sidebar styles */
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    width: 270px;
    height: calc(100vh - 60px);
    background: #ffffff;
    transition: all 0.4s ease;
    z-index: 999;
    padding: 0;
    margin: 0;
  }
  
  .sidebar.collapsed {
    width: 85px;
  }
  
  /* Sidebar navigation lists */
  .sidebar-nav .nav-list {
    list-style: none;
    display: flex;
    gap: 4px;
    padding: 0 15px;
    flex-direction: column;
    transform: translateY(15px);
    transition: 0.4s ease;
  }
  
  .sidebar.collapsed .sidebar-nav .primary-nav {
    transform: translateY(65px);
  }
  
  .sidebar-nav .secondary-nav {
    position: absolute;
    bottom: 30px;
    width: 100%;
  }
  
  /* Navigation items */
  .sidebar-nav .nav-item {
    position: relative;
    padding: 0;
  }
  
  .sidebar-nav .nav-link {
    color: #000000;
    display: flex;
    gap: 12px;
    white-space: nowrap;
    border-radius: 8px;
    padding: 12px 15px;
    align-items: center;
    text-decoration: none;
    transition: 0.4s ease;
  }
  
  .sidebar-nav .nav-link:hover {
    color: #151A2D;
    background: #f8f9fa;
  }
  
  .sidebar .sidebar-nav .nav-link .nav-label {
    transition: opacity 0.3s ease;
  }
  
  .sidebar.collapsed .sidebar-nav .nav-link .nav-label {
    opacity: 0;
    pointer-events: none;
  }
  
  /* Tooltips for collapsed sidebar */
  .sidebar-nav .nav-tooltip {
    position: absolute;
    top: -10px;
    opacity: 0;
    color: #151A2D;
    display: none;
    pointer-events: none;
    padding: 6px 12px;
    border-radius: 8px;
    white-space: nowrap;
    background: #fff;
    left: calc(100% + 25px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0s;
  }
  
  .sidebar.collapsed .sidebar-nav .nav-tooltip {
    display: block;
  }
  
  .sidebar-nav .nav-item:hover .nav-tooltip {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(50%);
    transition: all 0.4s ease;
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .sidebar {
      width: 200px;
    }
  }
  
  @media (max-width: 768px) {
    .container{
      margin-left: 80px; 
  
    }
    .sidebar { 
      transform: translateX(-100%);
      width: 250px;
    }
  
    .sidebar.menu-active {
      transform: translateX(0);
      overflow-y: auto;
    }
  
    .menu-toggler {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 30px;
    }
  
    .menu-toggler span {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: 480px) {
    .navbar {
      padding: 0 10px;
    }
    
    .navbar-brand {
      margin-left: 10px;
    }
  }
  
  .card {
    max-width: 80%;
    margin: auto;
  }
  </style>
  