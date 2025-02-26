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
  
            <button @click="handleCheckin" class="btn btn-success">แสดงรายชื่อ</button>
            <button @click="goToAddcheckin" class="btn btn-success ">เพิ่มการเช็คชื่อ</button>
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
    margin-top: 80px;
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
      margin-left: 0px; 
  
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
    .container {
    margin-left: 0px; 
    padding-bottom: 80px; 
  
  }
  
  }
  </style>
  